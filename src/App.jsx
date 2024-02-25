
import { Route, Routes } from "react-router-dom";
import { SignIn } from "./pages/signIn";
import { SignUp } from "./pages/signUp";
import { Private } from "./config/privateRoutes";
import { Dashboard } from "./pages/dashboard";
import { Profile } from "./pages/profile";
import { Customers } from "./pages/customers";

export function App() {
  return(
    <Routes>
      <Route path="/" element={ <SignIn/> }/>
      <Route path="/register" element={<SignUp/>}/>
      <Route path="/dashboard" element={ <Private><Dashboard/></Private> }/>
      <Route path="/profile" element={ <Private><Profile/></Private> }/>
      <Route path="/customers" element={ <Private><Customers/></Private> }/>
    </Routes>
  )
}