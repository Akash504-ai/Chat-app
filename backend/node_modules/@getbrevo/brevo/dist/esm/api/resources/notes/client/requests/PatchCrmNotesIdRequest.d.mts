import type * as Brevo from "../../../../index.mjs";
/**
 * @example
 *     {
 *         id: "id",
 *         body: {
 *             text: "In communication with client_dev for resolution of queries."
 *         }
 *     }
 */
export interface PatchCrmNotesIdRequest {
    /** Note ID to update */
    id: string;
    body: Brevo.NoteData;
}
