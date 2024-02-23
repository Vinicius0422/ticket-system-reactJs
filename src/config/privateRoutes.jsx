import { useContext } from "react"
import { AuthContext } from "../contexts/auth"
import { Navigate } from "react-router-dom";

export const Private =  ({ children }) => {

    const { signed, loading } = useContext(AuthContext);

    if(loading){
        return <div></div>
    }

    if(!signed){
        console.log(signed)
        return <Navigate to="/"/>
    }

    return children;
}