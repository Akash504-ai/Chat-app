/**
 * @example
 *     {
 *         pid: "pid",
 *         tid: "tid"
 *     }
 */
export interface CancelTransactionRequest {
    /** Loyalty Program Id */
    pid: string;
    /** Transaction Id */
    tid: string;
}
