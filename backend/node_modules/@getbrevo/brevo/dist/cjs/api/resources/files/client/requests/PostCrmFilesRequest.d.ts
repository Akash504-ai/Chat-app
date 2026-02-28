import type * as core from "../../../../../core/index.js";
/**
 * @example
 *     {
 *         file: fs.createReadStream("/path/to/your/file")
 *     }
 */
export interface PostCrmFilesRequest {
    companyId?: string;
    contactId?: number;
    dealId?: string;
    /** File data to create a file. */
    file: core.file.Uploadable;
}
