/**
 * @example
 *     {
 *         pid: "pid",
 *         bdid: "bdid",
 *         blid: "blid",
 *         constraintType: "transaction",
 *         durationUnit: "day",
 *         durationValue: 1,
 *         transactionType: "credit",
 *         value: 1
 *     }
 */
export interface UpdateBalanceLimitRequest {
    /** Loyalty Program Id */
    pid: string;
    /** Balance Definition Id */
    bdid: string;
    /** Balance Limit Id */
    blid: string;
    /** Defines whether the limit applies to transaction count or amount. */
    constraintType: UpdateBalanceLimitRequest.ConstraintType;
    /** Unit of time for which the limit is applicable. */
    durationUnit: UpdateBalanceLimitRequest.DurationUnit;
    /** Number of time units for the balance limit. */
    durationValue: number;
    /** Determines if the limit resets on a rolling schedule. */
    slidingSchedule?: boolean;
    /** Specifies whether the limit applies to credit or debit transactions. */
    transactionType: UpdateBalanceLimitRequest.TransactionType;
    /** Maximum allowed value for the specified constraint type. */
    value: number;
}
export declare namespace UpdateBalanceLimitRequest {
    /** Defines whether the limit applies to transaction count or amount. */
    const ConstraintType: {
        readonly Transaction: "transaction";
        readonly Amount: "amount";
    };
    type ConstraintType = (typeof ConstraintType)[keyof typeof ConstraintType];
    /** Unit of time for which the limit is applicable. */
    const DurationUnit: {
        readonly Day: "day";
        readonly Week: "week";
        readonly Month: "month";
        readonly Year: "year";
    };
    type DurationUnit = (typeof DurationUnit)[keyof typeof DurationUnit];
    /** Specifies whether the limit applies to credit or debit transactions. */
    const TransactionType: {
        readonly Credit: "credit";
        readonly Debit: "debit";
    };
    type TransactionType = (typeof TransactionType)[keyof typeof TransactionType];
}
