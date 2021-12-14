import { useContext } from "react";
import {ControllModalLoadingContext} from '../contexts/ModalLoader/contextModalLoader';

const useModalLoader = () => {
    const context = useContext(ControllModalLoadingContext);
    if(!context) {
        throw new Error("useModalLoader must be used within an ControllModalLoadingProvider");
    }

    return context;
}

export { useModalLoader };