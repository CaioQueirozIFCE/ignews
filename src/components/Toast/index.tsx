import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface ToastProps{
    typeError: string,
    message: string,
    configToast?: {
        hideProgressBar?: boolean,
        autoClose?:number,
        position?:'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right',
        theme?:'colored' | 'dark' | 'light',
    }
}
toast.configure({
    hideProgressBar:true,
    autoClose:2000,
    position:'top-center',
    theme:'colored',
});

export const toastMessage = ({typeError, message, configToast}:ToastProps) => {
    console.log('toast =>', typeError, message, configToast)
    switch (typeError) {
        case "success":
            toast.success(message, {...configToast});
        case "warning":
            toast.warning(message, {...configToast});
        case "error":
            toast.error(message, {...configToast});
    }
}