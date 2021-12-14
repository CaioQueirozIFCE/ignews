import React from 'react';
import {FaGithub} from 'react-icons/fa';
import styles from './styles.module.scss';
import { useSession, signIn, signOut } from 'next-auth/react';
import {useModalTabNavigation} from '../../../../hooks/useModalTabNavigation';

const MobileSignInButton : React.FC = () => {
    const {data:session} = useSession();
    const { enabledComponentModalTabNavigation } = useModalTabNavigation();
    return session ? 
        (
            <button className={`${styles.signInButton} ${styles.borderButtonLogged}`} onClick={enabledComponentModalTabNavigation}>
                <FaGithub color="#04d361"/>
            </button>
            ) : (
            <button className={`${styles.signInButton} ${styles.borderButtonNotLogged}`} onClick={enabledComponentModalTabNavigation}>
                <FaGithub color="#eba417"/>
            </button>
        )
}

export {MobileSignInButton};