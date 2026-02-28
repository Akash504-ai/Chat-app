/**
 * @example
 *     {
 *         name: "Public API Feed",
 *         url: "https://jsonplaceholder.typicode.com/posts",
 *         authType: "noAuth",
 *         maxRetries: 3,
 *         cache: true
 *     }
 *
 * @example
 *     {
 *         name: "Product Catalog",
 *         url: "https://api.example.com/products",
 *         authType: "noAuth",
 *         maxRetries: 3,
 *         cache: true
 *     }
 *
 * @example
 *     {
 *         name: "Internal Blog Feed",
 *         url: "https://blog.example.com/api/posts",
 *         authType: "noAuth",
 *         maxRetries: 3,
 *         cache: true
 *     }
 */
export interface CreateExternalFeedRequest {
    /** Name of the feed */
    name: string;
    /** URL of the external data source */
    url: string;
    /** Authentication type for accessing the feed */
    authType?: CreateExternalFeedRequest.AuthType;
    /** Username for basic authentication (required if authType is 'basic') */
    username?: string;
    /** Password for basic authentication (required if authType is 'basic') */
    password?: string;
    /** Token for token-based authentication (required if authType is 'token') */
    token?: string;
    /** Maximum number of retry attempts for failed requests */
    maxRetries?: number;
    /** Whether to cache the feed response */
    cache?: boolean;
    /** Custom HTTP headers for the feed request */
    headers?: CreateExternalFeedRequest.Headers.Item[];
}
export declare namespace CreateExternalFeedRequest {
    /** Authentication type for accessing the feed */
    const AuthType: {
        readonly Basic: "basic";
        readonly Token: "token";
        readonly NoAuth: "noAuth";
    };
    type AuthType = (typeof AuthType)[keyof typeof AuthType];
    type Headers = Headers.Item[];
    namespace Headers {
        interface Item {
            /** Header name */
            name: string;
            /** Header value */
            value: string;
        }
    }
}
