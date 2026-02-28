import type * as Brevo from "../../../../index.mjs";
/**
 * @example
 *     {}
 */
export interface GetTransacSmsReportRequest {
    /** **Mandatory if endDate is used.** Starting date (YYYY-MM-DD) of the report */
    startDate?: string;
    /** **Mandatory if startDate is used.** Ending date (YYYY-MM-DD) of the report */
    endDate?: string;
    /** Number of days in the past including today (positive integer). **Not compatible with 'startDate' and 'endDate'** */
    days?: number;
    /** Filter on a tag */
    tag?: string;
    /** Sort the results in the ascending/descending order of record creation. Default order is **descending** if `sort` is not passed */
    sort?: Brevo.GetTransacSmsReportRequestSort;
}
