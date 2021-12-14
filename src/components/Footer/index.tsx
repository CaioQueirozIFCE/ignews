import React from "react";
import styles from './styles.module.scss';
import { Nav } from "../Nav";

const Footer: React.FC = () => {
    return (
        <div className={styles.footerContainer}>
            <Nav/>
        </div>
    );
}

export {Footer};