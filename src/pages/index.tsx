import { GetStaticProps } from "next";
import Head from "next/head"
import { useEffect } from "react";
import { SubscribeButton } from "../components/SubscribeButton";
import { stripe } from "../services/stripe";
import styles from './home.module.scss';
import {monitorScreenHeight} from '../utils/monitorScreen';

type HomeProps = {
  priceId: string,
  amount: number,
  interval: string,
}

const Home = (products: HomeProps) => {  
  useEffect(() => {
    monitorScreenHeight();
    window.scrollTo({top: 0 - 40, behavior: 'smooth'});
  }, []);
  console.log('home')
  return (
      <>
        <Head>
          <title>Home | ig.news</title>
        </Head>
        <main className={styles.homeContainer}>
          <section className={styles.hero}>
            <div><img src="/images/clapping-hands.png"/> <span>Hey, welcome</span></div>
            <h1>News about the <span>React</span> world.</h1>
            <p>
              Get acess to all the publications <br/>
              <span>for {products.amount} {products.interval}</span>
            </p>
            <SubscribeButton priceId={products.priceId}/>
          </section>
          <img src="/images/avatar.svg" alt="mulher em frente ao notebook, com café e livros ao lado" />
        </main>
      </>
  );
}

export default Home;

export const getStaticProps: GetStaticProps = async () => {

  const price = await stripe.prices.retrieve(
    process.env.STRIPE_PRICE_API_KEY,
    {
      expand: ['product']
    }
  );
  const products = {
    priceId: price.id,
    amount: new Intl.NumberFormat(
      'en-US',
      {
        style: 'currency',
        currency: 'USD'
      }
    ).format(price.unit_amount / 100),
    interval: price.recurring.interval
  };

  return { 
    props: {
      ...products
    },
    revalidate: 60 * 60 * 24 //24 horas
   }
}
