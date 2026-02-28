import * as core from "../core/index.mjs";
declare const PARAM_KEY: "apiKey";
export declare class HeaderAuthProvider implements core.AuthProvider {
    private readonly options;
    constructor(options: HeaderAuthProvider.Options);
    static canCreate(options: Partial<HeaderAuthProvider.Options>): boolean;
    getAuthRequest({ endpointMetadata, }?: {
        endpointMetadata?: core.EndpointMetadata;
    }): Promise<core.AuthRequest>;
}
export declare namespace HeaderAuthProvider {
    const AUTH_SCHEME: "api-key";
    const AUTH_CONFIG_ERROR_MESSAGE: string;
    type Options = AuthOptions;
    type AuthOptions = {
        [PARAM_KEY]: core.Supplier<string>;
    };
    function createInstance(options: Options): core.AuthProvider;
}
export {};
