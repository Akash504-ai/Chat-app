/**
 * @example
 *     {
 *         campaignId: 1000000
 *     }
 */
export interface SendTestSmsRequest {
    /** Id of the SMS campaign */
    campaignId: number;
    /** Mobile number of the recipient with the country code. This number **must belong to one of your contacts in Brevo account and must not be blacklisted** */
    phoneNumber?: string;
}
