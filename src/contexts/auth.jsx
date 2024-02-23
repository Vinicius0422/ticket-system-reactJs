import { createContext, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'

import { auth, db } from '../config/fireBaseConnection'
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [loadingAuth, setLoadingAuth] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    // Sign up new user
    async function signUp(name, email, password){
        setLoadingAuth(true);

        await createUserWithEmailAndPassword(auth, email, password)
        .then( async (value) => {
            let uid = value.user.uid

            await setDoc(doc(db, "users", uid), {
                nome: name,
                avatarUrl: null
            })
            .then( () => {
                let data = {
                    uid: uid,
                    name: name,
                    email: value.user.email,
                    avatarUrl: null
                }

                setUser(data);
                storageUser(data);
                setLoadingAuth(false);
                toast.success("Welcome!")
                navigate("/dashboard")
            })
        })
        .catch( (e) => {
            setLoadingAuth(false)
            console.log(e)
        })
    }

    function storageUser(data){
        localStorage.setItem('@tickets-user', JSON.stringify(data));
    }


    return(
        <AuthContext.Provider value={{
            signed: !!user,
            user,
            signUp,
            loadingAuth
        }}>
            {children}
        </AuthContext.Provider>
    )
}
