import React, { useState } from 'react';
import styles from './styles.module.scss';
import { useSession, signIn } from 'next-auth/react';
import api from '../../services/api';
import { getStripeJS } from '../../services/stripe-js';
import { useModalLoader } from '../../hooks/useModalLoader';
import {toastMessage} from '../Toast';

interface ISUbscribeButton{
    priceId: string
}

const SubscribeButton: React.FC<ISUbscribeButton> = ({priceId}) => {
    const {data:session} = useSession();
    const [disabledButtonSubscribe, setDisabledButtonSubscribe] = useState<boolean>(false);
    const {disabledComponentModalLoading, enabledComponentModalLoading} = useModalLoader();
    const handleSubscribe = async () => {
        if(!session){
            signIn('github')
            return;
        }
        try{
            setDisabledButtonSubscribe(true);
            enabledComponentModalLoading();
            const response = await api.post('/subscribe', {priceId, session}); 
            const { sessionId } = response.data;
            const stripe = await getStripeJS();
            await stripe.redirectToCheckout({sessionId}); 
        }catch(err){
            toastMessage({typeError: 'error', message: err?.response?.data?.data});
            console.log(err?.response?.data?.data)
        }finally{
            disabledComponentModalLoading();
            setDisabledButtonSubscribe(false);
        }
    }
    return(
        <button
            type="button"
            className={`${styles.subscribeButton} ${disabledButtonSubscribe ? styles.typeCursorNotAllowed : styles.typeCursorPointer}`}
            onClick={() => handleSubscribe()}
            disabled={disabledButtonSubscribe}
        >
            Subscribe now
        </button>
    );
}

export { SubscribeButton }