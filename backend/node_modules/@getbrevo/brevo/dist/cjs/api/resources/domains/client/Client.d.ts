import type { BaseClientOptions, BaseRequestOptions } from "../../../../BaseClient.js";
import { type NormalizedClientOptionsWithAuth } from "../../../../BaseClient.js";
import * as core from "../../../../core/index.js";
import * as Brevo from "../../../index.js";
export declare namespace DomainsClient {
    type Options = BaseClientOptions;
    interface RequestOptions extends BaseRequestOptions {
    }
}
export declare class DomainsClient {
    protected readonly _options: NormalizedClientOptionsWithAuth<DomainsClient.Options>;
    constructor(options: DomainsClient.Options);
    /**
     * Retrieves all domains associated with the account.
     *
     * Use this to:
     * - List all domains
     * - Verify domain existence
     * - Check domain authentication and verification status
     * - Monitor domain configuration and provider information
     * - Review domain creation history and ownership
     *
     * Key information returned:
     * - Domain details (ID, name, authentication status)
     * - Verification and authentication states
     * - Associated IP addresses and DNS providers
     * - Creator information and creation timestamps
     * - Pagination information for large domain lists
     *
     * @param {DomainsClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Brevo.BadRequestError}
     *
     * @example
     *     await client.domains.getDomains()
     */
    getDomains(requestOptions?: DomainsClient.RequestOptions): core.HttpResponsePromise<Brevo.GetDomainsResponse>;
    private __getDomains;
    /**
     * Creates a new domain in Brevo.
     *
     * Use this to:
     * - Add new domains for sending emails
     * - Set up domain authentication for better deliverability
     * - Configure DNS records for email authentication
     * - Establish domain-based sender identities
     *
     * Key information returned:
     * - Created domain ID and configuration
     * - Required DNS records for authentication
     * - Domain provider detection results
     * - Setup instructions and next steps
     *
     * @param {Brevo.CreateDomainRequest} request
     * @param {DomainsClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Brevo.BadRequestError}
     *
     * @example
     *     await client.domains.createDomain({
     *         name: "mycompany.com"
     *     })
     *
     * @example
     *     await client.domains.createDomain({
     *         name: "newsletter.mycompany.com"
     *     })
     *
     * @example
     *     await client.domains.createDomain({
     *         name: "test.example.com"
     *     })
     */
    createDomain(request: Brevo.CreateDomainRequest, requestOptions?: DomainsClient.RequestOptions): core.HttpResponsePromise<Brevo.CreateDomainResponse>;
    private __createDomain;
    /**
     * Retrieves configuration of a specific domain, to know if the domain is valid or not.
     *
     * Use this to:
     * - Check domain configuration
     * - Validate a domain configuration
     * - Monitor DNS record status
     * - Troubleshoot authentication issues
     *
     * Key information returned:
     * - Domain verification and authentication status
     * - DNS records configuration and validation status
     * - Detailed authentication requirements
     *
     * @param {Brevo.GetDomainConfigurationRequest} request
     * @param {DomainsClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Brevo.BadRequestError}
     * @throws {@link Brevo.NotFoundError}
     *
     * @example
     *     await client.domains.getDomainConfiguration({
     *         domainName: "domainName"
     *     })
     */
    getDomainConfiguration(request: Brevo.GetDomainConfigurationRequest, requestOptions?: DomainsClient.RequestOptions): core.HttpResponsePromise<Brevo.GetDomainConfigurationResponse>;
    private __getDomainConfiguration;
    /**
     * Deletes a domain from Brevo.
     *
     * Use this to:
     * - Remove existing domains
     * - Clean up unused domain configurations
     * - Remove test domains
     *
     * Key information returned:
     * - Success confirmation message
     *
     * @param {Brevo.DeleteDomainRequest} request
     * @param {DomainsClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Brevo.BadRequestError}
     * @throws {@link Brevo.NotFoundError}
     *
     * @example
     *     await client.domains.deleteDomain({
     *         domainName: "domainName"
     *     })
     */
    deleteDomain(request: Brevo.DeleteDomainRequest, requestOptions?: DomainsClient.RequestOptions): core.HttpResponsePromise<void>;
    private __deleteDomain;
    /**
     * Authenticates a specific domain.
     *
     * Use this to:
     * - Authenticate a domain
     * - Verify DNS record configuration
     * - Complete domain setup for sending
     * - Enable domain for email authentication
     *
     * Key information returned:
     * - Authentication success confirmation
     * - Domain readiness status for email sending
     *
     * @param {Brevo.AuthenticateDomainRequest} request
     * @param {DomainsClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Brevo.BadRequestError}
     * @throws {@link Brevo.NotFoundError}
     *
     * @example
     *     await client.domains.authenticateDomain({
     *         domainName: "domainName"
     *     })
     */
    authenticateDomain(request: Brevo.AuthenticateDomainRequest, requestOptions?: DomainsClient.RequestOptions): core.HttpResponsePromise<Brevo.AuthenticateDomainResponse>;
    private __authenticateDomain;
}
