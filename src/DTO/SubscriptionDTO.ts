import {CustomersFaunaDB} from './CustomersDTO';

const customerRef = {} as CustomersFaunaDB;

export interface ISubscription{
    subscriptionId: string,
    customer_ref: typeof customerRef.ref,
    stripeCustomerId: string,
    status: string,
    price_id: string | number,
}