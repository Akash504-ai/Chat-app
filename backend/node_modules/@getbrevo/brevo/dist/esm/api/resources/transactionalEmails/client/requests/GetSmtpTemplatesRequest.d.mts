import type * as Brevo from "../../../../index.mjs";
/**
 * @example
 *     {}
 */
export interface GetSmtpTemplatesRequest {
    /** Filter on the status of the template. Active = true, inactive = false */
    templateStatus?: boolean;
    /** Number of documents returned per page */
    limit?: number;
    /** Index of the first document in the page */
    offset?: number;
    /** Sort the results in the ascending/descending order of record creation. Default order is **descending** if `sort` is not passed */
    sort?: Brevo.GetSmtpTemplatesRequestSort;
}
