import { StripeErrors } from "../../../DTO/ErrorsDTO/typeErros";

class StripeError{

    constructor(private error: StripeErrors){}

    private normalizeDescription(description: string){
        return description.split(': ')[0];
    }

    public handleStripeError(){
        switch (this.error.type) {
            case 'StripeCardError':
            // A declined card error
                return {
                    description: this.normalizeDescription(this.error.raw.message),
                    statusCode: this.error.statusCode
                }; // => e.g. "Your card's expiration year is invalid."
            case 'StripeRateLimitError':
                // Too many requests made to the API too quickly
                return {
                    description: this.normalizeDescription(this.error.raw.message),
                    statusCode: this.error.statusCode
                };
            case 'StripeInvalidRequestError':
                // Invalid parameters were supplied to Stripe's API
                return {
                    description: this.normalizeDescription(this.error.raw.message),
                    statusCode: this.error.statusCode
                };
            case 'StripeAPIError':
                // An error occurred internally with Stripe's API
                return {
                    description: this.normalizeDescription(this.error.raw.message),
                    statusCode: this.error.statusCode
                }
            case 'StripeConnectionError':
                // Some kind of error occurred during the HTTPS communication
                return {
                    description: this.normalizeDescription(this.error.raw.message),
                    statusCode: this.error.statusCode
                };
            case 'StripeAuthenticationError':
                // You probably used an incorrect API key
                return {
                    description: this.normalizeDescription(this.error.raw.message),
                    statusCode: this.error.statusCode
                };
            default:
                // Handle any other types of unexpected errors
                return {
                    description: 'Stripe server error',
                    statusCode: 500
                }
        }
    }
}

export default StripeError;