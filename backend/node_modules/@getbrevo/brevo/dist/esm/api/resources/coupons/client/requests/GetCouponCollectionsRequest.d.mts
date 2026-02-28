import type * as Brevo from "../../../../index.mjs";
/**
 * @example
 *     {}
 */
export interface GetCouponCollectionsRequest {
    /** Number of documents returned per page */
    limit?: number;
    /** Index of the first document on the page */
    offset?: number;
    /** Sort the results by creation time in ascending/descending order */
    sort?: Brevo.GetCouponCollectionsRequestSort;
    /** The field used to sort coupon collections */
    sortBy?: Brevo.GetCouponCollectionsRequestSortBy;
}
