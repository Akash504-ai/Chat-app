import type { BaseClientOptions, BaseRequestOptions } from "../../../../BaseClient.mjs";
import { type NormalizedClientOptionsWithAuth } from "../../../../BaseClient.mjs";
import * as core from "../../../../core/index.mjs";
import * as Brevo from "../../../index.mjs";
export declare namespace ExternalFeedsClient {
    type Options = BaseClientOptions;
    interface RequestOptions extends BaseRequestOptions {
    }
}
export declare class ExternalFeedsClient {
    protected readonly _options: NormalizedClientOptionsWithAuth<ExternalFeedsClient.Options>;
    constructor(options: ExternalFeedsClient.Options);
    /**
     * Retrieves all external feeds from your Brevo account with filtering and pagination.
     *
     * **Use this to:**
     * - Get an overview of all external data feeds
     * - Find feeds by name using search functionality
     * - Filter feeds by creation date range
     * - Browse feeds by authentication type
     * - Monitor feed library organization and usage
     *
     * **Key information returned:**
     * - Feed details (UUID, name, URL, authentication type)
     * - Feed configuration and settings
     * - Creation and modification timestamps
     * - Feed status and error information
     * - Authentication and header configurations
     *
     * **Important considerations:**
     * - External feeds enable dynamic content in email campaigns
     * - Feeds must be accessible from Brevo servers
     * - Authentication credentials are securely stored
     * - Feed performance affects campaign delivery
     * - Use pagination for accounts with many feeds
     * - Date range filtering limited to 30 days maximum
     * - Search functionality works on feed name matching
     * - Internal feeds are system-managed and cannot be modified
     *
     * @param {Brevo.GetAllExternalFeedsRequest} request
     * @param {ExternalFeedsClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Brevo.BadRequestError}
     * @throws {@link Brevo.NotFoundError}
     *
     * @example
     *     await client.externalFeeds.getAllExternalFeeds({
     *         search: "product",
     *         startDate: "2024-01-01",
     *         endDate: "2024-01-31"
     *     })
     */
    getAllExternalFeeds(request?: Brevo.GetAllExternalFeedsRequest, requestOptions?: ExternalFeedsClient.RequestOptions): core.HttpResponsePromise<Brevo.GetAllExternalFeedsResponse>;
    private __getAllExternalFeeds;
    /**
     * Creates a new external feed for dynamic content in email campaigns.
     *
     * **Use this to:**
     * - Set up external data sources for dynamic content
     * - Configure authentication for protected feeds
     * - Enable real-time content updates in campaigns
     * - Establish connections to product catalogs, blogs, or APIs
     *
     * **Key information returned:**
     * - Created feed UUID for reference in campaigns
     * - Success confirmation
     *
     * **Important considerations:**
     * - Feed URL must be accessible from Brevo infrastructure
     * - Authentication credentials are securely encrypted
     * - Test feed accessibility before campaign use
     * - Consider feed response time for campaign performance
     * - Monitor feed reliability and uptime
     * - Use caching for frequently accessed feeds
     * - Maximum 5 retry attempts allowed for failed requests
     * - Custom headers support for API integration requirements
     *
     * @param {Brevo.CreateExternalFeedRequest} request
     * @param {ExternalFeedsClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Brevo.BadRequestError}
     *
     * @example
     *     await client.externalFeeds.createExternalFeed({
     *         name: "Public API Feed",
     *         url: "https://jsonplaceholder.typicode.com/posts",
     *         authType: "noAuth",
     *         maxRetries: 3,
     *         cache: true
     *     })
     *
     * @example
     *     await client.externalFeeds.createExternalFeed({
     *         name: "Product Catalog",
     *         url: "https://api.example.com/products",
     *         authType: "noAuth",
     *         maxRetries: 3,
     *         cache: true
     *     })
     *
     * @example
     *     await client.externalFeeds.createExternalFeed({
     *         name: "Internal Blog Feed",
     *         url: "https://blog.example.com/api/posts",
     *         authType: "noAuth",
     *         maxRetries: 3,
     *         cache: true
     *     })
     */
    createExternalFeed(request: Brevo.CreateExternalFeedRequest, requestOptions?: ExternalFeedsClient.RequestOptions): core.HttpResponsePromise<Brevo.CreateExternalFeedResponse>;
    private __createExternalFeed;
    /**
     * Retrieves details of a specific external feed by its UUID.
     *
     * **Use this to:**
     * - Get complete configuration of an external feed
     * - Check feed authentication settings
     * - Review feed personalization options
     * - Verify feed URL and parameters
     * - Monitor feed modification history
     *
     * **Key information returned:**
     * - Complete feed configuration and settings
     * - Authentication credentials and headers
     * - Personalization and fallback settings
     * - Creation and modification timestamps
     * - Cache and retry configurations
     *
     * **Important considerations:**
     * - UUID must exist in your account
     * - Provides complete feed information for troubleshooting
     * - Essential before making modifications
     * - Shows current feed health status
     * - Useful for debugging feed issues
     *
     * @param {Brevo.GetExternalFeedByUuidRequest} request
     * @param {ExternalFeedsClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Brevo.BadRequestError}
     * @throws {@link Brevo.NotFoundError}
     *
     * @example
     *     await client.externalFeeds.getExternalFeedByUuid({
     *         uuid: "b1c2d3e4-f5a6-47b8-89c0-d1e2f3a4b5c6"
     *     })
     */
    getExternalFeedByUuid(request: Brevo.GetExternalFeedByUuidRequest, requestOptions?: ExternalFeedsClient.RequestOptions): core.HttpResponsePromise<Brevo.GetExternalFeedByUuidResponse>;
    private __getExternalFeedByUuid;
    /**
     * Updates configuration of an existing external feed.
     *
     * **Use this to:**
     * - Update feed URLs when data sources change
     * - Modify authentication credentials
     * - Change cache and retry settings
     * - Update custom headers
     * - Rename feeds for better organization
     *
     * **Key information returned:**
     * - Success confirmation message
     *
     * **Important considerations:**
     * - Only provided fields will be updated
     * - Feed UUID must exist in your account
     * - Authentication changes require verification
     * - URL changes should be tested before campaign use
     * - Monitor campaigns using this feed after updates
     *
     * @param {Brevo.UpdateExternalFeedRequest} request
     * @param {ExternalFeedsClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Brevo.BadRequestError}
     * @throws {@link Brevo.NotFoundError}
     *
     * @example
     *     await client.externalFeeds.updateExternalFeed({
     *         uuid: "b1c2d3e4-f5a6-47b8-89c0-d1e2f3a4b5c6",
     *         name: "Updated Product Catalog",
     *         url: "https://api.newstore.com/products/v2"
     *     })
     *
     * @example
     *     await client.externalFeeds.updateExternalFeed({
     *         uuid: "b1c2d3e4-f5a6-47b8-89c0-d1e2f3a4b5c6",
     *         authType: "token",
     *         token: "newabc123token789"
     *     })
     *
     * @example
     *     await client.externalFeeds.updateExternalFeed({
     *         uuid: "b1c2d3e4-f5a6-47b8-89c0-d1e2f3a4b5c6",
     *         maxRetries: 5,
     *         cache: true
     *     })
     *
     * @example
     *     await client.externalFeeds.updateExternalFeed({
     *         uuid: "b1c2d3e4-f5a6-47b8-89c0-d1e2f3a4b5c6",
     *         headers: [{
     *                 name: "X-API-Version",
     *                 value: "v2"
     *             }, {
     *                 name: "User-Agent",
     *                 value: "Brevo-Feed-Client/1.0"
     *             }]
     *     })
     *
     * @example
     *     await client.externalFeeds.updateExternalFeed({
     *         uuid: "b1c2d3e4-f5a6-47b8-89c0-d1e2f3a4b5c6",
     *         name: "Enterprise Product Feed",
     *         url: "https://enterprise-api.company.com/catalog",
     *         authType: "token",
     *         token: "enterprise789token123",
     *         headers: [{
     *                 name: "Authorization",
     *                 value: "Bearer enterprise789token123"
     *             }, {
     *                 name: "Accept",
     *                 value: "application/json"
     *             }],
     *         maxRetries: 3,
     *         cache: true
     *     })
     */
    updateExternalFeed(request: Brevo.UpdateExternalFeedRequest, requestOptions?: ExternalFeedsClient.RequestOptions): core.HttpResponsePromise<void>;
    private __updateExternalFeed;
    /**
     * Deletes an external feed from your Brevo account.
     *
     * **Use this to:**
     * - Remove external feeds that are no longer needed
     * - Clean up unused data sources
     * - Remove test or outdated feeds
     * - Maintain organized feed library
     *
     * **Key information returned:**
     * - Success confirmation message
     *
     * **Important considerations:**
     * - This action is PERMANENT and cannot be undone
     * - Feed configuration and history will be lost
     * - Check if feed is used in active campaigns before deletion
     * - Remove feed references from email templates
     * - Consider deactivating instead of deleting if unsure
     *
     * @param {Brevo.DeleteExternalFeedRequest} request
     * @param {ExternalFeedsClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Brevo.BadRequestError}
     * @throws {@link Brevo.NotFoundError}
     *
     * @example
     *     await client.externalFeeds.deleteExternalFeed({
     *         uuid: "b1c2d3e4-f5a6-47b8-89c0-d1e2f3a4b5c6"
     *     })
     */
    deleteExternalFeed(request: Brevo.DeleteExternalFeedRequest, requestOptions?: ExternalFeedsClient.RequestOptions): core.HttpResponsePromise<void>;
    private __deleteExternalFeed;
}
