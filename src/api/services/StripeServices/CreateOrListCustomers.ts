import {CustomersFaunaDB, IUser} from '../../../DTO/CustomersDTO';
import {CustomerRepository} from '../../repositories/customerRepository';
import Stripe from 'stripe';
import AppError from '../../errors/typesErrors/AppError';
class CreateOrListCustomers{
    constructor(
        private stripe: Stripe, 
        private user: IUser, 
        private customerRepository: CustomerRepository
    ){}
    
    public async createStripeCustomer(customer: CustomersFaunaDB): Promise<Stripe.Response<Stripe.Customer>>{
        const createStripeCustomer = await this.stripe.customers.create({
            email: customer.data.email
        });
        await this.customerRepository.queryUpdateCustomer(customer.ref.id, createStripeCustomer.id);
        return createStripeCustomer;
    }

    public async execute(): Promise<Stripe.Response<Stripe.Customer>>{
        const customer = await this.customerRepository.queryGetCustomer(this.user.email);
        if(!customer){
            throw new AppError('Customer not found', 404);
        }
        if(!customer.data.stripe_customer_id){
            const createStripeCustomer = await this.createStripeCustomer(customer);
            return createStripeCustomer;
        }

        const stripeCustomerAlreadyExist = await this.stripe.customers.retrieve('customer.data.stripe_customer_id');
        
        if(stripeCustomerAlreadyExist.deleted || !stripeCustomerAlreadyExist){
            const createStripeCustomer = await this.createStripeCustomer(customer);
            return createStripeCustomer;
        }

        await this.customerRepository.queryUpdateCustomer(customer.ref.id, stripeCustomerAlreadyExist.id);
        return stripeCustomerAlreadyExist as Stripe.Response<Stripe.Customer>;
    }

}

export { CreateOrListCustomers }
