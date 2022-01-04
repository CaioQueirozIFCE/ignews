import React, {memo} from 'react';
import { Nav } from '../Nav';
import { SignInButton } from './SignInButton';
import styles from './styles.module.scss';
import {useWindowResize} from '../../hooks/useWindowResize';

const Header: React.FC = () => {
    const {width} = useWindowResize() || {width: 1000};
    console.log('header')
    return(
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <img src="/images/logo.svg" alt="logo ignews"/>
                {width > 921 && <Nav/>}
                <SignInButton/>
            </div>
        </header>
    );  
}

export default memo(Header) ;