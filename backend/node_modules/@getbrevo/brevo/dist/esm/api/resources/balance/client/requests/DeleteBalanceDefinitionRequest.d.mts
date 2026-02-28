/**
 * @example
 *     {
 *         pid: "pid",
 *         bdid: "bdid"
 *     }
 */
export interface DeleteBalanceDefinitionRequest {
    /** Loyalty Program Id */
    pid: string;
    /** Balance Definition Id */
    bdid: string;
}
