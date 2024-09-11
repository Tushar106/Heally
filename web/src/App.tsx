import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { SignUp } from "./pages/SignUp"
import { SignIn } from "./pages/SignIn"
import { FirebaseProvider } from '@/context/Firebase';
import { Dashboard } from "./pages/Dashboard";
import { Home } from "./pages/Home";
import { Toaster } from "./components/ui/toaster";
import { Helmet } from 'react-helmet'

function App() {

  return (
    <>
    <Helmet>
      <title>Helly</title>
    </Helmet>
    <FirebaseProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<SignUp />} path = "/signup" />
          <Route element={<SignIn />} path = "/signin" />
          <Route element={<Home />} path = "/" />
          <Route element={<Dashboard />} path = "/dashboard" />
          <Route element={<Navigate to = "/"/>} path = "*" />
        </Routes>
      </BrowserRouter>
      <Toaster />
      </FirebaseProvider>
    </>
  )
}

export default App
