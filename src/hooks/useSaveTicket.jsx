import { addDoc, collection } from "firebase/firestore";
import { db } from "../config/fireBaseConnection";
import { useState } from "react";
import { toast } from "react-toastify";

const useSaveTicket = () => {

    const [saveLoading, setSaveLoading] = useState(false);

    const saveTicket = async (user, customer, subject, status, complement) => {
        setSaveLoading(true)
        await addDoc(collection(db, "tickets"), {
            customer: customer,
            subject: subject,
            status: status,
            complement: complement,
            created_at: new Date(),
            user: user.uid,
        })
        .then(() => {

            setSaveLoading(false)
            toast.success("Saved successfully")
        })
        .catch(() => {
            setSaveLoading(false)
            toast.error("Something went wrong")
        })
    }


    return { saveTicket, saveLoading }
}

export default useSaveTicket;