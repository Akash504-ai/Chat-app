import type * as Brevo from "../../../../index.mjs";
/**
 * @example
 *     {
 *         action: "resend",
 *         email: "email"
 *     }
 */
export interface PutCorporateUserInvitationActionEmailRequest {
    /** Action to be performed (cancel / resend) */
    action: Brevo.PutCorporateUserInvitationActionEmailRequestAction;
    /** Email address of the recipient */
    email: string;
}
