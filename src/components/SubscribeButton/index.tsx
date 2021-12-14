import React from 'react';
import styles from './styles.module.scss';
import { useSession, signIn } from 'next-auth/react';
// import { useSession, signIn } from 'next-auth/client';
import api from '../../services/api';
import { getStripeJS } from '../../services/stripe-js';


interface ISUbscribeButton{
    priceId: string
}

const SubscribeButton: React.FC<ISUbscribeButton> = ({priceId}) => {
    const {data:session} = useSession();
    
    const handleSubscribe = async () => {
        if(!session){
            signIn('github')
            return;
        }
        try{
            const response = await api.post('/subscribe', {priceId, session}); 
            console.log('response =>', response)
            const { sessionId } = response.data;
            const stripe = await getStripeJS();
            await stripe.redirectToCheckout({sessionId});
            
        }catch(err){
            alert(err.message);
            console.log('error => ', err);
        }

    }
    return(
        <button
            type="button"
            className={styles.subscribeButton}
            onClick={() => handleSubscribe()}
        >
            Subscribe now
        </button>
    );
}

export { SubscribeButton }