/**
 * @example
 *     {
 *         pid: "pid",
 *         tid: "tid"
 *     }
 */
export interface CompleteTransactionRequest {
    /** Loyalty Program Id */
    pid: string;
    /** Transaction Id */
    tid: string;
}
