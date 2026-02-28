/**
 * @example
 *     {
 *         pid: "pid",
 *         bdid: "bdid",
 *         blid: "blid"
 *     }
 */
export interface DeleteBalanceLimitRequest {
    /** Loyalty Program Id */
    pid: string;
    /** Balance Definition Id */
    bdid: string;
    /** Balance Limit Id */
    blid: string;
}
