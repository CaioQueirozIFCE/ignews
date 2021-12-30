import React from "react";
import styles from './styles.module.scss';
import { ActivedLink } from '../ActivedLink';

const Nav: React.FC = () => {

    return(
        <nav className={styles.navContainer}>
            <ActivedLink  href="/" passHref activedClassName={styles.active} subPages={false}>
                <a>
                    Home
                </a>
            </ActivedLink>
            <ActivedLink href="/posts" prefetch activedClassName={styles.active} subPages={true}>
                <a>
                    Posts
                </a>
            </ActivedLink>
        </nav>
    );
}

export {Nav};