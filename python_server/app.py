from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import googlemaps
from dotenv import load_dotenv
import os
import firebase_admin
from firebase_admin import credentials, firestore

cred = credentials.Certificate(os.environ['FIREBASE_API_KEY'])
firebase_admin.initialize_app(cred)
# Firebase setup (assuming Firebase is already initialized)
db = firestore.client()
app = Flask(__name__)
CORS(app)  # Enable CORS

load_dotenv()

app = Flask(__name__)

# Initialize the Google Maps client with your API key
gmaps = googlemaps.Client(key=os.environ['GOOGLE_MAPS_API_KEY'])

def geocode_address(address):
    try:
        geocode_result = gmaps.geocode(address)
        if geocode_result:
            location = geocode_result[0]['geometry']['location']
            return location['lat'], location['lng']
        else:
            return None, None
    except Exception as e:
        print(f"Error geocoding address: {address}, error: {e}")
        return None, None

@app.route('/')
def index():
    return render_template('index.html')

# Route to get nearby places, including doctors
@app.route('/nearby_places', methods=['POST'])
def get_nearby_places():
    data = request.get_json()
    address = data.get('address')
    place_type = data.get('type', '').lower()  # Type can be hospital, pharmacy, lab, doctor, etc.

    if not address or not place_type:
        return jsonify({'error': 'Address or place type not provided'}), 400

    # Separate logic for 'doctor' type
    if place_type == 'doctor':
        return find_nearest_doctors(address)
    else:
        return search_nearby_places(place_type)

# Helper function to search for nearby places based on type or keyword
def search_nearby_places(place_type, keyword=None):
    try:
        # Geocode the address to get latitude and longitude
        geocode_result = gmaps.geocode(request.json['address'])
        if not geocode_result:
            return jsonify({'error': 'Invalid address'}), 400

        # Extract the latitude and longitude
        location = geocode_result[0]['geometry']['location']
        lat = location['lat']
        lng = location['lng']

        # Map place types for labs and specific searches
        keyword = 'testing lab' if place_type == 'lab' else keyword
        keyword = 'hospital' if place_type == 'hospital' else keyword
        keyword = 'pharmacy' if place_type == 'pharmacy' else keyword

        # Search for nearby places using the type and optional keyword
        nearby_places = gmaps.places_nearby(location=(lat, lng), radius=5000, type=place_type, keyword=keyword)

        # Prepare the list of places to return
        places = []
        for place in nearby_places['results']:
            place_info = {
                'name': place['name'],
                'address': place.get('vicinity'),
                'rating': place.get('rating'),
                'user_ratings_total': place.get('user_ratings_total')
            }
            # Check if the place has a photo and include the photo URL if available
            if 'photos' in place:
                photo_reference = place['photos'][0]['photo_reference']
                place_info['image_url'] = f"https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference={photo_reference}&key={os.environ['GOOGLE_MAPS_API_KEY']}"
            else:
                place_info['image_url'] = None
            places.append(place_info)

        if not places:
            return jsonify({'error': f'No {place_type}s found'}), 404

        return jsonify({f'{place_type}': places})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Helper function to find nearest doctors
def find_nearest_doctors(address):
    cus_lat, cus_lng = geocode_address(address)
    customer_location = {'lat': cus_lat, 'lng': cus_lng} # Expected format: {"lat": 12.9611159, "lng": 77.638992}

    if not customer_location:
        return jsonify({'error': 'Customer location not provided'}), 400

    # Retrieve all doctor records where isDoctor == true
    doctors_ref = db.collection('users').where('isDoctor', '==', True)
    doctors = doctors_ref.get()

    doctor_locations = []
    doctor_info = []

    # Geocode each doctor's address and prepare locations for distance calculation
    for doc in doctors:
        doctor_data = doc.to_dict()
        doc_address = doctor_data.get('address')

        if doc_address:
            lat, lng = geocode_address(doc_address)
            if lat and lng:
                doctor_locations.append(f"{lat},{lng}")
                doctor_data['location'] = {'lat': lat, 'lng': lng}
                doctor_info.append(doctor_data)
            else:
                print(f"Could not geocode address: {doc_address}")

    # If no doctor locations are available, return an error
    if not doctor_locations:
        return jsonify({'error': 'No valid doctor locations found'}), 400

    # Use Google Maps Distance Matrix API to calculate distances
    try:
        distance_result = gmaps.distance_matrix(
            origins=[f"{customer_location['lat']},{customer_location['lng']}"],
            destinations=doctor_locations,
            mode="driving"
        )
    except googlemaps.exceptions.ApiError as e:
        print(f"API Error: {e}")
        return jsonify({'error': str(e)}), 500

    # Filter doctors within a 5km radius
    nearby_doctors = []
    for i, element in enumerate(distance_result['rows'][0]['elements']):
        if element['status'] == 'OK':
            distance_in_meters = element['distance']['value']
            distance_in_km = distance_in_meters / 1000

            # Check if the doctor is within the 5km radius
            if distance_in_km <= 5:
                doctor_info[i]['distance_km'] = distance_in_km
                nearby_doctors.append(doctor_info[i])

    return jsonify({'nearby_doctors': nearby_doctors})

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8000))
    app.run(host='0.0.0.0', port=port)
