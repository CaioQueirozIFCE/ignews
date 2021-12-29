import Head from 'next/head';
import styles from './style.module.scss';
import {GetStaticProps} from 'next';
import { getPrismicClient } from '../../services/prismic';
import Prismic from '@prismicio/client';
import { RichText } from 'prismic-dom';
import Link from 'next/link';

type Post = {
    slug: string;
    title: string;
    excerpt: string;
    updated: string;
}
interface PostsProps{
    posts: Array<Post>
}

const Posts = ({posts}) => {

    return(
        <>
            <Head>
                <title>Posts | Ignews</title>
            </Head>
            <main className={`${styles.container}`}>
                <div className={`${styles.posts}`}>
                    {
                        posts.map((post: Post) => (
                            <Link key={post.slug} href="#" passHref>
                                <a className={`${styles.contentPosts}`}>
                                    <time>{post.updated}</time>
                                    <strong>{post.title}</strong>
                                    <p>{post.excerpt}</p>
                                </a>
                            </Link>
                        ))
                    }
                </div>
            </main>
        </>
    );
} 

export default Posts;

export const getStaticProps: GetStaticProps = async () => {
    const prismic = getPrismicClient();

    const response = await prismic.query(
        [
            Prismic.predicates.at('document.type', 'publication')
        ],
        {
            fetch: ['publication.title', 'publication.content'],
            pageSize: 100
        }
    );
    
    const posts = response.results?.map(post => {
        return {
            slug: post.uid,
            title: RichText.asText(post.data.title),
            excerpt: post.data.content.find(content => content.type === 'paragraph')?.text ?? '',
            updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            })
        }
    });
    return {
        props: {
            posts
        },
        revalidate: 60 * 60 * 2 //2 horas
    }
}