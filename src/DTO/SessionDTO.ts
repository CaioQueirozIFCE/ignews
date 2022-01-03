export type SessionDTO = {
    user: User;
    expires: string;
    error?: ErrorSessionSubscription;
    activeSubscription?: ActiveSubscription | null
}

export type User = {
    name: string;
    email: string;
    picture: string;
    sub: string;
    iat: number;
    exp: number;
    jtl: string;
}

export type ErrorSessionSubscription = {
    error: string;
    statusCode: string | number
}

export type ActiveSubscription = {
    customer_ref: object;
    subscriptionId: string;
    status: string;
    price_id: string;
}