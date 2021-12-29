import React from "react";
import styles from './styles.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Nav: React.FC = () => {
    const {pathname} = useRouter();

    return(
        <nav className={styles.navContainer}>
            <Link  href="/" passHref>
                <div className={pathname === '/' ? styles.active : ''}>
                    Home
                </div>
            </Link>
            <Link href="/posts" passHref>
                <div className={pathname === '/posts' ? styles.active : ''}>
                    Posts
                </div>
            </Link>
        </nav>
    );
}

export {Nav};