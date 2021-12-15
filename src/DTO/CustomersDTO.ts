export interface IUser{
    email: string;
    id: string;
    img: string;
    name: string
}

export type CustomersFaunaDB = {
    ref: {
        id: string,
    };
    ts: number | string;
    data: {
        email:string,
        stripe_customer_id: string
    }
}