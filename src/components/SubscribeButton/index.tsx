import React, { useState } from 'react';
import styles from './styles.module.scss';
import { useSession, signIn } from 'next-auth/react';
import api from '../../services/api';
import { getStripeJS } from '../../services/stripe-js';
import { useModalLoader } from '../../hooks/useModalLoader';
import {toastMessage} from '../Toast';
import { useRouter } from 'next/router';
import Button from '../Button';

interface ISUbscribeButton{
    priceId: string
}

const SubscribeButton: React.FC<ISUbscribeButton> = ({priceId}) => {
    const {data:session} = useSession() || {data: null};
    const [disabledButtonSubscribe, setDisabledButtonSubscribe] = useState<boolean>(false);
    const {disabledComponentModalLoading, enabledComponentModalLoading} = useModalLoader();
    const router = useRouter();
    const handleSubscribe = async () => {
        if(!session){
            signIn('github')
            return;
        }
        if(session.activeSubscription){
            return router.push('/posts');
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
        }finally{
            disabledComponentModalLoading();
            setDisabledButtonSubscribe(false);
        }
    }
    return(
        <Button
            type="button"
            className={`${styles.subscribeButton} ${disabledButtonSubscribe ? styles.typeCursorNotAllowed : styles.typeCursorPointer}`}
            onClick={() => handleSubscribe()}
            disabled={disabledButtonSubscribe}
        >
            <>
                Subscribe now
            </>
        </Button>
    );
}

export { SubscribeButton }