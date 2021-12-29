import AppError from "./typesErrors/AppError";
import {FaunaError, StripeErrors} from '../../DTO/ErrorsDTO/typeErros';
import StripeError from "./typesErrors/StripeError";

interface IResponseError {
    description?: string,
    message?: string,
    statusCode: number
}

const handleErrors = (
    err: AppError | StripeErrors | FaunaError,
): IResponseError => {
    if(err.name !== 'Error'){
        const erro = {
            name: err?.name,
            ...err
        } as FaunaError;
        const error = {
            description: erro?.description,
            statusCode: erro?.requestResult?.statusCode,
        }
        return error;
    }

    if(err instanceof AppError){
        const error = {
            message: err?.message,
            statusCode: err?.statusCode
        } as AppError;
        return error;
    }

    const erro = {
        name: err?.name,
        ...err
    } as StripeErrors;
    const error = new StripeError(erro).handleStripeError();
    return error;
}

export { handleErrors };