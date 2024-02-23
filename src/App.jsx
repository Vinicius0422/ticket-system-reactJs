
import { Route, Routes } from "react-router-dom";
import { SignIn } from "./pages/signIn";
import { SignUp } from "./pages/signUp";
import { Private } from "./config/privateRoutes";
import { Dashboard } from "./pages/dashboard";

export function App() {
  return(
    <Routes>
      <Route path="/" element={ <SignIn/> }/>
      <Route path="/register" element={<SignUp/>}/>
      <Route path="/dashboard" element={ <Private><Dashboard/></Private> }/>
    </Routes>
  )
}