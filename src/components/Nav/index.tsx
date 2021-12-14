import React from "react";
import styles from './styles.module.scss';

const Nav: React.FC = () => {

    return(
        <nav className={styles.navContainer}>
            <a className={styles.active} href="#">Home</a>
            <a href="#">Posts</a>
        </nav>
    );
}

export {Nav};