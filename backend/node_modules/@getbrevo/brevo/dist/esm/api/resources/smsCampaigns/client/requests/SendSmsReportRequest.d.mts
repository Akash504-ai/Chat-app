import type * as Brevo from "../../../../index.mjs";
/**
 * @example
 *     {
 *         campaignId: 1000000,
 *         body: {
 *             email: {
 *                 body: "Please find attached the report of our last email campaign.",
 *                 to: ["jim.suehan@example.com"]
 *             }
 *         }
 *     }
 */
export interface SendSmsReportRequest {
    /** id of the campaign */
    campaignId: number;
    body: Brevo.SendReport;
}
