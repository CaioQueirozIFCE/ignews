import {query as q} from 'faunadb';
import {fauna} from '../../../services/fauna';
import Expr from 'faunadb/src/types/Expr.js'
import {CustomersFaunaDB, IUser} from '../../../DTO/CustomersDTO';

class CustomerRepository{

    public matchByEmail(email: string): Expr {
        const customer =  q.Match(q.Index('user_by_email'), q.Casefold(email));
        return customer;
    }

    public createCustomer(email: string): Expr{
        const customer = q.Create(
            q.Collection('users'), {data: {email: email}}
        );
        return customer;
    }

    public getCustomer(email: string): Expr {
        const customer = q.Get(this.matchByEmail(email));
        return customer;
    }

    public async queryGetCustomer(email:string): Promise<CustomersFaunaDB> {
        const customer = await fauna.query<CustomersFaunaDB>(this.getCustomer(email));
        return customer;
    }   

    public async queryUpdateCustomer(customer_ref_id:string,stripe_customer_id: string): Promise<object> {        
        const updateCustomer = await fauna.query(
            q.Update(
                q.Ref(q.Collection('users'), customer_ref_id),
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