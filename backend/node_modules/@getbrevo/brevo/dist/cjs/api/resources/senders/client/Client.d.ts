import type { BaseClientOptions, BaseRequestOptions } from "../../../../BaseClient.js";
import { type NormalizedClientOptionsWithAuth } from "../../../../BaseClient.js";
import * as core from "../../../../core/index.js";
import * as Brevo from "../../../index.js";
export declare namespace SendersClient {
    type Options = BaseClientOptions;
    interface RequestOptions extends BaseRequestOptions {
    }
}
export declare class SendersClient {
    protected readonly _options: NormalizedClientOptionsWithAuth<SendersClient.Options>;
    constructor(options: SendersClient.Options);
    /**
     * Retrieves a list of all email senders from your Brevo account with optional filtering.
     *
     * **Use this to:**
     * - Get all available senders for email campaign setup
     * - Find sender details including ID, name, and email address
     * - Filter senders by IP address for dedicated IP users
     * - Filter senders by domain for domain-specific configurations
     * - Monitor sender configuration and status
     *
     * **Key information returned:**
     * - Sender details (ID, name, email address)
     * - Sender status and verification information
     * - Associated IP addresses and domains (for dedicated IP accounts)
     * - Sender configuration settings
     *
     * **Important considerations:**
     * - Standard accounts show empty IP arrays, dedicated IP accounts show IP assignments
     * - Filtering by IP only available for accounts with dedicated IPs
     * - Domain filtering helps organize senders by business units or brands
     * - Sender status indicates if sender is active and ready for campaign use
     * - Email verification required before sender can be used in campaigns
     *
     * @param {Brevo.GetSendersRequest} request
     * @param {SendersClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Brevo.BadRequestError}
     *
     * @example
     *     await client.senders.getSenders()
     */
    getSenders(request?: Brevo.GetSendersRequest, requestOptions?: SendersClient.RequestOptions): core.HttpResponsePromise<Brevo.GetSendersResponse>;
    private __getSenders;
    /**
     * Creates a new email sender in your Brevo account.
     *
     * **Use this to:**
     * - Add new senders for email campaigns
     * - Configure sender identity (name and email)
     * - Associate dedicated IPs with the sender (for dedicated IP accounts)
     * - Set up domain-based sender configurations
     *
     * **Key information returned:**
     * - Created sender ID
     * - DKIM and SPF configuration status
     * - Success confirmation
     *
     * **Important considerations:**
     * - Verification email sent to specified sender address
     * - DKIM and SPF configuration affects deliverability
     * - Dedicated IP accounts require IP association during creation
     * - IP weights must sum to 100 when specified
     * - Sender must be verified before use in campaigns
     *
     * @param {Brevo.CreateSenderRequest} request
     * @param {SendersClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Brevo.BadRequestError}
     *
     * @example
     *     await client.senders.createSender({
     *         email: "support@example.com",
     *         name: "Support Team"
     *     })
     *
     * @example
     *     await client.senders.createSender({
     *         email: "marketing@example.com",
     *         ips: [{
     *                 domain: "example.com",
     *                 ip: "203.0.113.100",
     *                 weight: 100
     *             }],
     *         name: "Marketing Team"
     *     })
     *
     * @example
     *     await client.senders.createSender({
     *         email: "newsletter@example.com",
     *         ips: [{
     *                 domain: "example.com",
     *                 ip: "203.0.113.100",
     *                 weight: 60
     *             }, {
     *                 domain: "news.example.com",
     *                 ip: "203.0.113.101",
     *                 weight: 40
     *             }],
     *         name: "Newsletter"
     *     })
     */
    createSender(request: Brevo.CreateSenderRequest, requestOptions?: SendersClient.RequestOptions): core.HttpResponsePromise<Brevo.CreateSenderResponse>;
    private __createSender;
    /**
     * Retrieves all dedicated IPs associated with your Brevo account.
     *
     * Use this to:
     * - List all your dedicated IPs
     * - Check the status of your dedicated IPs (active/inactive)
     * - Find IP addresses and associated domains for configuration purposes
     * - Monitor your IP reputation and deliverability
     * - Verify available IPs for sender configuration
     *
     * Key information returned:
     * - IP ID and address
     * - Associated domain
     * - Active status
     * - IP configuration details
     *
     * @param {SendersClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Brevo.BadRequestError}
     *
     * @example
     *     await client.senders.getIps()
     */
    getIps(requestOptions?: SendersClient.RequestOptions): core.HttpResponsePromise<Brevo.GetIpsResponse>;
    private __getIps;
    /**
     * Updates an existing email sender's configuration.
     *
     * Use this to:
     * - Modify sender display name or email address
     * - Update dedicated IP associations
     * - Change sender configuration settings
     * - Correct sender information
     *
     * Key information returned:
     * - Success confirmation
     * - Updated sender details
     *
     * @param {Brevo.UpdateSenderRequest} request
     * @param {SendersClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Brevo.BadRequestError}
     * @throws {@link Brevo.NotFoundError}
     *
     * @example
     *     await client.senders.updateSender({
     *         senderId: 1000000,
     *         name: "New Support Team"
     *     })
     *
     * @example
     *     await client.senders.updateSender({
     *         senderId: 1000000,
     *         email: "newsupport@mycompany.com"
     *     })
     *
     * @example
     *     await client.senders.updateSender({
     *         senderId: 1000000,
     *         email: "marketing@mycompany.com",
     *         name: "Marketing Team"
     *     })
     *
     * @example
     *     await client.senders.updateSender({
     *         senderId: 1000000,
     *         email: "marketing@enterprise.com",
     *         ips: [{
     *                 domain: "enterprise.com",
     *                 ip: "192.168.1.100",
     *                 weight: 100
     *             }],
     *         name: "Enterprise Marketing"
     *     })
     *
     * @example
     *     await client.senders.updateSender({
     *         senderId: 1000000,
     *         email: "campaigns@enterprise.com",
     *         ips: [{
     *                 domain: "enterprise.com",
     *                 ip: "192.168.1.100",
     *                 weight: 70
     *             }, {
     *                 domain: "mail.enterprise.com",
     *                 ip: "192.168.1.101",
     *                 weight: 30
     *             }],
     *         name: "Multi-IP Sender"
     *     })
     */
    updateSender(request: Brevo.UpdateSenderRequest, requestOptions?: SendersClient.RequestOptions): core.HttpResponsePromise<void>;
    private __updateSender;
    /**
     * Deletes an email sender from your Brevo account.
     *
     * Use this to:
     * - Remove senders that are no longer needed
     * - Clean up sender configurations
     * - Remove duplicate or test senders
     *
     * Key information returned:
     * - Success confirmation message
     *
     * @param {Brevo.DeleteSenderRequest} request
     * @param {SendersClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Brevo.BadRequestError}
     * @throws {@link Brevo.NotFoundError}
     *
     * @example
     *     await client.senders.deleteSender({
     *         senderId: 1000000
     *     })
     */
    deleteSender(request: Brevo.DeleteSenderRequest, requestOptions?: SendersClient.RequestOptions): core.HttpResponsePromise<void>;
    private __deleteSender;
    /**
     * Retrieves the dedicated IPs associated with a specific sender.
     *
     * Use this to:
     * - Check IP configuration for a sender
     * - Verify dedicated IP associations
     * - Get IP details for troubleshooting
     * - Monitor sender IP configuration
     *
     * Key information returned:
     * - List of associated dedicated IPs
     * - IP addresses and domain configurations
     * - IP status and settings
     *
     * @param {Brevo.GetIpsFromSenderRequest} request
     * @param {SendersClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Brevo.BadRequestError}
     * @throws {@link Brevo.NotFoundError}
     *
     * @example
     *     await client.senders.getIpsFromSender({
     *         senderId: 1000000
     *     })
     */
    getIpsFromSender(request: Brevo.GetIpsFromSenderRequest, requestOptions?: SendersClient.RequestOptions): core.HttpResponsePromise<Brevo.GetIpsFromSenderResponse>;
    private __getIpsFromSender;
    /**
     * Validates a sender using the OTP (One-Time Password) received via email.
     *
     * Use this to:
     * - Complete sender verification process
     * - Activate a newly created sender
     * - Verify ownership of the sender email address
     * - Enable the sender for use in email campaigns
     *
     * Key information returned:
     * - Success confirmation of sender verification
     * - Sender activation status
     *
     * @param {Brevo.ValidateSenderByOtpRequest} request
     * @param {SendersClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Brevo.BadRequestError}
     * @throws {@link Brevo.NotFoundError}
     *
     * @example
     *     await client.senders.validateSenderByOtp({
     *         senderId: 1000000,
     *         otp: 123456
     *     })
     *
     * @example
     *     await client.senders.validateSenderByOtp({
     *         senderId: 1000000,
     *         otp: 789012
     *     })
     */
    validateSenderByOtp(request: Brevo.ValidateSenderByOtpRequest, requestOptions?: SendersClient.RequestOptions): core.HttpResponsePromise<void>;
    private __validateSenderByOtp;
}
