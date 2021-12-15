import {IUser} from '../../../DTO/CustomersDTO';
import {CustomerRepository} from '../../repositories/customerRepository';
import Stripe from 'stripe';

class CreateOrListCustomers{
    constructor(
        private stripe: Stripe, 
        private user: IUser, 
        private customerRepository: CustomerRepository
    ){}
    
    public async execute(): Promise<Stripe.Response<Stripe.Customer>>{
        const customer = await this.customerRepository.queryGetCustomer(this.user.email);
        if(!customer){
            throw new Error('Customer not found');
        }

        const stripeCustomerAlreadyExist = await this.stripe.customers.retrieve(customer.data.stripe_customer_id);

        if(stripeCustomerAlreadyExist.deleted || !stripeCustomerAlreadyExist){
            const createdStripeCustomer = await this.stripe.customers.create({
                email: this.user.email
            });
            await this.customerRepository.queryUpdateCustomer(customer.ref.id,createdStripeCustomer.id);
            return createdStripeCustomer;
        }

        await this.customerRepository.queryUpdateCustomer(customer.ref.id, stripeCustomerAlreadyExist.id);
        return stripeCustomerAlreadyExist as Stripe.Response<Stripe.Customer>;
    }

}

export { CreateOrListCustomers }
