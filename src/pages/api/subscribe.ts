import {NextApiRequest as Request, NextApiResponse as Response} from 'next';
import { stripe } from '../../services/stripe';

const controllerSubscrible =  async (request: Request, response: Response) =>  {

    if(request.method === 'POST'){
        try{
            const {session:{user}} = request.body;
            const stripeCustommer = await stripe.customers.create({
                email: user.email,
                // metadata: 
            });
            const stripeCheckoutSession = await stripe.checkout.sessions.create({
                customer: stripeCustommer.id,
                payment_method_types: ['card'],
                billing_address_collection: 'required',
                line_items: [{
                    price: process.env.STRIPE_PRICE_API_KEY,
                    quantity:1
                }],
                mode: 'subscription',
                allow_promotion_codes: true,
                success_url:process.env.STRIPE_SUCCESS_URL,
                cancel_url: process.env.STRIPE_CANCEL_URL
            });
            return response.status(200).json({sessionId: stripeCheckoutSession.id});
        }catch(error){
            response.status(405).json({error:error.message});
        }
    }else{
        response.setHeader('allow', 'POST');
        response.status(405).end('Method not allowed');
    }
}

export default controllerSubscrible;