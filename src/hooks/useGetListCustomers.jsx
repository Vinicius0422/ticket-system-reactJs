import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/fireBaseConnection";
import { toast } from "react-toastify";
import { useState } from "react";


const useGetListCustomers = () => {

    const [customers, setCustomers] = useState([])
    const [loading, setLoading] = useState(false)

    const getCustomers = async() => {
        setLoading(true)
        const listRef = collection(db, "customers")
        const querySnapshot = await getDocs(listRef)
        .then((snapshot) => {
            let list = []

            snapshot.forEach((doc) => {
                list.push({
                    id: doc.id,
                    customerName: doc.data().customerName
                })
            })

            if(snapshot.docs.length === 0){
                setCustomers([{ id: '1', customerName: 'Freelancer' }])
                setLoading(false)
                return;
            }

            setCustomers(list);
            setLoading(false)
        })
        .catch((error) => {
            toast.error(error)
        })
    }

    return { getCustomers, setCustomers, customers, loading }
}

export default useGetListCustomers;