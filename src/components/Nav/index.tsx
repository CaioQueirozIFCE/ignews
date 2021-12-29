import React from "react";
import styles from './styles.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Nav: React.FC = () => {
    const {pathname} = useRouter();

    return(
        <nav className={styles.navContainer}>
            <Link  href="/" passHref >
                <a className={pathname === '/' ? styles.active : ''}>
                    Home
                </a>
            </Link>
            <Link href="/posts" passHref>
                <a className={pathname === '/posts' ? styles.active : ''}>
                    Posts
                </a>
            </Link>
        </nav>
    );
}

export {Nav};