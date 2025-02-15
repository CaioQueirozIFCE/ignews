import { useCallback, useEffect, useState } from 'react';
import styles from './style.module.scss';
import {GetServerSideProps} from 'next';
import Head from 'next/head';
import { getPrismicClient } from '../../services/prismic';
import Link from 'next/link';
import Prismic from '@prismicio/client';
import { RichText } from 'prismic-dom';
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
    pageCurrent: number | string
}

type LimitsPaging = {
    maxLeft: number,
    maxRight: number,
}

const Posts = ({ posts, totalPages, pageCurrent }: IPostProps) => {
    const {enabledComponentModalLoading, disabledComponentModalLoading, loadingSubscribe} = useModalLoader();
    const [pageActived, setPageActived] = useState<number>(+pageCurrent || 1);
    const [limitsPagining, setLimitsPaginig] = useState<LimitsPaging>({
        maxLeft: 1,
        maxRight: 5
    });
    
    useEffect(() => {
        if(loadingSubscribe){
            setTimeout(disabledComponentModalLoading, 500);
        }
    }, [loadingSubscribe, disabledComponentModalLoading]);

    const calculateMaxVisibleButtons = useCallback((page = 1, totalPages): void => {
        const maxButtons = 5;
        let maxLeft = (page - Math.floor(maxButtons / 2));
        let maxRight = (page + Math.floor(maxButtons / 2));

        if(maxLeft < 1){
            maxLeft = 1;
            maxRight = 5;
        }
        if(maxRight > totalPages.length){
            maxLeft = totalPages.length - (maxButtons - 1) < 0 ? 1 : totalPages.length - (maxButtons - 1);
            maxRight = totalPages.length;
        }
        setLimitsPaginig({maxLeft, maxRight});
    }, []);

    const definePageCurrent = useCallback((page: number): boolean => {
        return pageActived === totalPages[page - 1];
    }, [pageActived, totalPages]);

    const generalPage = useCallback((page: number): void => {
        calculateMaxVisibleButtons(page, totalPages);
        enabledComponentModalLoading();
        setPageActived(page);
    }, [enabledComponentModalLoading, calculateMaxVisibleButtons, totalPages]);

    const previousPage = useCallback((): void => {
        enabledComponentModalLoading();
        setPageActived(pageActived - 1);
        calculateMaxVisibleButtons(pageActived - 1, totalPages);
    }, [pageActived, enabledComponentModalLoading, calculateMaxVisibleButtons, totalPages]);

    const nextPage = useCallback((): void => {
        enabledComponentModalLoading();
        setPageActived(pageActived + 1)
        calculateMaxVisibleButtons(pageActived + 1, totalPages);
    }, [pageActived, enabledComponentModalLoading, calculateMaxVisibleButtons, totalPages]);

    return(
        <>
            <Head>
                <title>Posts | ig.news</title>
            </Head>
            <main className={`${styles.container}`}>
                <div className={`${styles.posts}`}>
                    {
                        posts?.map((post: Post) => (
                            <Link key={post.slug} href={`/posts/${post.slug}`} passHref>
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
                            <Link href={`/posts?page=${pageActived - 1}`}>
                                Previous
                            </Link>
                        </li>)
                    }
                        {totalPages.slice(limitsPagining.maxLeft - 1, limitsPagining.maxRight)?.map(page => (
                            <li key={page} className={definePageCurrent(page) ? styles.actived : ''} onClick={() => generalPage(page)}>
                                <Link href={`/posts?page=${page}`}>
                                    <a href="">{page}</a>
                                </Link>
                            </li>
                        ))}
                    {
                        pageActived !== totalPages.length && (<li className={`${styles.next}`} onClick={nextPage}>
                             <Link href={`/posts?page=${pageActived + 1}`}>
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
    const _size = 3;
    const { page = '1'} = query;
    const pageCurrent = +page;
    const sizeCurrent = +_size;
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
            pageSize: _size,
            pageCurrent: page
        }
    }
}

//verificar se carrega uma lista grande e para a paginação ser feita apenas no front, assim poder trocar serverPropos por StaticProps

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