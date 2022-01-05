import React from 'react';
import {FaGithub} from 'react-icons/fa';
import {FiX} from 'react-icons/fi';
import styles from './styles.module.scss';
import { useSession, signIn, signOut } from 'next-auth/react';
import Button from '../../../Button';

const DesktopSignInButton : React.FC = () => {
    const {data:session} = useSession() || {data: null};

    return session ? 
        (
            <Button 
                className={styles.signInButton} 
                onClick={() => signOut()} 
                role="button" 
                name="button-logged" 
                type="button"
            >
                <>
                    <FaGithub color="#04d361" />
                    {session.user.name}
                    <FiX color="#737380" className={styles.closeIcon}/>
                </>
            </Button>
            ) : (
            <Button 
                className={styles.signInButton} 
                onClick={() => signIn('github')} 
                role="button" name="button-unlogged" 
                type="button" 
                data-testid="TestRenderButtonSignInForDesktop"
            >
                <>
                    <FaGithub color="#eba417"/>
                    Sign in with Github
                </>
            </Button>
        )
}

export {DesktopSignInButton};