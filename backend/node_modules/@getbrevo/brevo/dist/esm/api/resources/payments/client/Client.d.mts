import type { BaseClientOptions, BaseRequestOptions } from "../../../../BaseClient.mjs";
import { type NormalizedClientOptionsWithAuth } from "../../../../BaseClient.mjs";
import * as core from "../../../../core/index.mjs";
import * as Brevo from "../../../index.mjs";
export declare namespace PaymentsClient {
    type Options = BaseClientOptions;
    interface RequestOptions extends BaseRequestOptions {
    }
}
export declare class PaymentsClient {
    protected readonly _options: NormalizedClientOptionsWithAuth<PaymentsClient.Options>;
    constructor(options: PaymentsClient.Options);
    /**
     * @param {Brevo.CreatePaymentRequestRequest} request
     * @param {PaymentsClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Brevo.BadRequestError}
     * @throws {@link Brevo.UnauthorizedError}
     * @throws {@link Brevo.ForbiddenError}
     *
     * @example
     *     await client.payments.createPaymentRequest({
     *         cart: {
     *             currency: "EUR",
     *             specificAmount: 1200
     *         },
     *         contactId: 43,
     *         reference: "Invoice #INV0001"
     *     })
     */
    createPaymentRequest(request: Brevo.CreatePaymentRequestRequest, requestOptions?: PaymentsClient.RequestOptions): core.HttpResponsePromise<Brevo.CreatePaymentRequestResponse>;
    private __createPaymentRequest;
    /**
     * @param {Brevo.GetPaymentRequestRequest} request
     * @param {PaymentsClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Brevo.BadRequestError}
     * @throws {@link Brevo.UnauthorizedError}
     * @throws {@link Brevo.ForbiddenError}
     * @throws {@link Brevo.NotFoundError}
     *
     * @example
     *     await client.payments.getPaymentRequest({
     *         id: "050db7b0-9bb7-4c1e-9c68-5a8dace8c1dc"
     *     })
     */
    getPaymentRequest(request: Brevo.GetPaymentRequestRequest, requestOptions?: PaymentsClient.RequestOptions): core.HttpResponsePromise<Brevo.GetPaymentRequestResponse>;
    private __getPaymentRequest;
    /**
     * @param {Brevo.DeletePaymentRequestRequest} request
     * @param {PaymentsClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Brevo.UnauthorizedError}
     * @throws {@link Brevo.ForbiddenError}
     * @throws {@link Brevo.NotFoundError}
     *
     * @example
     *     await client.payments.deletePaymentRequest({
     *         id: "9ae7d68a-565c-4695-9381-d8fb3e3a14cc"
     *     })
     */
    deletePaymentRequest(request: Brevo.DeletePaymentRequestRequest, requestOptions?: PaymentsClient.RequestOptions): core.HttpResponsePromise<void>;
    private __deletePaymentRequest;
}
