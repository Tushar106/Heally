from flask import Flask, request, jsonify
from flask_cors import CORS
import googlemaps
from dotenv import load_dotenv
import os
app = Flask(__name__)
CORS(app)  # Enable CORS

load_dotenv()

app = Flask(__name__)

# Initialize the Google Maps client with your API key
gmaps = googlemaps.Client(key=os.environ['GOOGLE_MAPS_API_KEY'])

# Route to get nearby places dynamically (hospitals, pharmacies, labs, etc.)
@app.route('/nearby_places', methods=['POST'])
def get_nearby_places():
    data = request.get_json()
    address = data.get('address')
    place_type = data.get('type', '').lower()  # Type can be hospital, pharmacy, lab, etc.

    if not address or not place_type:
        return jsonify({'error': 'Address or place type not provided'}), 400

    # Mapping for labs as we don't have a direct place type for labs
    if place_type == 'lab':
        return search_nearby_places('lab', keyword='testing lab')
    elif place_type == 'hospital':
        return search_nearby_places(place_type, keyword='hospital')
    elif place_type == 'pharmacy':
        return search_nearby_places(place_type, keyword='pharmacy')
    else:
        return jsonify({'error': 'Invalid place type'}), 400

# Helper function to search places based on type or keyword
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

        # Search for nearby places using the type and optional keyword
        if keyword:
            nearby_places = gmaps.places_nearby(location=(lat, lng), radius=5000, type=place_type, keyword=keyword)
        else:
            nearby_places = gmaps.places_nearby(location=(lat, lng), radius=5000, type=place_type)

        # Prepare the list of places to return
        places = []
        for place in nearby_places['results']:
            places.append({
                'name': place['name'],
                'address': place.get('vicinity'),
                'rating': place.get('rating'),
                'user_ratings_total': place.get('user_ratings_total')
            })

        if not places:
            return jsonify({'error': f'No {place_type}s found'}), 404

        return jsonify({f'{place_type}s': places})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8000))
    
    app.run(host='0.0.0.0', port=port)