/**
 * @example
 *     {
 *         pid: "pid"
 *     }
 */
export interface RevokeVouchersRequest {
    /** Loyalty Program ID */
    pid: string;
    /** Reward Attribution IDs (comma seperated) */
    attributedRewardIds?: string;
}
