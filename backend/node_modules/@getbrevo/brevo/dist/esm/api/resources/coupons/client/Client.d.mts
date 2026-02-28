import type { BaseClientOptions, BaseRequestOptions } from "../../../../BaseClient.mjs";
import { type NormalizedClientOptionsWithAuth } from "../../../../BaseClient.mjs";
import * as core from "../../../../core/index.mjs";
import * as Brevo from "../../../index.mjs";
export declare namespace CouponsClient {
    type Options = BaseClientOptions;
    interface RequestOptions extends BaseRequestOptions {
    }
}
export declare class CouponsClient {
    protected readonly _options: NormalizedClientOptionsWithAuth<CouponsClient.Options>;
    constructor(options: CouponsClient.Options);
    /**
     * @param {Brevo.GetCouponCollectionsRequest} request
     * @param {CouponsClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Brevo.BadRequestError}
     * @throws {@link Brevo.UnauthorizedError}
     *
     * @example
     *     await client.coupons.getCouponCollections()
     */
    getCouponCollections(request?: Brevo.GetCouponCollectionsRequest, requestOptions?: CouponsClient.RequestOptions): core.HttpResponsePromise<Brevo.GetCouponCollection>;
    private __getCouponCollections;
    /**
     * @param {Brevo.CreateCouponCollectionRequest} request
     * @param {CouponsClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Brevo.BadRequestError}
     * @throws {@link Brevo.UnauthorizedError}
     *
     * @example
     *     await client.coupons.createCouponCollection({
     *         defaultCoupon: "Winter",
     *         name: "10%OFF"
     *     })
     */
    createCouponCollection(request: Brevo.CreateCouponCollectionRequest, requestOptions?: CouponsClient.RequestOptions): core.HttpResponsePromise<Brevo.CreateCouponCollectionResponse>;
    private __createCouponCollection;
    /**
     * @param {Brevo.GetCouponCollectionRequest} request
     * @param {CouponsClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Brevo.BadRequestError}
     * @throws {@link Brevo.UnauthorizedError}
     * @throws {@link Brevo.NotFoundError}
     *
     * @example
     *     await client.coupons.getCouponCollection({
     *         id: "id"
     *     })
     */
    getCouponCollection(request: Brevo.GetCouponCollectionRequest, requestOptions?: CouponsClient.RequestOptions): core.HttpResponsePromise<Brevo.GetCouponCollection>;
    private __getCouponCollection;
    /**
     * @param {Brevo.UpdateCouponCollectionRequest} request
     * @param {CouponsClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Brevo.BadRequestError}
     * @throws {@link Brevo.UnauthorizedError}
     *
     * @example
     *     await client.coupons.updateCouponCollection({
     *         id: "id"
     *     })
     */
    updateCouponCollection(request: Brevo.UpdateCouponCollectionRequest, requestOptions?: CouponsClient.RequestOptions): core.HttpResponsePromise<Brevo.UpdateCouponCollectionResponse>;
    private __updateCouponCollection;
    /**
     * @param {Brevo.CreateCouponsRequest} request
     * @param {CouponsClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Brevo.BadRequestError}
     * @throws {@link Brevo.UnauthorizedError}
     * @throws {@link Brevo.NotFoundError}
     *
     * @example
     *     await client.coupons.createCoupons({
     *         collectionId: "23befbae-1505-47a8-bd27-e30ef739f32c",
     *         coupons: ["Uf12AF"]
     *     })
     */
    createCoupons(request: Brevo.CreateCouponsRequest, requestOptions?: CouponsClient.RequestOptions): core.HttpResponsePromise<void>;
    private __createCoupons;
}
