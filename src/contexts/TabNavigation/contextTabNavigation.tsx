import React, {useState, useCallback, createContext, useEffect} from "react";
import styles from './styles.module.scss';
import {FiX} from 'react-icons/fi';
import {useSession, signOut as logOut, signIn as logIn} from 'next-auth/react';
import {FaGithub} from 'react-icons/fa';
import {useWindowResize} from "../../hooks/useWindowResize";
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
    const {data:session} = useSession();
    const {width} = useWindowResize() || {width: 1000};
    const [modalTabNavigation, setModalTabNavigation] = useState<boolean>(false);

    const enableModalTabNavigation = useCallback(() => setModalTabNavigation(true), []);
    const disableModalTabNavigation = useCallback(() => modalTabNavigation ??  setModalTabNavigation(false), [modalTabNavigation]);
    
    const enabledComponentModalTabNavigation = useCallback(() => {
        enableModalTabNavigation()
    }, [enableModalTabNavigation]);
    
    const disabledComponentModalTabNavigation = useCallback(() => {
        disableModalTabNavigation()
    }, [disableModalTabNavigation]);

    const signOut = useCallback(() => {
        logOut();
        disabledComponentModalTabNavigation();
    }, [disabledComponentModalTabNavigation]);

    const signIn = useCallback(() => {
        logIn('github');
        disabledComponentModalTabNavigation();
    }, [disabledComponentModalTabNavigation]);

    useEffect(() => {
        function handleClickOutSideModalTabNavigation (event: PointerEvent) {
            if (event.target === document.getElementById('modalTabNavigationCtx')) {
                setModalTabNavigation(false);
            }
        }
        if(modalTabNavigation && width < 700){
            document.addEventListener('click', handleClickOutSideModalTabNavigation);
        }
        () => document.removeEventListener('click', handleClickOutSideModalTabNavigation);
    }, [modalTabNavigation, width]);

    return(
        <ControlModalTabNavigationContext.Provider value={{
            modalTabNavigation,
            enabledComponentModalTabNavigation,
            disabledComponentModalTabNavigation,
        }}
        >
            <>
                {(modalTabNavigation && width < 700) && (
                        <div className={styles.modalTabNavigation} id="modalTabNavigationCtx">
                            <div className={styles.tabNavigation}>
                                <div className={styles.menusTabBar}>
                                    <div className={styles.contentSimbolXAndIconIgnewsTabNavigation}>
                                        <img src="/favicon.png" alt="logo ignews"/>
                                        <button onClick={() => setModalTabNavigation(false)}>
                                            <FiX color="#121212"/>
                                        </button>
                                    </div>
                                    <nav className={styles.navContainerTabNavigation}>
                                        <a className={`${styles.active} ${styles.linkTabNavigation}`} href="#">Home</a>
                                        <a className={`${styles.active} ${styles.linkTabNavigation}`} href="#">Posts</a>
                                    </nav>
                                </div>
                                <div className={styles.loginWithGithub}>
                                    <div>
                                        {session ? 
                                            (
                                                <div className={`${styles.contentImgGithubAndInformationIfIsLogged}`}>
                                                    <FaGithub color="#04d361"/>
                                                    <div className={styles.nameUserLogged}>{session.user.name}</div>
                                                </div>
                                            ) : (
                                                <div className={`${styles.contentImgGithubAndInformationIfIsLogged}`}>
                                                    <FaGithub color="#eba417"/>
                                                    <button onClick={signIn}>Sign in with Github</button>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                                <div className={styles.signOn}>
                                    <button onClick={signOut}>Sign Out</button>
                                </div>
                            </div>
                        </div>
                    )
                }
                {children}
            </>
        </ControlModalTabNavigationContext.Provider>
    );
}

export { ControlModalTabNavigationProvider, ControlModalTabNavigationContext };