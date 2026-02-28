/**
 * @example
 *     {
 *         pid: "pid",
 *         cpid: "cpid"
 *     }
 */
export interface GetCodeCountRequest {
    /** Loyalty Program ID */
    pid: string;
    /** Code Pool ID */
    cpid: string;
}
