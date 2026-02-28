/**
 * @example
 *     {
 *         id: 3232323
 *     }
 */
export interface PostCorporateSubAccountSsoTokenRequest {
    /** User email of sub-account organization */
    email?: string;
    /** Id of the sub-account organization */
    id: number;
    /**
     * **Set target after login success** * **automation** - Redirect
     * to Automation after login * **email_campaign** - Redirect to
     * Email Campaign after login * **contacts** - Redirect to Contacts
     * after login * **landing_pages** - Redirect to Landing Pages
     * after login * **email_transactional** - Redirect to Email
     * Transactional after login * **senders** - Redirect to Senders
     * after login * **sms_campaign** - Redirect to Sms Campaign after
     * login * **sms_transactional** - Redirect to Sms Transactional
     * after login
     */
    target?: PostCorporateSubAccountSsoTokenRequest.Target;
    /**
     * Set the full target URL after login success. The user will land
     * directly on this target URL after login
     */
    url?: string;
}
export declare namespace PostCorporateSubAccountSsoTokenRequest {
    /**
     * **Set target after login success** * **automation** - Redirect
     * to Automation after login * **email_campaign** - Redirect to
     * Email Campaign after login * **contacts** - Redirect to Contacts
     * after login * **landing_pages** - Redirect to Landing Pages
     * after login * **email_transactional** - Redirect to Email
     * Transactional after login * **senders** - Redirect to Senders
     * after login * **sms_campaign** - Redirect to Sms Campaign after
     * login * **sms_transactional** - Redirect to Sms Transactional
     * after login
     */
    const Target: {
        readonly Automation: "automation";
        readonly EmailCampaign: "email_campaign";
        readonly Contacts: "contacts";
        readonly LandingPages: "landing_pages";
        readonly EmailTransactional: "email_transactional";
        readonly Senders: "senders";
        readonly SmsCampaign: "sms_campaign";
        readonly SmsTransactional: "sms_transactional";
    };
    type Target = (typeof Target)[keyof typeof Target];
}
