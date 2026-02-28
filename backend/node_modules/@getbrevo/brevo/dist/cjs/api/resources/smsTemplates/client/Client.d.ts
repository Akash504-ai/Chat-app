import type { BaseClientOptions, BaseRequestOptions } from "../../../../BaseClient.js";
import { type NormalizedClientOptionsWithAuth } from "../../../../BaseClient.js";
import * as core from "../../../../core/index.js";
import * as Brevo from "../../../index.js";
export declare namespace SmsTemplatesClient {
    type Options = BaseClientOptions;
    interface RequestOptions extends BaseRequestOptions {
    }
}
export declare class SmsTemplatesClient {
    protected readonly _options: NormalizedClientOptionsWithAuth<SmsTemplatesClient.Options>;
    constructor(options: SmsTemplatesClient.Options);
    /**
     * @param {Brevo.GetSmsTemplatesRequest} request
     * @param {SmsTemplatesClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Brevo.BadRequestError}
     *
     * @example
     *     await client.smsTemplates.getSmsTemplates()
     */
    getSmsTemplates(request?: Brevo.GetSmsTemplatesRequest, requestOptions?: SmsTemplatesClient.RequestOptions): core.HttpResponsePromise<Brevo.GetSmsTemplatesResponse>;
    private __getSmsTemplates;
}
