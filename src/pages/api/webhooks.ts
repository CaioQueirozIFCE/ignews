import {NextApiRequest , NextApiResponse} from 'next';
import { Readable } from 'stream';
import Stripe from 'stripe';
import { stripe } from '../../services/stripe';
import { handleErrors } from '../../api/errors/handleErrors';
import { manageSubscription } from '../../api/services/StripeServices/ManageSubscription';

async function buffer(readble: Readable){
    const chunks = [];
    for await (const chunk of readble) {
        chunks.push(
            typeof chunk === 'string' ? Buffer.from(chunk) : chunk
         );
    }
    return Buffer.concat(chunks);
}

export const config = {
    api:{
        bodyParser: false
    }
}

const relevantsEvent = new Set([
    'checkout.session.completed',
    'customer.subscription.updated'
]);

const webHooks = async (request: NextApiRequest, response: NextApiResponse) => {
    if(request.method === 'POST'){
        const buf = await buffer(request);
        const secret = request.headers['stripe-signature'];
        
        let event: Stripe.Event;

        try{
            event = stripe.webhooks.constructEvent(buf, secret, process.env.STRIPE_WEBHOOK_KEY_SECRET);
        }catch(error){
            return response.status(400).send(`Webhook error: ${error.message}`);
        }
        
        const { type } = event;

        if(relevantsEvent.has(type)){
            try{
                switch(type){
                    case 'customer.subscription.updated':
                        const subscription = event.data.object as Stripe.Subscription;
                        await manageSubscription(
                            subscription.id,
                            subscription.customer.toString(),
                            false
                        );
                        break;
                    case 'checkout.session.completed':
                        const checkoutSession = event.data.object as Stripe.Checkout.Session;
                        await manageSubscription(
                            checkoutSession.subscription.toString(),
                            checkoutSession.customer.toString(),
                            true
                        );
                        break;

                    default:
                        throw new Error('Unhandled event');
                }      
            }catch(error){
                const err = handleErrors(error);
                return response.status(error.statusCode ?? 500).json({data: err.description ?? err.message});
            }

        }
        response.json({ received: true });
    }else{
        response.setHeader('allow', 'POST');
        response.status(405).end('Method not allowed');
    }
}

export default webHooks;
