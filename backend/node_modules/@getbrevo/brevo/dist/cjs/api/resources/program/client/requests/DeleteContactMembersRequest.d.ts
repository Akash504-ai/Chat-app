/**
 * @example
 *     {
 *         pid: "pid",
 *         memberContactIds: "memberContactIds"
 *     }
 */
export interface DeleteContactMembersRequest {
    /** Loyalty Program ID. A unique identifier for the loyalty program. */
    pid: string;
    /** Comma-separated list of member contact IDs to delete from the subscription. */
    memberContactIds: string;
}
