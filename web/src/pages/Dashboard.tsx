import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { format, addDays } from "date-fns";
import { useFirebase } from "@/context/Firebase";
import { Link, useNavigate } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

type Appointment = {
  id: number;
  patientName: string;
  time: string;
  date: string;
};

// Hardcoded appointment data with date
const appointmentsData: Appointment[] = [
  {
    id: 1,
    patientName: "Alice Johnson",
    time: "09:00 AM",
    date: format(new Date(), "MMM d, yyyy"),
  },
  {
    id: 2,
    patientName: "Bob Smith",
    time: "10:30 AM",
    date: format(new Date(), "MMM d, yyyy"),
  },
  {
    id: 3,
    patientName: "Carol Williams",
    time: "02:00 PM",
    date: format(addDays(new Date(), 1), "MMM d, yyyy"),
  },
  {
    id: 4,
    patientName: "David Brown",
    time: "03:30 PM",
    date: format(addDays(new Date(), 1), "MMM d, yyyy"),
  },
  {
    id: 5,
    patientName: "Eve Davis",
    time: "05:00 PM",
    date: format(addDays(new Date(), 2), "MMM d, yyyy"),
  },
  {
    id: 6,
    patientName: "Franklin Lee",
    time: "06:30 PM",
    date: format(addDays(new Date(), 2), "MMM d, yyyy"),
  },
];

export const Dashboard = () => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [about, setAbout] = useState<string>("");
  const [currentProfileUrl, setCurrentProfileUrl] = useState<string | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const {
    isLoggedIn,
    logout,
    uploadProfilePicture,
    updateProfileInfo,
    fetchUserProfile,
  } = useFirebase();
  const navigate = useNavigate();

  // Define the next two days for button options
  const dateOptions = [today, addDays(today, 1), addDays(today, 2)];

  const filteredAppointments = appointmentsData.filter(
    (appointment) => appointment.date === format(selectedDate, "MMM d, yyyy")
  );

  const handleLogout = async () => {
    await logout();
    navigate("/home");
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file); // Store selected image in state
    }
  };

  const handleText = async () => {
    try {
      let imageUrl: string | undefined;

      // Upload image to Firebase storage and get the URL
      if (profileImage) {
        imageUrl = await uploadProfilePicture(profileImage); // Upload profile image and get URL
      }

      setLoading(true);
      await updateProfileInfo(about, imageUrl);
      setLoading(false);

      alert("Profile updated successfully!");
    } catch (error) {
      setLoading(false);
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await fetchUserProfile();
        setCurrentProfileUrl(userData.profileImage || null);
        setAbout(userData.about || "");
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    if (isLoggedIn) fetchUserData();
  }, [fetchUserProfile, isLoggedIn]);

  return (
    <div className="bg-black from-black to-[#4D4855] min-h-screen p-8 font-mono">
      {isLoggedIn ? (
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <Link to="/">
              <div className="text-xl md:text-3xl font-semibold text-white ">
                Dashboard
              </div>
            </Link>
            <div className="flex gap-3">
              <div className="bg-white text-black rounded border-black px-2 font-medium py-2 md:text-md text-sm">
                <Popover>
                  <PopoverTrigger>Profile</PopoverTrigger>
                  <PopoverContent className="bg-black mt-2 mr-4">
                    <div className="flex flex-col space-y-6">
                      <Avatar className="mx-auto">
                        <AvatarImage
                          src={
                            currentProfileUrl || "https://github.com/shadcn.png"
                          }
                        />
                        <AvatarFallback>A</AvatarFallback>
                      </Avatar>

                      <Input
                        className="bg-black text-white"
                        type="file"
                        onChange={handleImageUpload}
                      />

                      <Textarea
                        className="text-white h-4"
                        placeholder="Tell me something about yourself"
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                      />
                      <button
                        className="bg-white text-black rounded border-black px-2 font-medium py-2 md:text-md text-sm"
                        onClick={handleText}
                      >
                        {loading ? "Loading..." : "Save"}
                      </button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <button
                className="bg-white text-black rounded border-black px-2 font-medium py-2 md:text-md text-sm"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>

          {/* Date Selection Buttons */}
          <div className="flex space-x-4 mb-6">
            {dateOptions.map((date) => (
              <Button
                key={date.toISOString()}
                onClick={() => setSelectedDate(date)}
                className={`${
                  format(selectedDate, "MMM d") === format(date, "MMM d")
                    ? "bg-white text-black hover:bg-white"
                    : "bg-neutral-800 text-white border-neutral-700 hover:bg-white hover:text-black"
                }`}
              >
                {format(date, "MMM d")}
              </Button>
            ))}
          </div>

          <div className="bg-neutral-800 rounded-lg shadow-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-neutral-300 text-left font-semibold py-2 px-6">
                    Name
                  </TableHead>
                  <TableHead className="text-neutral-300 text-left font-semibold px-6 py-2">
                    Time
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAppointments.length > 0 ? (
                  filteredAppointments.map((appointment) => (
                    <TableRow
                      key={appointment.id}
                      className="hover:bg-neutral-700 transition-colors duration-150 border-b border-neutral-700 cursor-pointer"
                    >
                      <TableCell className="text-white font-medium py-4 px-6">
                        {appointment.patientName}
                      </TableCell>
                      <TableCell className="text-white font-medium py-4 px-6">
                        {appointment.time}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={2}
                      className="text-center text-neutral-400 py-4"
                    >
                      No appointments for this date.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      ) : (
        <div className="text-white">Please login to view dashboard</div>
      )}
    </div>
  );
};
