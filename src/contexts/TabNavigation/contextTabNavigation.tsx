import React, {useState, useCallback, createContext} from "react";
import styles from './styles.module.scss';

interface IControlModalTabNavigation{
    modalTabNavigation: boolean;
    enabledComponentModalTabNavigation: () => void,
    disabledComponentModalTabNavigation: () => void,
}

interface IControlModalTabNavigationProps{
    children: React.ReactNode
}

const ControlModalTabNavigationContext = createContext<IControlModalTabNavigation>({} as IControlModalTabNavigation);

const ControlModalTabNavigationProvider: React.FC<IControlModalTabNavigationProps> = ({children}) => {
    const [modalTabNavigation, setModalTabNavigation] = useState<boolean>(false);

    const enableModalTabNavigation = useCallback(() => setModalTabNavigation(true), []);
    const disableModalTabNavigation = useCallback(() => !modalTabNavigation ??  setModalTabNavigation(false), [modalTabNavigation]);
    
    const enabledComponentModalTabNavigation = useCallback(() => {
        enableModalTabNavigation()
    }, [enableModalTabNavigation]);
    
    const disabledComponentModalTabNavigation = useCallback(() => {
        disableModalTabNavigation()
    }, [disableModalTabNavigation]);

    return(
        <ControlModalTabNavigationContext.Provider value={{
            modalTabNavigation,
            enabledComponentModalTabNavigation,
            disabledComponentModalTabNavigation,
        }}
        >
            <>
                {modalTabNavigation && (
                        <div className={styles.modalTabNavigation}>
                            
                        </div>
                    )
                }
                {children}
            </>

        </ControlModalTabNavigationContext.Provider>
    );
}

export { ControlModalTabNavigationProvider, ControlModalTabNavigationContext };