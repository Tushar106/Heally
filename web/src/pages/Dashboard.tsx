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
import { format, addDays, parse } from "date-fns";
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
  patientid: string;
  patientName: string;
  time: string;
  date: string; // Store as a string for easier manipulation
};

export const Dashboard = () => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [about, setAbout] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [currentProfileUrl, setCurrentProfileUrl] = useState<string | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [filteredAppointments, setFilteredAppointments] = useState<
    Appointment[]
  >([]);
  const {
    isLoggedIn,
    logout,
    uploadProfilePicture,
    updateProfileInfo,
    fetchUserProfile,
    fetchUserAppointments,
  } = useFirebase();
  const navigate = useNavigate();

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
      setLoading(true);
      // Upload image to Firebase storage and get the URL
      if (profileImage) {
        imageUrl = await uploadProfilePicture(profileImage); // Upload profile image and get URL
      }

      await updateProfileInfo(about, imageUrl);
      setLoading(false);

      alert("Profile updated successfully!");
    } catch (error) {
      setLoading(false);
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  const dateOptions = [today, addDays(today, 1), addDays(today, 2)];
  const formatDate = (dateStr: string) => {
    return parse(dateStr, "EEEE dd MMM yyyy", new Date());
  };

  const handleDate = (date: Date) => {
    setSelectedDate(date);
    const filtered = appointments.filter((appointment) => {
      const appointmentDate = formatDate(appointment.date);

      return (
        format(appointmentDate, "MMM d, yyyy") === format(date, "MMM d, yyyy")
      );
    });
    setFilteredAppointments(filtered);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      if (isLoggedIn) {
        try {
          const userData = await fetchUserProfile();
          setCurrentProfileUrl(userData.profileImage || null);
          setName(userData.name || "");
          setAbout(userData.about || "");
          const userAppointments = await fetchUserAppointments();
          setLoading(false);
          const parsedAppointments = userAppointments.map((app) => ({
            patientid: app.patientid,
            time: app.time,
            date: app.date,
            patientName: app.patientName,
          }));
          setAppointments(parsedAppointments);
        } catch (error) {
          setLoading(false);
          console.error("Error fetching user data:", error);
        }
      }
    };
    fetchUserData();
  }, [fetchUserProfile, isLoggedIn, fetchUserAppointments]);

  useEffect(() => {
    if (appointments.length > 0) {
      handleDate(today); // Filter appointments for today's date by default
    }
  }, [appointments]);

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
                      <div className="mx-auto text-white">{name}</div>
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
                onClick={() => handleDate(date)}
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
                  filteredAppointments.map((appointment, index) => (
                    <TableRow
                      key={index}
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
                      {loading
                        ? "Loading..."
                        : "No appointments for this date."}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4 justify-center items-center">
          <div className="text-white mx-auto">Please login to view dashboard</div>
          <button
            className="bg-white text-black rounded border-black px-6 font-medium py-2 md:text-md text-sm" onClick={()=> navigate('/home')}>
            Home
          </button>
        </div>
      )}
    </div>
  );
};
