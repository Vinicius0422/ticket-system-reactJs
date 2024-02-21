
import { createBrowserRouter } from "react-router-dom";
import { SignIn } from "./pages/signIn";
import { SignUp } from "./pages/signUp";

export const router = createBrowserRouter ([
  {
    path: "/",
    element: <SignIn/>
  },

  {
    path: "/register",
    element: <SignUp/>
  }
])
