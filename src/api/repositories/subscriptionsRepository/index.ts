import {query as q} from 'faunadb';
import {fauna} from '../../../services/fauna';
import Expr from 'faunadb/src/types/Expr.js'
import {ISubscription} from '../../../DTO/SubscriptionDTO';

class SubscriptionsRespository{
    private readonly  coletions = 'subscriptions'

    public async queryCreateSubscription(subscription: ISubscription): Promise<ISubscription> {
        const subscriptionSave = await fauna.query<ISubscription>(
            q.Create(q.Collection(this.coletions), {data: subscription})
        ).then(res => res).catch(err => err);
        return subscriptionSave;
    }

        public async queryUpdateSubscription(subscriptionId:string, subscription: ISubscription): Promise<ISubscription>{
        const updateSubscription = await fauna.query<ISubscription>(
            q.Replace(q.Select('ref', this.getSubscription(subscriptionId)), {data: {subscription, abc:true}})   
        ).then(res => res).catch(err => err);
        return updateSubscription;
    }

    public matchById(subscriptionId: string): Expr {
        const subscription =  q.Match(q.Index('subscription_by_id'), q.Casefold(subscriptionId));
        return subscription;
    }

    public getSubscription(subscriptionId: string): Expr {
        const subscription = q.Get(this.matchById(subscriptionId));
        return subscription;
    }

    public async queryGetSubscription(subscriptionId: string): Promise<ISubscription>{
        const subscription = await fauna.query<ISubscription>(
            q.Select('ref', this.getSubscription(subscriptionId))
        ).then(res => res).catch(err => err);
        return subscription;
    }
}

export { SubscriptionsRespository }