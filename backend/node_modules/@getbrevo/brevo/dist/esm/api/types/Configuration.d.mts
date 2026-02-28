/**
 * Optional. Redirect contact to a custom success page once payment is successful. If empty the default Brevo page will be displayed once a payment is validated
 */
export interface Configuration {
    /** Absolute URL of the custom success page. */
    customSuccessUrl: string;
}
