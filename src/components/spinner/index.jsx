import { CgSpinner } from "react-icons/cg";
import './spinner.css'

export const Spinner = () => {
    return (
            <div className="spinner">
                <CgSpinner size={16} color="#fff" />
            </div>
    )
}