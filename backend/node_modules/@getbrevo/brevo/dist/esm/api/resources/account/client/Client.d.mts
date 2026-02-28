import type { BaseClientOptions, BaseRequestOptions } from "../../../../BaseClient.mjs";
import { type NormalizedClientOptionsWithAuth } from "../../../../BaseClient.mjs";
import * as core from "../../../../core/index.mjs";
import * as Brevo from "../../../index.mjs";
export declare namespace AccountClient {
    type Options = BaseClientOptions;
    interface RequestOptions extends BaseRequestOptions {
    }
}
export declare class AccountClient {
    protected readonly _options: NormalizedClientOptionsWithAuth<AccountClient.Options>;
    constructor(options: AccountClient.Options);
    /**
     * Retrieves details of your Brevo account.
     *
     * **Use this to:**
     * - Get account information (email, name, company, address)
     * - Check plan details (type, credits, expiration)
     * - Get relay information (for transactional emails)
     * - Check Marketing Automation status
     * - View date/time preferences and account settings
     * - Access organization and user identifiers
     *
     * **Key information returned:**
     * - Complete account details (organization ID, user ID, company information)
     * - Address and contact information
     * - Plan configurations and credit allocations across different verticals
     * - Marketing Automation settings and tracker key
     * - SMTP relay configuration for transactional emails
     * - Date/time preferences and account settings
     * - Enterprise features availability status
     *
     * **Important considerations:**
     * - Provides comprehensive account overview for billing and configuration management
     * - Essential for understanding current plan limitations and feature availability
     * - Marketing Automation key required for advanced automation features
     * - Plan verticals show detailed breakdown across Marketing, Chat, and CRM categories
     * - Relay configuration crucial for transactional email setup and deliverability
     * - Date/time preferences affect campaign scheduling and reporting displays
     * - Enterprise status determines access to advanced features and sub-account management
     *
     * @param {AccountClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @example
     *     await client.account.getAccount()
     */
    getAccount(requestOptions?: AccountClient.RequestOptions): core.HttpResponsePromise<Brevo.GetAccountResponse>;
    private __getAccount;
    /**
     * Retrieves user activity logs from your organization for security monitoring and audit compliance.
     *
     * Use this to:
     * - Monitor user login activities and access patterns
     * - Track account modifications and configuration changes
     * - Generate security audit reports and compliance documentation
     * - Investigate suspicious activities and unauthorized access
     * - Monitor team member actions and account usage
     *
     * Key information returned:
     * - Complete user activity details and timestamps
     * - User identification (email, IP address, browser)
     * - Action types and activity descriptions
     * - Security-relevant events and access logs
     * - Historical activity data for audit trails
     *
     * Note: Requires Enterprise plan for access to organization activity logs.
     *
     * @param {Brevo.GetAccountActivityRequest} request
     * @param {AccountClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Brevo.BadRequestError}
     *
     * @example
     *     await client.account.getAccountActivity()
     */
    getAccountActivity(request?: Brevo.GetAccountActivityRequest, requestOptions?: AccountClient.RequestOptions): core.HttpResponsePromise<Brevo.GetAccountActivityResponse>;
    private __getAccountActivity;
}
