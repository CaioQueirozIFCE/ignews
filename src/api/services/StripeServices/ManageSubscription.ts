import { ISubscription } from '../../../DTO/SubscriptionDTO';
import { stripe } from '../../../services/stripe';
import {CustomerRepository} from '../../repositories/customerRepository';
import { SubscriptionsRespository } from '../../repositories/subscriptionsRepository';

const manageSubscription = async (
    subscriptionId: string,
    customerId:string,
    createAction: boolean
) => {
    console.log('entrou manage')
    const customerRepository = new CustomerRepository();
    const subscriptionRepository = new SubscriptionsRespository();

    const customer = await customerRepository.queryGetStripeCustomer(customerId);
    
    if(!customer){
        throw new Error('Stripe customer not found');
    }

    const subscription = await stripe.subscriptions.retrieve(subscriptionId);

    const subscriptionData =  {
        customer_ref: customer.ref,
        subscriptionId: subscription.id,
        status: subscription.status,
        price_id: subscription.items.data[0].price.id
    } as ISubscription;

    if(createAction){
        //cria a subscription
        const createSubscription = await subscriptionRepository.queryCreateSubscription(subscriptionData);
        return createSubscription;
    }

    const updateSubscription = await subscriptionRepository.queryUpdateSubscription(subscription.id, subscriptionData);
    return updateSubscription;
}

export { manageSubscription }

//buscar o usuario no banco do faunaDB com o ID (customer)
//salvar os dados da subscription no banco FaunaDb