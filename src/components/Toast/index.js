import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const showToast = (props) => {
    const { statusType, message, position } = props;

    switch (statusType) {
    case "SUCCESS":
        return toast.success(message, {
            position: position || 'bottom-right',
            theme: "colored",
        });
    case "ERROR":
        return toast.error(message, {
            position: position || 'bottom-right',
            theme: "colored",
        });
    default:
        return toast.success(message);
    }
};

export const throwSuccessMessage = (message) => showToast({ statusType: "SUCCESS", message })
export const throwErrorMessage = (message) => showToast({ statusType: "ERROR", message })