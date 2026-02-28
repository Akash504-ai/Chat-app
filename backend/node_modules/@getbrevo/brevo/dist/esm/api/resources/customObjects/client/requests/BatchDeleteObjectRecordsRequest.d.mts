/**
 * @example
 *     {
 *         object_type: "vehicle",
 *         identifiers: {
 *             ext_ids: ["ext-001", "ext-002"]
 *         }
 *     }
 */
export interface BatchDeleteObjectRecordsRequest {
    /** Object type for the records to delete */
    object_type: string;
    /** One of the below must be provided */
    identifiers?: BatchDeleteObjectRecordsRequest.Identifiers;
}
export declare namespace BatchDeleteObjectRecordsRequest {
    /**
     * One of the below must be provided
     */
    type Identifiers = {
        ids: number[];
    } | {
        ext_ids: string[];
    };
}
