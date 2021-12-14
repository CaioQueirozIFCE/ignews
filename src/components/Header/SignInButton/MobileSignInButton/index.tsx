import React from 'react';
import {FaGithub} from 'react-icons/fa';
import {FiX} from 'react-icons/fi';
import styles from './styles.module.scss';
import { useSession, signIn, signOut } from 'next-auth/react';

const MobileSignInButton : React.FC = () => {
    const {data:session} = useSession();

    return session ? 
        (
            <button className={`${styles.signInButton} ${styles.borderButtonLogged}`} onClick={() => {}}>
                <FaGithub color="#04d361"/>
            </button>
            ) : (
            <button className={`${styles.signInButton} ${styles.borderButtonNotLogged}`} onClick={() => {}}>
                <FaGithub color="#eba417"/>
            </button>
        )
}

export {MobileSignInButton};