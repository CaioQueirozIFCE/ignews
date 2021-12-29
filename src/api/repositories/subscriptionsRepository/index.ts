import {query as q} from 'faunadb';
import {fauna} from '../../../services/fauna';
import Expr from 'faunadb/src/types/Expr.js'
import {ISubscription} from '../../../DTO/SubscriptionDTO';
class SubscriptionsRespository{
    private readonly  coletions = 'subscriptions'

    //get
    public async queryGetRefSubscritonById(subscriptionId: string): Promise<object>{
        const subscriptionRef = await fauna.query(
            q.Select("ref", q.Get(q.Match(q.Index('subscription_by_id'), subscriptionId)))
        ).then(res => res).catch(err => err);
        return subscriptionRef;
    }
    
    public match(subscriptionId: string, indexMatch: string): Expr {
        const subscription =  q.Match(q.Index(indexMatch), q.Casefold(subscriptionId));
        return subscription;
    }

    //create
    public async queryCreateSubscription(subscription: ISubscription): Promise<ISubscription> {
        const subscriptionSave = await fauna.query<ISubscription>(
            q.Create(q.Collection(this.coletions), {data: subscription})
        ).then(res => res).catch(err => err);
        return subscriptionSave;
    }

    //update
    public async queryReplaceSubscription(subscriptionId:string, subscription: ISubscription): Promise<ISubscription>{
        const updateSubscription = await fauna.query<ISubscription>(
            q.Replace(
                q.Select(
                    "ref", 
                        q.Get(
                            q.Match(
                                q.Index('subscription_by_id'), subscriptionId
                            )
                        ),
                    ),
                {data: subscription}
            )   
        ).then(res => res).catch(err => err);
        return updateSubscription;
    }
}

export { SubscriptionsRespository }