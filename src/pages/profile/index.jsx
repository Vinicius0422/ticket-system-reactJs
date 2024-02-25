import { useContext, useState } from "react"

import { AuthContext } from "../../contexts/auth"
import { Header } from "../../components/header"
import { Title } from "../../components/title"
import { FiSettings } from 'react-icons/fi'

import './profile.css'
import avatarLogo from '../../assets/avatar.png'
import { FiUpload } from 'react-icons/fi'


export const Profile = () => {

    const { user, setUser } = useContext(AuthContext);

    const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl)

    function handleAvatar(e) {
        e.preventDefault();
        setAvatarUrl(e.target.value)
    }

    return (
        <div>
            <Header />

            <div className="content">

                <Title name="Profile">
                    <FiSettings color="" size={25} />
                </Title>

                <div className="container">
                    <form className="form-profile">

                        <label className="label-avatar">
                            <span>
                                <FiUpload color="#fff" size={25} />
                            </span>

                            <input type="file" accept="image/*" onChange={handleAvatar} /> <br />

                            {avatarUrl === null ? (
                                <img src={avatarLogo} alt="Profile image" width={200} height={200} />
                            ) : (
                                <img src={avatarUrl} alt="Profile image" width={200} height={200} />
                            )}

                        </label>
                        <div>
                            <label>Name</label>
                            <input type="text" value={user.name} />

                            <label>E-mail</label>
                            <input type="email" disabled value={user.email} />

                            <button>Save</button>
                        </div>
                    </form>
                </div>
                <div className="container">
                    <button className="logout-btn">Log Out</button>
                </div>
            </div>
        </div >
    )
}