import { useContext, useState } from "react"
import { Link } from "react-router-dom"

import logo from '../../assets/logo.png'
import { AuthContext } from "../../contexts/auth"


export const SignUp = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { signUp, loadingAuth } = useContext(AuthContext);

    async function handleSignUp(e){
        e.preventDefault()
        if(name !== '' && email !== '' && password !== ''){
            await signUp(name, email, password)
        }

    }

    return(
        <div className="login-container">
            <div className="login-area">
                <div className="login-logo">
                    <img src={logo} alt="System logo"/>
                </div>
                <h1>Sign Up</h1>
                <form action='submit' onSubmit={handleSignUp}>
                    <input type='text' placeholder='name' value={name} onChange={(e) => setName(e.target.value)}/>
                    <input type='email' placeholder='email@email.com' value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <input type='password' placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />

                    <button type='submit'>{
                        loadingAuth ? 'Carregando...' : 'Sign Up'
                    }</button>
                </form>
                <Link to='/'>Sign In</Link>
            </div>
        </div>
    )
}