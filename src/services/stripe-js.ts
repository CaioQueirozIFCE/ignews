import {loadStripe} from '@stripe/stripe-js';

const getStripeJS = async () => {
    const stripeJs = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
    return stripeJs;
}

export { getStripeJS };