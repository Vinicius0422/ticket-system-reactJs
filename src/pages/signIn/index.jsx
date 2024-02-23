import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'

import logo from '../../assets/logo.png'
import './signIn.css'
import { AuthContext } from '../../contexts/auth'

export const SignIn = () => {

    const { signIn, loadingAuth } = useContext(AuthContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function handleSignIn(e){
        e.preventDefault();

        if(email !== '' && password !== ''){
            await signIn(email, password)
        }
    }


    return(
        <div className="login-container">
            <div className="login-area">
                <div className="login-logo">
                    <img src={logo} alt="System logo"/>
                </div>
                <h1>Sign In</h1>
                <form onSubmit={handleSignIn}>
                    <input type='email' placeholder='email@email.com' value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <input type='password' placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />

                    <button type='submit'>
                        {loadingAuth ? 'Loading...' : 'Login'}
                    </button>
                </form>
                <Link to='/register'>Sign Up</Link>
            </div>
        </div>
    )
}