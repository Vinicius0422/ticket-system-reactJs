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

    // Sign in a user
    async function signIn(email, password){
        setLoadingAuth(true);
        await signInWithEmailAndPassword(auth, email, password)
        .then( async (value) => {
            let uid = value.user.uid;

            const docRef = doc(db, "users", uid);
            const docSnap = await getDoc(docRef);

            let data = {
                uid: uid,
                name: docSnap.data().nome,
                email: value.user.email,
                avatarUrl: docSnap.data().avatarUrl
            }

            setUser(data)
            storageUser(data)
            setLoadingAuth(false)
            toast.success("Welcome again!")
            navigate("/dashboard")
        })
        .catch((error) => {
            console.log(error);
            setLoadingAuth(false);
            toast.error("Something went wrong!");
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
            signIn,
            loadingAuth
        }}>
            {children}
        </AuthContext.Provider>
    )
}
