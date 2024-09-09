import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"
import { useFirebase } from '@/context/Firebase'


export const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const { toast } = useToast()

  const { signinUserWithEmailAndPass } = useFirebase();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await signinUserWithEmailAndPass(email, password)
    console.log(response)
    toast({
      title: "Signed in",
      description: "You've successfully signed in!",
    })
    navigate('/dashboard') 
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-xl">Sign In</CardTitle>
          <CardDescription>Enter your credentials to access your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignIn}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="john@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
            </div>
            <Button className="w-full mt-6" type="submit">Sign In</Button>
          </form>
        </CardContent>
        <Toaster />
        <CardFooter className="flex justify-between">
          <a href="/forgot-password" className="text-sm text-slate-500 hover:underline">
            Forgot password?
          </a>
          <a href="/signup" className="text-sm text-slate-900 hover:underline">
            Create an account
          </a>
        </CardFooter>
      </Card>
    </div>
  )
}