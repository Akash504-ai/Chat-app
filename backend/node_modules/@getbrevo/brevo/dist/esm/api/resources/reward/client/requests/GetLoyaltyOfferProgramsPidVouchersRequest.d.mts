import type * as Brevo from "../../../../index.mjs";
/**
 * @example
 *     {
 *         pid: "pid",
 *         contactId: 1
 *     }
 */
export interface GetLoyaltyOfferProgramsPidVouchersRequest {
    /** Loyalty Program ID */
    pid: string;
    /** Page size */
    limit?: number;
    /** Pagination offset */
    offset?: number;
    /** Sort order */
    sort?: Brevo.GetLoyaltyOfferProgramsPidVouchersRequestSort;
    /** Sort field */
    sortField?: Brevo.GetLoyaltyOfferProgramsPidVouchersRequestSortField;
    /** Contact ID */
    contactId: number;
    /** Metadata value for a Key filter */
    metadata_key_value?: string;
    /** Reward ID */
    rewardId?: string;
}
