/**
 * @example
 *     {
 *         pid: "pid",
 *         cid: "cid",
 *         tid: "tid"
 *     }
 */
export interface AddSubscriptionToTierRequest {
    /** Loyalty Program ID */
    pid: string;
    /** Contact ID */
    cid: string;
    /** Tier ID */
    tid: string;
}
