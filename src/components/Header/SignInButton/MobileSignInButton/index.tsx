import React from 'react';
import {FaGithub} from 'react-icons/fa';
import styles from './styles.module.scss';
import { useSession } from 'next-auth/react';
import {useModalTabNavigation} from '../../../../hooks/useModalTabNavigation';
import Button from '.././../../Button';

interface MobileSignInButtonProps{
    enabledComponentModalTabNavigation(): void;
}

const MobileSignInButton : React.FC<MobileSignInButtonProps> = ({enabledComponentModalTabNavigation}) => {
    const {data:session} = useSession() || {data: null};
    
    return session ? 
        (
            <Button 
                className={`${styles.signInButton} ${styles.borderButtonLogged}`} 
                onClick={enabledComponentModalTabNavigation}
                role="button" 
                type="button"
                data-testid="TestRenderButtonSignInForMobile"
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