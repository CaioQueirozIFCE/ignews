import { GetStaticPaths, GetStaticProps } from 'next';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { RichText } from 'prismic-dom';
import { useEffect } from 'react';
import { getPrismicClient } from '../../../services/prismic';
import styles from '../stylesPosts/post.module.scss';

type PostPeviewProps = {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
    firstChildIsParagraph: boolean
}

type Props = {
    post: PostPeviewProps
}

const PostPeview = ({ post }: Props) => {
    const session = useSession();
    const router = useRouter();

    useEffect(() => {
        if(session?.data?.activeSubscription){
            router.push(`/posts/${post.slug}`);
        }
    }, [session]);

    return(
        <>
            <Head>
                <title>{post.slug} | ig.news</title>
            </Head>
            <main className={`${styles.contentMain}`}>
                <article className={`${styles.postArticle}`}>
                    <h1>{post.title}</h1>
                    <time className={post.firstChildIsParagraph ? styles.firstChildContentIsParagraph : ''}>{post.updatedAt}</time>
                    <div className={`${styles.post} ${styles.previewContent}`} dangerouslySetInnerHTML={{__html: post.content}}/>
                </article>
            </main>
            <div className={`${styles.continueReading} ${styles.animationButton}`}>
                        Wanna continue reading?
                <Link href="/">
                    <a>
                        Subscribe now <img src="/images/emoji-3d.png" alt="emoji hug" />
                    </a>
                </Link>
            </div>
        </>
    );
}

export default PostPeview;

export const getStaticPaths : GetStaticPaths = () => {

    return {
        paths: [],
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {

    const {slug} = params;

    const prismic = getPrismicClient();

    const response = await prismic.getByUID('publication', String(slug), {});

    const post = {
        slug: response.uid,
        title: RichText.asText(response.data.title),
        content: RichText.asHtml(response.data.content.slice(0, 3)),
        updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        }),
        firstChildIsParagraph: response.data.content[0].type === "paragraph"
    };

    return {
        props:{
            post
        },
        revalidate: 60 * 60 * 24 //24 horas
    }
}