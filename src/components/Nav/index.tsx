import React from "react";
import styles from './styles.module.scss';
import ActivedLink from '../ActivedLink';

type NavProps = {
    testId: string;
}

const Nav: React.FC<NavProps> = ({testId}) => {

    return(
        <nav className={styles.navContainer} data-testid={testId}>
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