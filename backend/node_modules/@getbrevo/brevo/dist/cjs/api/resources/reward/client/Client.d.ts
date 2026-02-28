import type { BaseClientOptions, BaseRequestOptions } from "../../../../BaseClient.js";
import { type NormalizedClientOptionsWithAuth } from "../../../../BaseClient.js";
import * as core from "../../../../core/index.js";
import * as Brevo from "../../../index.js";
export declare namespace RewardClient {
    type Options = BaseClientOptions;
    interface RequestOptions extends BaseRequestOptions {
    }
}
export declare class RewardClient {
    protected readonly _options: NormalizedClientOptionsWithAuth<RewardClient.Options>;
    constructor(options: RewardClient.Options);
    /**
     * Get code count
     *
     * @param {Brevo.GetCodeCountRequest} request
     * @param {RewardClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Brevo.BadRequestError}
     * @throws {@link Brevo.UnauthorizedError}
     * @throws {@link Brevo.ForbiddenError}
     * @throws {@link Brevo.UnprocessableEntityError}
     * @throws {@link Brevo.InternalServerError}
     *
     * @example
     *     await client.reward.getCodeCount({
     *         pid: "pid",
     *         cpid: "cpid"
     *     })
     */
    getCodeCount(request: Brevo.GetCodeCountRequest, requestOptions?: RewardClient.RequestOptions): core.HttpResponsePromise<Brevo.GetCodeCountResponse>;
    private __getCodeCount;
    /**
     * Returns a reward page
     *
     * @param {Brevo.GetLoyaltyOfferProgramsPidOffersRequest} request
     * @param {RewardClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Brevo.UnauthorizedError}
     * @throws {@link Brevo.ForbiddenError}
     * @throws {@link Brevo.NotFoundError}
     * @throws {@link Brevo.UnprocessableEntityError}
     * @throws {@link Brevo.FailedDependencyError}
     * @throws {@link Brevo.InternalServerError}
     *
     * @example
     *     await client.reward.getRewardPageApi({
     *         pid: "pid"
     *     })
     */
    getRewardPageApi(request: Brevo.GetLoyaltyOfferProgramsPidOffersRequest, requestOptions?: RewardClient.RequestOptions): core.HttpResponsePromise<Brevo.GetLoyaltyOfferProgramsPidOffersResponse>;
    private __getRewardPageApi;
    /**
     * Creates a new reward in the loyalty program.
     *
     * @param {Brevo.CreateRewardRequest} request
     * @param {RewardClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Brevo.UnauthorizedError}
     * @throws {@link Brevo.ForbiddenError}
     * @throws {@link Brevo.UnprocessableEntityError}
     * @throws {@link Brevo.InternalServerError}
     *
     * @example
     *     await client.reward.createReward({
     *         pid: "pid",
     *         name: "name"
     *     })
     */
    createReward(request: Brevo.CreateRewardRequest, requestOptions?: RewardClient.RequestOptions): core.HttpResponsePromise<Brevo.CreateRewardResponse>;
    private __createReward;
    /**
     * Create a voucher and attribute it to a specific membership.
     *
     * @param {Brevo.CreateVoucherRequest} request
     * @param {RewardClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Brevo.BadRequestError}
     * @throws {@link Brevo.UnauthorizedError}
     * @throws {@link Brevo.ForbiddenError}
     * @throws {@link Brevo.NotFoundError}
     * @throws {@link Brevo.UnprocessableEntityError}
     * @throws {@link Brevo.InternalServerError}
     *
     * @example
     *     await client.reward.createVoucher({
     *         pid: "pid",
     *         rewardId: "rewardId"
     *     })
     */
    createVoucher(request: Brevo.CreateVoucherRequest, requestOptions?: RewardClient.RequestOptions): core.HttpResponsePromise<Brevo.CreateVoucherResponse>;
    private __createVoucher;
    /**
     * Creates a request to redeem a voucher.
     *
     * @param {Brevo.RedeemVoucherRequest} request
     * @param {RewardClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Brevo.BadRequestError}
     * @throws {@link Brevo.UnauthorizedError}
     * @throws {@link Brevo.ForbiddenError}
     * @throws {@link Brevo.NotFoundError}
     * @throws {@link Brevo.PreconditionFailedError}
     * @throws {@link Brevo.ExpectationFailedError}
     * @throws {@link Brevo.UnprocessableEntityError}
     * @throws {@link Brevo.InternalServerError}
     *
     * @example
     *     await client.reward.redeemVoucher({
     *         pid: "pid"
     *     })
     */
    redeemVoucher(request: Brevo.RedeemVoucherRequest, requestOptions?: RewardClient.RequestOptions): core.HttpResponsePromise<Brevo.Redeem>;
    private __redeemVoucher;
    /**
     * Completes voucher redeem request.
     *
     * @param {Brevo.CompleteRedeemTransactionRequest} request
     * @param {RewardClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Brevo.BadRequestError}
     * @throws {@link Brevo.UnauthorizedError}
     * @throws {@link Brevo.ForbiddenError}
     * @throws {@link Brevo.NotFoundError}
     * @throws {@link Brevo.PreconditionFailedError}
     * @throws {@link Brevo.ExpectationFailedError}
     * @throws {@link Brevo.UnprocessableEntityError}
     * @throws {@link Brevo.InternalServerError}
     *
     * @example
     *     await client.reward.completeRedeemTransaction({
     *         pid: "pid",
     *         tid: "tid"
     *     })
     */
    completeRedeemTransaction(request: Brevo.CompleteRedeemTransactionRequest, requestOptions?: RewardClient.RequestOptions): core.HttpResponsePromise<Brevo.Redeem>;
    private __completeRedeemTransaction;
    /**
     * Revoke attributed vouchers.
     *
     * @param {Brevo.RevokeVouchersRequest} request
     * @param {RewardClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Brevo.NotFoundError}
     * @throws {@link Brevo.InternalServerError}
     *
     * @example
     *     await client.reward.revokeVouchers({
     *         pid: "pid"
     *     })
     */
    revokeVouchers(request: Brevo.RevokeVouchersRequest, requestOptions?: RewardClient.RequestOptions): core.HttpResponsePromise<void>;
    private __revokeVouchers;
    /**
     * Validates a reward.
     *
     * @param {Brevo.ValidateRewardRequest} request
     * @param {RewardClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Brevo.UnauthorizedError}
     * @throws {@link Brevo.ForbiddenError}
     * @throws {@link Brevo.NotFoundError}
     * @throws {@link Brevo.UnprocessableEntityError}
     * @throws {@link Brevo.FailedDependencyError}
     * @throws {@link Brevo.InternalServerError}
     *
     * @example
     *     await client.reward.validateReward({
     *         pid: "pid"
     *     })
     */
    validateReward(request: Brevo.ValidateRewardRequest, requestOptions?: RewardClient.RequestOptions): core.HttpResponsePromise<Brevo.ValidateRewardResponse>;
    private __validateReward;
    /**
     * Returns reward information.
     *
     * @param {Brevo.GetLoyaltyOfferProgramsPidRewardsRidRequest} request
     * @param {RewardClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Brevo.UnauthorizedError}
     * @throws {@link Brevo.ForbiddenError}
     * @throws {@link Brevo.NotFoundError}
     * @throws {@link Brevo.UnprocessableEntityError}
     * @throws {@link Brevo.FailedDependencyError}
     * @throws {@link Brevo.InternalServerError}
     *
     * @example
     *     await client.reward.getRewardInformation({
     *         pid: "pid",
     *         rid: "rid"
     *     })
     */
    getRewardInformation(request: Brevo.GetLoyaltyOfferProgramsPidRewardsRidRequest, requestOptions?: RewardClient.RequestOptions): core.HttpResponsePromise<Brevo.GetLoyaltyOfferProgramsPidRewardsRidResponse>;
    private __getRewardInformation;
    /**
     * Get voucher for a contact
     *
     * @param {Brevo.GetLoyaltyOfferProgramsPidVouchersRequest} request
     * @param {RewardClient.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Brevo.UnauthorizedError}
     * @throws {@link Brevo.ForbiddenError}
     * @throws {@link Brevo.NotFoundError}
     * @throws {@link Brevo.UnprocessableEntityError}
     * @throws {@link Brevo.InternalServerError}
     *
     * @example
     *     await client.reward.getVoucherForAContact({
     *         pid: "pid",
     *         contactId: 1
     *     })
     */
    getVoucherForAContact(request: Brevo.GetLoyaltyOfferProgramsPidVouchersRequest, requestOptions?: RewardClient.RequestOptions): core.HttpResponsePromise<Brevo.GetLoyaltyOfferProgramsPidVouchersResponse>;
    private __getVoucherForAContact;
}
