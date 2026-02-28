/**
 * @example
 *     {
 *         pid: "pid"
 *     }
 */
export interface PartiallyUpdateLoyaltyProgramRequest {
    /** Loyalty Program ID. A unique identifier for the loyalty program. */
    pid: string;
    /** Loyalty Program description */
    description?: string;
    /** Loyalty Program meta data */
    meta?: Record<string, unknown>;
    /** Loyalty Program name */
    name?: string;
}
