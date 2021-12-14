import { useContext } from "react";
import {ControlModalTabNavigationContext} from '../contexts/TabNavigation/contextTabNavigation';

const useModalTabNavigation = () => {
    const context = useContext(ControlModalTabNavigationContext);
    if(!context) {
        throw new Error("useModalTabNavigation must be used within an ControlModalTabNavigationProvider");
    }

    return context;
}

export { useModalTabNavigation };