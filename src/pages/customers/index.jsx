import { useState } from "react"
import useSaveCustomer from "../../hooks/useSaveCustomer"
import './customers.css'

import { FiUser } from "react-icons/fi"
import { Title } from "../../components/title"
import { Header } from "../../components/header"
import { Spinner } from "../../components/spinner"

export const Customers = () => {

    const { saveCustomer, loading } = useSaveCustomer();

    const [customerName, setCustomerName] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [address, setAddress] = useState('');

    const handleSaveCustomer = async (e) => {
        e.preventDefault();
        await saveCustomer(customerName, cnpj, address);
        setCustomerName('');
        setCnpj('');
        setAddress('');
    }

    return (
        <div>
            <Header />
            <div className="content">
                <Title name="New Customer">
                    <FiUser size={25} color="#000" />
                </Title>
                <div className="container">
                    <form className="form" onSubmit={handleSaveCustomer}>
                        <div className="input-btn">
                            <label>Customer name</label>
                            <input type="text" placeholder="Name" value={customerName} onChange={(e) => setCustomerName(e.target.value)}/>
                            <label>CNPJ</label>
                            <input type="text" placeholder="CNPJ" value={cnpj} onChange={(e) => setCnpj(e.target.value)}/>
                            <label>Address</label>
                            <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)}/>
                            <button className="btn-customers" type="submit" disabled={loading}>
                                {loading ? <Spinner/> : "Save"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}