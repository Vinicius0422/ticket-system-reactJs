import { FiPlusCircle } from "react-icons/fi"
import { Header } from "../../components/header"
import { Title } from "../../components/title"

import './new.css'
import { useContext, useEffect, useState } from "react"
import useGetListCustomers from "../../hooks/useGetListCustomers"
import { AuthContext } from "../../contexts/auth"
import useSaveTicket from "../../hooks/useSaveTicket"


export const New = () => {

    const { getCustomers, setCustomers, customers, loading } = useGetListCustomers();
    const { saveTicket, saveLoading } = useSaveTicket();
    const { user } = useContext(AuthContext);

    const [complement, setComplement] = useState('');
    const [subject, setSubject] = useState('Suport');
    const [status, setStatus] = useState('Opened');
    const [selectedCustomer, setSelectedCustomer] = useState(0)
    const [customer, setCostumer] = useState('')


    useEffect(() => {
        getCustomers();
    }, [])

    const handleOptionChange = (e) => {
        setStatus(e.target.value)
    }

    const handleSelectedSubject = (e) => {
        setSubject(e.target.value)
    }

    const handleSelectedCustomer = (e) => {
        setSelectedCustomer(e.target.value)
        setCostumer(customers[e.target.value].customerName)
    }

    const handleRegister = async(e) => {
        e.preventDefault();
        await saveTicket(user, customer, subject, status, complement);
        setSelectedCustomer(0);
        setComplement('');
        setSubject('Suport');
        setStatus('Opened');
    }

    return (

        <div>
            <Header />

            <div className="content">
                <Title name="New Ticket">
                    <FiPlusCircle size={25} />
                </Title>

                <div className="container">
                    <form className="form" onSubmit={handleRegister}>

                        <div className="input-btn">
                            <label>Customers</label>
                            {
                                loading ? (
                                    <input type="text" value="Loading..." disabled={true} style={{ padding: '0.4rem 1rem' }}/>
                                ) : (
                                    <select value={selectedCustomer} onChange={handleSelectedCustomer}>
                                        {customers.map((customer, index) => {
                                            return(
                                                <option value={index} key={index}>
                                                    {customer.customerName}
                                                </option>
                                            )
                                        })}
                                    </select>
                                )
                            }

                            <label>Subject</label>
                            <select value={subject} onChange={handleSelectedSubject}>
                                <option value="Financial"> Financial</option>
                                <option value="Suport"> Suport</option>
                                <option value="Technical visit"> Technical visit</option>
                            </select>


                            <label>Status</label>
                            <div className="status">
                                <input type="radio" name="radio" value="Opened" onChange={handleOptionChange} checked={status === 'Opened'}/>
                                <span>Opened</span>

                                <input type="radio" name="radio" value="In progress" onChange={handleOptionChange} checked={status === 'In progress'}/>
                                <span>In progress</span>

                                <input type="radio" name="radio" value="Serviced" onChange={handleOptionChange} checked={status === 'Serviced'}/>
                                <span>Serviced</span>
                            </div>
                            <label>Complement</label>
                            <textarea type="text" value={complement} placeholder="Describe the service... (optional)" onChange={(e) => setComplement(e.target.value)}/>

                            <button type="submit">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}