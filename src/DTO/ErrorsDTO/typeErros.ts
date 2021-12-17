export type StripeErrors = {
    name:string;
    type: string;
    raw: {
        message: string;
    };
    rawType: string;
    statusCode: number;
}

export type FaunaError = {
    name: string;
    description: string;
    requestResult:{
        statusCode: number;
    }
}