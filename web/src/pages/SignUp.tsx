import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useFirebase } from "@/context/Firebase";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [fees, setFees] = useState(0);
  const [specialty, setSpecialty] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const { signupUserWithEmailAndPassword } = useFirebase();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fees || isNaN(fees)) {
      alert("Please enter a valid fee amount.");
      return;
    }
    if (!specialty) {
      alert("Please select a specialty.");
      return;
    }
    setLoading(true)
    console.log("signing up");
    const result = await signupUserWithEmailAndPassword(
      email,
      password,
      name,
      address,
      fees,
      specialty,
      true
    );
    setLoading(false)
    console.log(result);
    console.log("success");
    toast({
      title: "Account created",
      description: "You've successfully signed up!",
    });
    navigate("/dashboard");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black bg-axiom-pattern font-mono">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>Create your account to get started.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignUp}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="hospital">Address</Label>
                <Input
                  id="hospital"
                  placeholder="Park Hospital, New Delhi, Delhi"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>
              <div className="flex gap-1">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="fees">Fees</Label>
                  <Input
                    id="fees"
                    placeholder="500"
                    onChange={(e) => setFees(Number(e.target.value))}
                    className="w-3/4"
                    required
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="specialty">Specialty</Label>
                  <Select
                    value={specialty}
                    onValueChange={(value) => setSpecialty(value)}
                    required
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select a specialty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="General">General</SelectItem>
                      <SelectItem value="Psychiatry">Psychiatry</SelectItem>
                      <SelectItem value="Cardiology">Cardiology</SelectItem>
                      <SelectItem value="Orthopedics">Orthopedics</SelectItem>
                      <SelectItem value="Ophthalmology">
                        Ophthalmology
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <Button className="w-full mt-6 font-semibold" type="submit">
              {loading ? "Loading..." : "Sign Up"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-slate-500">
            Already have an account?{" "}
            <a href="/signin" className="text-slate-900 hover:underline">
              Sign in
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};
