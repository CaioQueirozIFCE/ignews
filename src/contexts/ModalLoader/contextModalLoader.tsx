import React, {useState, useCallback, createContext} from "react";
import Loader from "react-loader-spinner";
import styles from './styles.module.scss';

interface IControlModalLoadingSubscribe{
    loadingSubscribe: boolean;
    modalLoadingSubscribe: boolean;
    enabledComponentModalLoading: () => void,
    disabledComponentModalLoading: () => void,
}

interface IControllModalLoadingProps{
    children: React.ReactNode
}

const ControllModalLoadingContext = createContext<IControlModalLoadingSubscribe>({} as IControlModalLoadingSubscribe);

const ControllModalLoadingProvider: React.FC<IControllModalLoadingProps> = ({children}) => {
    const [loadingSubscribe, setLoadingSubscribe] = useState<boolean>(false);
    const [modalLoadingSubscribe, setModalLoadingSubscribe] = useState<boolean>(false);

    const openModalLoadingSubscribe = useCallback(() => setModalLoadingSubscribe(true), []);
    const enableLoadingSubscribe = useCallback(() => setLoadingSubscribe(true), []);
    const closeModalLoadingSubscribe = useCallback(() => !modalLoadingSubscribe ??  setModalLoadingSubscribe(false), [modalLoadingSubscribe]);
    const disableLoadingSubscribe = useCallback(() => !loadingSubscribe ??  setLoadingSubscribe(false), [loadingSubscribe]);
    
    const enabledComponentModalLoading = useCallback(() => {
        openModalLoadingSubscribe()
        enableLoadingSubscribe()
    }, [enableLoadingSubscribe, openModalLoadingSubscribe]);
    
    const disabledComponentModalLoading = useCallback(() => {
        closeModalLoadingSubscribe()
        disableLoadingSubscribe()
    }, [closeModalLoadingSubscribe, disableLoadingSubscribe]);

    return(
        <ControllModalLoadingContext.Provider value={{
            loadingSubscribe,
            modalLoadingSubscribe,
            enabledComponentModalLoading,
            disabledComponentModalLoading,
        }}
        >
            <>
                {modalLoadingSubscribe && (
                    <div className={styles.containerLoaderModal}>
                        {loadingSubscribe && (<Loader
                            type="Watch"
                            color={'#eba417'}
                            secondaryColor={'#000'}
                        />)}
                    </div>)}
                {children}
            </>

        </ControllModalLoadingContext.Provider>
    );
}

export { ControllModalLoadingProvider, ControllModalLoadingContext };