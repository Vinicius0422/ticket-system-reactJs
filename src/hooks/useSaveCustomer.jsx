import { collection, addDoc } from "firebase/firestore";
import { db } from "../config/fireBaseConnection";
import { toast } from "react-toastify";
import { useState } from "react";


const useSaveCustomer = () => {

    const [loading, setLoading] = useState(false);

    const saveCustomer = async (customerName, cnpj, address) => {
        setLoading(true);

        if(customerName !== '' && cnpj !== '' && address !== ''){
            await addDoc(collection(db, "customers"), {
                customerName: customerName,
                cnpj: cnpj,
                address: address,
            })
            .then(() => {
                setLoading(false);
                toast.success("Saved successfully");
            })
            .catch(() => {
                setLoading(false);
                toast.error("Something went wrong");
            })
        } else {
            toast.error("Fill in all fields");
        }
        
    }

    return { saveCustomer, loading }
}

export default useSaveCustomer;