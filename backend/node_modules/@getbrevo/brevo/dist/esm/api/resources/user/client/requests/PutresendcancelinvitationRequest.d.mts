import type * as Brevo from "../../../../index.mjs";
/**
 * @example
 *     {
 *         action: "resend",
 *         email: "email"
 *     }
 */
export interface PutresendcancelinvitationRequest {
    /** action */
    action: Brevo.PutresendcancelinvitationRequestAction;
    /** Email of the invited user. */
    email: string;
}
