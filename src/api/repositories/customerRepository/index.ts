import {query as q} from 'faunadb';
import {fauna} from '../../../services/fauna';
import Expr from 'faunadb/src/types/Expr.js'
import {CustomersFaunaDB } from '../../../DTO/CustomersDTO';

class CustomerRepository{
    private readonly coletions = 'users';

    public matchByEmail(email: string): Expr {
        const customer =  q.Match(q.Index('user_by_email'), q.Casefold(email));
        return customer;
    }

    public macthByStripeCustomerId(stripe_customer_id: string): Expr{
        const customer = q.Match(q.Index('user_by_stripe_customer_id'), stripe_customer_id);
        return customer;
    }

    public async queryGetCustomer(email:string): Promise<CustomersFaunaDB> {
        const customer = await fauna.query<CustomersFaunaDB>(q.Get(q.Match(q.Index('user_by_email'), email))).then(res => res).catch(err => err);
        return customer;
    }

    public async queryRefStripeCustomer(stripe_customer_id: string): Promise<CustomersFaunaDB> {
        const customer = await fauna.query<CustomersFaunaDB>(q.Select("ref", q.Get(q.Match('subscription_by_id'), stripe_customer_id))).then(res => res).catch(err => err);
        return customer;
    }   

    public async queryCreateCustomer(email: string): Promise<CustomersFaunaDB>{
        const customer = await fauna.query<CustomersFaunaDB>(
           q.Create(q.Collection(this.coletions), {data: {email: email}})
        ).then(res => res).catch(err => err);
        return customer;
    }

    public async queryUpdateCustomer(customer_ref_id:string, stripe_customer_id: string): Promise<CustomersFaunaDB> {        
        const updateCustomer = await fauna.query<CustomersFaunaDB>(
            q.Update(
                q.Ref(q.Collection(this.coletions), customer_ref_id),
                {
                    data:{
                        stripe_customer_id
                    }
                }
            )
        ).then(res => res).catch(err => err);

        return updateCustomer;
    }
}

export { CustomerRepository }