/**
 * @example
 *     {
 *         pid: "pid",
 *         cid: "cid",
 *         balanceDefinitionId: "balanceDefinitionId"
 *     }
 */
export interface PostLoyaltyBalanceProgramsPidSubscriptionsCidBalancesRequest {
    /** Loyalty Program Id */
    pid: string;
    /** Contact Id */
    cid: string;
    /** Unique identifier (UUID) of the balance definition associated with the new balance. */
    balanceDefinitionId: string;
}
