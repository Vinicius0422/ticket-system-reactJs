import { useContext, useState } from "react"

import { AuthContext } from "../../contexts/auth"
import { Header } from "../../components/header"
import { Title } from "../../components/title"
import { Spinner } from "../../components/spinner"
import { FiSettings } from 'react-icons/fi'

import './profile.css'
import avatarLogo from '../../assets/avatar.png'
import { FiUpload } from 'react-icons/fi'
import useUpdateProfile from "../../hooks/useUpdateProfile"


export const Profile = () => {

    const { user, logOut } = useContext(AuthContext);
    const { updateProfile, loading } = useUpdateProfile();
    

    const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl)
    const [avatarImage, setAvatarImage] = useState(null)
    const [name, setName] = useState(user && user.name)
    const [email, setEmail] = useState(user && user.email)


    const handleFile = (e) => {
        if(e.target.files[0]){
            const image = e.target.files[0];

            if(image.type === 'image/jpeg' || image.type === 'image/png'){
                setAvatarImage(image);
                setAvatarUrl(URL.createObjectURL(image));
            } else {
                alert("Send a image PNG or JPEG type");
                setAvatarUrl(null);
                return;
            }
        }
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        updateProfile(name, avatarImage);
    }

    return (
        <div>
            <Header />

            <div className="content">

                <Title name="Profile">
                    <FiSettings color="" size={25} />
                </Title>

                <div className="container">
                    <form className="form" onSubmit={handleUpdate}>

                        <label className="label-avatar">
                            <span>
                                <FiUpload color="#fff" size={25} />
                            </span>

                            <input type="file" accept="image/*" onChange={handleFile} /> <br />

                            {avatarUrl === null ? (
                                <img src={avatarLogo} alt="Profile image" height={200} />
                            ) : (
                                <img src={avatarUrl} alt="Profile image" height={200} />
                            )}

                        </label>
                        <div className="input-btn">
                            <label>Name</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>

                            <label>E-mail</label>
                            <input type="email" disabled value={email} onChange={(e) => setEmail(e.target.value)}/>

                            <button type="submit">
                                {loading ? <Spinner/> : "Save"}
                            </button>
                        </div>
                    </form>
                </div>
                <div className="container">
                    <button className="logout-btn" onClick={() => logOut()}>Log Out</button>
                </div>
            </div>
        </div >
    )
}