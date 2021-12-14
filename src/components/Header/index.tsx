import React from 'react';
import { Nav } from './Nav';
import { SignInButton } from './SignInButton';
import styles from './styles.module.scss';

const Header: React.FC = () => {
    
    return(
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <img src="/images/logo.svg" alt="logo ignews"/>
                <Nav/>
                <SignInButton/>
            </div>
        </header>
    );  
}

export {Header};