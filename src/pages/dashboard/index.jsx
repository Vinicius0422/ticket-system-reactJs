import { useContext } from "react"
import { AuthContext } from "../../contexts/auth"
import { Header } from "../../components/header";

export const Dashboard = () => {
    const { logOut } = useContext(AuthContext);

    async function handleLogOut(){
        await logOut();
    }

    return (
        <div>
            <Header></Header>
            <h1 className="content">Dashboard Page</h1>
            <button onClick={handleLogOut}>Log Out</button>
        </div>
    )
}