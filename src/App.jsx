
import { Route, Routes } from "react-router-dom";
import { SignIn } from "./pages/signIn";
import { SignUp } from "./pages/signUp";
import { ToastContainer } from "react-toastify";

export function App() {
  return(
    <Routes>
      <ToastContainer autoClose={2000}/>
      <Route path="/" element={<SignIn/>}/>
      <Route path="/register" element={<SignUp/>}/>
    </Routes>
  )
}