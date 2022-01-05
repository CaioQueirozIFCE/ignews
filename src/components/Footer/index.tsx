import React from "react";
import styles from './styles.module.scss';
import { Nav } from "../Nav";

const Footer: React.FC = () => {
    return (
        <div className={styles.footerContainer} data-testid="TestFooterComponent">
            <Nav testId={"TestNavComponentFooter"}/>
        </div>
    );
}

export {Footer};