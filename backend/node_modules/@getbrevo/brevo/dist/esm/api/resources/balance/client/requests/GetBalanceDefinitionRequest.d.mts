import type * as Brevo from "../../../../index.mjs";
/**
 * @example
 *     {
 *         pid: "pid",
 *         bdid: "bdid"
 *     }
 */
export interface GetBalanceDefinitionRequest {
    /** Loyalty Program Id */
    pid: string;
    /** Balance Definition Id */
    bdid: string;
    /** Version */
    version?: Brevo.GetBalanceDefinitionRequestVersion;
}
