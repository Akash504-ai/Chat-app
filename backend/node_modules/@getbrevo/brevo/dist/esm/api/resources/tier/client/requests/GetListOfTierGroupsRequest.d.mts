import type * as Brevo from "../../../../index.mjs";
/**
 * @example
 *     {
 *         pid: "pid"
 *     }
 */
export interface GetListOfTierGroupsRequest {
    /** Loyalty Program ID */
    pid: string;
    /** Select 'active' to retrieve list of all tier groups which are live for clients. Select draft to retrieve list of all non deleted tier groups. */
    version?: Brevo.GetListOfTierGroupsRequestVersion;
}
