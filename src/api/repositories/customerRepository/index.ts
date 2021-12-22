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

    public createCustomer(email: string): Expr{
        const customer = q.Create(
            q.Collection(this.coletions), {data: {email: email}}
        );
        return customer;
    }

    public getCustomer(email: string): Expr {
        const customer = q.Get(this.matchByEmail(email));
        return customer;
    }

    public getStripeCustomerById(stripe_customer_id: string): Expr {
        const customer = q.Get(this.macthByStripeCustomerId(stripe_customer_id));
        return customer;
    }

    public async queryGetCustomer(email:string): Promise<CustomersFaunaDB> {
        const customer = await fauna.query<CustomersFaunaDB>(this.getCustomer(email)).then((ret) => ret).catch((err) => err);
        return customer;
    }

    public async queryGetStripeCustomer(stripe_customer_id: string): Promise<CustomersFaunaDB> {
        const customer = await fauna.query<CustomersFaunaDB>(this.getStripeCustomerById(stripe_customer_id)).then((ret) => ret).catch((err) => err);
        return customer;
    }   

    public async queryCreateCustomer(email: string): Promise<object>{
        const customer = await fauna.query(
            this.createCustomer(email)
        );
        return customer;
    }

    public async queryUpdateCustomer(customer_ref_id:string, stripe_customer_id: string): Promise<object> {        
        const updateCustomer = await fauna.query(
            q.Update(
                q.Ref(q.Collection(this.coletions), customer_ref_id),
                {
                    data:{
                        stripe_customer_id
                    }
                }
            )
        );

        return updateCustomer;
    }
}

export { CustomerRepository }