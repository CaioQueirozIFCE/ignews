import React from 'react';
import {FaGithub} from 'react-icons/fa';
import styles from './styles.module.scss';
import { useSession } from 'next-auth/react';
import {useModalTabNavigation} from '../../../../hooks/useModalTabNavigation';
import Button from '.././../../Button';

const MobileSignInButton : React.FC = () => {
    const {data:session} = useSession() || {data: null};

    const { enabledComponentModalTabNavigation } = useModalTabNavigation();
    
    return session ? 
        (
            <Button 
                className={`${styles.signInButton} ${styles.borderButtonLogged}`} 
                onClick={enabledComponentModalTabNavigation}
                role="button" 
                type="button"
            >
                <FaGithub color="#04d361" data-testid="svgGitHubLogged"/>
            </Button>
            ) : (
            <Button 
                className={`${styles.signInButton} ${styles.borderButtonNotLogged}`} 
                onClick={enabledComponentModalTabNavigation} 
                data-testid="TestRenderButtonSignInForMobile"
                role="button" 
                type="button"
            >
                <FaGithub color="#eba417" data-testid="svgGitHubUnLogged"/>
            </Button>
        )
}

export {MobileSignInButton};