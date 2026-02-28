import type * as Brevo from "../../../../index.mjs";
/**
 * @example
 *     {
 *         folderId: 1000000,
 *         body: {}
 *     }
 */
export interface UpdateFolderRequest {
    /** Id of the folder */
    folderId: number;
    body: Brevo.CreateUpdateFolder;
}
