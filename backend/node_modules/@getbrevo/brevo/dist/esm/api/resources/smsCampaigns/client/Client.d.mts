import type { BaseClientOptions, BaseRequestOptions } from "../../../../BaseClient.mjs";
import { type NormalizedClientOptionsWithAuth } from "../../../../BaseClient.mjs";
import * as core from "../../../../core/index.mjs";
import * as Brevo from "../../../index.mjs";
export declare namespace SmsCampaignsClient {
    type Options = BaseClientOptions;
    interface RequestOptions extends BaseRequestOptions {
    }
}
export declare class SmsCampaignsClient {
    protected readonly _options: NormalizedClientOptionsWithAuth<SmsCampaignsClient.Options>;
    constructor(options: SmsCampaignsClient.Options);
    /**
     * @param {Brevo.GetSmsCampaignsRequest} request
     * @param {SmsCampaignsClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Brevo.BadRequestError}
     *
     * @example
     *     await client.smsCampaigns.getSmsCampaigns()
     */
    getSmsCampaigns(request?: Brevo.GetSmsCampaignsRequest, requestOptions?: SmsCampaignsClient.RequestOptions): core.HttpResponsePromise<Brevo.GetSmsCampaignsResponse>;
    private __getSmsCampaigns;
    /**
     * @param {Brevo.CreateSmsCampaignRequest} request
     * @param {SmsCampaignsClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Brevo.BadRequestError}
     *
     * @example
     *     await client.smsCampaigns.createSmsCampaign({
     *         content: "Get a discount by visiting our NY store and saying : Happy Spring!",
     *         name: "Spring Promo Code",
     *         sender: "MyShop"
     *     })
     */
    createSmsCampaign(request: Brevo.CreateSmsCampaignRequest, requestOptions?: SmsCampaignsClient.RequestOptions): core.HttpResponsePromise<Brevo.CreateSmsCampaignResponse>;
    private __createSmsCampaign;
    /**
     * @param {Brevo.GetSmsCampaignRequest} request
     * @param {SmsCampaignsClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Brevo.BadRequestError}
     * @throws {@link Brevo.NotFoundError}
     *
     * @example
     *     await client.smsCampaigns.getSmsCampaign({
     *         campaignId: 1000000
     *     })
     */
    getSmsCampaign(request: Brevo.GetSmsCampaignRequest, requestOptions?: SmsCampaignsClient.RequestOptions): core.HttpResponsePromise<Brevo.GetSmsCampaignResponse>;
    private __getSmsCampaign;
    /**
     * @param {Brevo.UpdateSmsCampaignRequest} request
     * @param {SmsCampaignsClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Brevo.BadRequestError}
     * @throws {@link Brevo.NotFoundError}
     *
     * @example
     *     await client.smsCampaigns.updateSmsCampaign({
     *         campaignId: 1000000
     *     })
     */
    updateSmsCampaign(request: Brevo.UpdateSmsCampaignRequest, requestOptions?: SmsCampaignsClient.RequestOptions): core.HttpResponsePromise<void>;
    private __updateSmsCampaign;
    /**
     * @param {Brevo.DeleteSmsCampaignRequest} request
     * @param {SmsCampaignsClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Brevo.BadRequestError}
     * @throws {@link Brevo.NotFoundError}
     *
     * @example
     *     await client.smsCampaigns.deleteSmsCampaign({
     *         campaignId: 1000000
     *     })
     */
    deleteSmsCampaign(request: Brevo.DeleteSmsCampaignRequest, requestOptions?: SmsCampaignsClient.RequestOptions): core.HttpResponsePromise<void>;
    private __deleteSmsCampaign;
    /**
     * It returns the background process ID which on completion calls the notify URL that you have set in the input.
     *
     * @param {Brevo.RequestSmsRecipientExportRequest} request
     * @param {SmsCampaignsClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Brevo.BadRequestError}
     * @throws {@link Brevo.NotFoundError}
     *
     * @example
     *     await client.smsCampaigns.requestSmsRecipientExport({
     *         campaignId: 1000000,
     *         recipientsType: "all"
     *     })
     */
    requestSmsRecipientExport(request: Brevo.RequestSmsRecipientExportRequest, requestOptions?: SmsCampaignsClient.RequestOptions): core.HttpResponsePromise<Brevo.RequestSmsRecipientExportResponse>;
    private __requestSmsRecipientExport;
    /**
     * @param {Brevo.SendSmsCampaignNowRequest} request
     * @param {SmsCampaignsClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Brevo.BadRequestError}
     * @throws {@link Brevo.PaymentRequiredError}
     * @throws {@link Brevo.NotFoundError}
     *
     * @example
     *     await client.smsCampaigns.sendSmsCampaignNow({
     *         campaignId: 1000000
     *     })
     */
    sendSmsCampaignNow(request: Brevo.SendSmsCampaignNowRequest, requestOptions?: SmsCampaignsClient.RequestOptions): core.HttpResponsePromise<void>;
    private __sendSmsCampaignNow;
    /**
     * Send report of Sent and Archived campaign, to the specified email addresses, with respective data and a pdf attachment in detail.
     *
     * @param {Brevo.SendSmsReportRequest} request
     * @param {SmsCampaignsClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Brevo.BadRequestError}
     * @throws {@link Brevo.NotFoundError}
     *
     * @example
     *     await client.smsCampaigns.sendSmsReport({
     *         campaignId: 1000000,
     *         body: {
     *             email: {
     *                 body: "Please find attached the report of our last email campaign.",
     *                 to: ["jim.suehan@example.com"]
     *             }
     *         }
     *     })
     */
    sendSmsReport(request: Brevo.SendSmsReportRequest, requestOptions?: SmsCampaignsClient.RequestOptions): core.HttpResponsePromise<void>;
    private __sendSmsReport;
    /**
     * @param {Brevo.SendTestSmsRequest} request
     * @param {SmsCampaignsClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Brevo.BadRequestError}
     * @throws {@link Brevo.NotFoundError}
     *
     * @example
     *     await client.smsCampaigns.sendTestSms({
     *         campaignId: 1000000
     *     })
     */
    sendTestSms(request: Brevo.SendTestSmsRequest, requestOptions?: SmsCampaignsClient.RequestOptions): core.HttpResponsePromise<void>;
    private __sendTestSms;
    /**
     * @param {Brevo.UpdateSmsCampaignStatusRequest} request
     * @param {SmsCampaignsClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Brevo.BadRequestError}
     * @throws {@link Brevo.NotFoundError}
     *
     * @example
     *     await client.smsCampaigns.updateSmsCampaignStatus({
     *         campaignId: 1000000,
     *         body: {}
     *     })
     */
    updateSmsCampaignStatus(request: Brevo.UpdateSmsCampaignStatusRequest, requestOptions?: SmsCampaignsClient.RequestOptions): core.HttpResponsePromise<void>;
    private __updateSmsCampaignStatus;
}
