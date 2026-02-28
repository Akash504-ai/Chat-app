import type * as Brevo from "../../../../index.mjs";
/**
 * @example
 *     {
 *         templateId: 1000000,
 *         body: {}
 *     }
 */
export interface SendTestTemplateRequest {
    /** Id of the template */
    templateId: number;
    body: Brevo.SendTestEmail;
}
