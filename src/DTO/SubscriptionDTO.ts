import {CustomersFaunaDB} from './CustomersDTO';

const customerRef = {} as CustomersFaunaDB;

export interface ISubscription{
    subscriptionId: string,
    customer_ref: typeof customerRef,
    stripeCustomerId: string,
    status: string,
    price_id: string | number,
}