import Head from 'next/head';
import styles from './style.module.scss';
import {GetServerSideProps, GetStaticProps} from 'next';
import { getPrismicClient } from '../../services/prismic';
import Prismic from '@prismicio/client';
import { RichText } from 'prismic-dom';
import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useModalLoader } from '../../hooks/useModalLoader';

type Post = {
    slug: string;
    title: string;
    excerpt: string;
    updatedAt: string;
}

type contentPrismic = {
    type: string;
    text: string;
    spans: Array<{
        start: number,
        end: number,
        type: string
    }>
}

interface IPostProps {
    posts: Array<Post>,
    totalPages: [],
    pageSize: number | string,
    loaderPost: boolean
}

const Posts = ({ posts, totalPages, pageSize, loaderPost}: IPostProps) => {
    const {enabledComponentModalLoading, disabledComponentModalLoading} = useModalLoader();
    const [pageActived, setPageActived] = useState<number>(1);
    const [loader, setLoader] = useState(loaderPost);
    
    useEffect(() => {
        if(loader){
            setTimeout(disabledComponentModalLoading, 500)
            setLoader(loaderPost);
        }
    }, [loaderPost, disabledComponentModalLoading, loader]);

    const definePageCurrent = useCallback((page: number): boolean => {
        return pageActived === totalPages[page - 1];
    }, [pageActived, totalPages]);

    const generalPage = useCallback((page: number) => {
        setLoader(true);
        enabledComponentModalLoading();
        setPageActived(page);
    }, [enabledComponentModalLoading]);

    const previousPage = useCallback(() => {
        setLoader(true);
        enabledComponentModalLoading();
        setPageActived(pageActived - 1)
    }, [pageActived, enabledComponentModalLoading]);

    const nextPage = useCallback(() => {
        setLoader(true);
        enabledComponentModalLoading();
        setPageActived(pageActived + 1)
    }, [pageActived, enabledComponentModalLoading]);

    return(
        <>
            <Head>
                <title>Posts | Ignews</title>
            </Head>
            <main className={`${styles.container}`}>
                <div className={`${styles.posts}`}>
                    {
                        posts?.map((post: Post) => (
                            <Link key={post.slug} href="#" passHref>
                                <a className={`${styles.contentPosts}`}>
                                    <time>{post.updatedAt}</time>
                                    <strong>{post.title}</strong>
                                    <p>{post.excerpt}</p>
                                </a>
                            </Link>
                        ))
                    }
                <ul className={`${styles.paginatorContent}`}>
                    {
                        pageActived !== 1 && (<li className={`${styles.previous}`} onClick={previousPage}>
                            <Link href={`/posts?page=${pageActived - 1}&size=${3}`}>
                                Previous
                            </Link>
                        </li>)
                    }
                        {totalPages?.map(page => (
                            <li key={page} className={definePageCurrent(page) ? styles.actived : ''} onClick={() => generalPage(page)}>
                                <Link href={`/posts?page=${page}&size=${3}`}>
                                    <a href="">{page}</a>
                                </Link>
                            </li>
                        ))}
                    {
                        pageActived !== totalPages.length && (<li className={`${styles.next}`} onClick={nextPage}>
                             <Link href={`/posts?page=${pageActived + 1}&size=${3}`}>
                                Next
                            </Link>
                        </li>)
                    }
                </ul>
                </div>
            </main>
        </>
    );
} 

export default Posts;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    const { page = '1', size = '3'} = query;
    const pageCurrent = +page;
    const sizeCurrent = +size;
    const prismic = getPrismicClient();
    const response = await prismic.query(
        [
            Prismic.predicates.at('document.type', 'publication')
        ],
        {
            fetch: ['publication.title', 'publication.content'],
            pageSize: sizeCurrent,
            page: pageCurrent
        }
    );
    const posts = response.results.map(post => {
        return {
            slug: post.uid,
            title: RichText.asText(post.data.title),
            excerpt: post.data?.content?.find((content: contentPrismic) => content.type === 'paragraph')?.text ?? '',
            updatedAt: new Date(post?.last_publication_date).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            })
        }
    })

    const totalPages = Array.from({length: response.total_pages}).map((_, index: number) => index + 1);

    return {
        props:{
            posts,
            totalPages,
            pageSize: size,
            loaderPost: false
        }
    }
}

// export const getStaticProps: GetStaticProps = async () => {
//     const prismic = getPrismicClient();

//     const response = await prismic.query(
//         [
//             Prismic.predicates.at('document.type', 'publication')
//         ],
//         {
//             fetch: ['publication.title', 'publication.content'],
//             pageSize: 100
//         }
//     );
//     const posts = response.results?.map(post => {
//         return {
//             slug: post.uid,
//             title: RichText.asText(post.data.title),
//             excerpt: post.data?.content?.find((content: contentPrismic) => content.type === 'paragraph')?.text ?? '',
//             updatedAt: new Date(post?.last_publication_date).toLocaleDateString('pt-BR', {
//                 day: '2-digit',
//                 month: 'long',
//                 year: 'numeric'
//             })
//         }
//     });
//     return {
//         props: {
//             posts 
//         },
//         revalidate: 60 * 60 * 5 //5 horas
//     }
// }