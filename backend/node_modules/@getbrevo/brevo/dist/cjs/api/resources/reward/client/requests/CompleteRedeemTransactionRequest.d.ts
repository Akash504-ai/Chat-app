/**
 * @example
 *     {
 *         pid: "pid",
 *         tid: "tid"
 *     }
 */
export interface CompleteRedeemTransactionRequest {
    /** Loyalty Program ID */
    pid: string;
    /** Redeem transaction ID */
    tid: string;
}
