import Head from 'next/head';
import styles from './style.module.scss';

const Posts = () => {

    return(
        <>
            <Head>
                <title>Posts | Ignews</title>
            </Head>
            <main className={`${styles.container}`}>
                <div className={`${styles.posts}`}>
                    <a>
                        <time>12 de dezembro de 2021</time>
                        <strong>Título do Post</strong>
                        <p>Corpo do Post</p>
                    </a>
                    <a>
                        <time>12 de dezembro de 2021</time>
                        <strong>Título do Post</strong>
                        <p>Corpo do Post</p>
                    </a>
                    <a>
                        <time>12 de dezembro de 2021</time>
                        <strong>Título do Post</strong>
                        <p>Corpo do Post</p>
                    </a>
                </div>
            </main>
        </>
    );
} 

export default Posts;