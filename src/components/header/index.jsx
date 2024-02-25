import { useContext } from 'react'
import { AuthContext } from '../../contexts/auth'
import { Link } from 'react-router-dom'
import './header.css'

import avatarImg from '../../assets/avatar.png'
import { FiHome, FiUser, FiSettings } from 'react-icons/fi'

export const Header = () => {

    const { user } = useContext(AuthContext)

    return (
        <header>
            <div className='avatar-container'>
                <img className='avatar-header' src={user.avatarUrl === null ? avatarImg : user.avatarUrl} alt="profile image" />
            </div>
            <Link to="/dashboard">
                <FiHome color='#FFF' size={24}/>
                Tickets
            </Link>
            <Link to="/customers">
                <FiUser color='#FFF' size={24}/>
                Customers
            </Link>
            <Link to="/profile">
                <FiSettings color='#FFF' size={24}/>
                Profile
            </Link>
        </header>
    )
}