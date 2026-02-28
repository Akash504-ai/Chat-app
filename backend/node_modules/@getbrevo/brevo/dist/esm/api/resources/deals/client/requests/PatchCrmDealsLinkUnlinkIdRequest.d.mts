/**
 * @example
 *     {
 *         id: "id"
 *     }
 */
export interface PatchCrmDealsLinkUnlinkIdRequest {
    id: string;
    /** Company ids to be linked with deal */
    linkCompanyIds?: string[];
    /** Contact ids for contacts to be linked with deal */
    linkContactIds?: number[];
    /** Company ids to be unlinked from deal */
    unlinkCompanyIds?: string[];
    /** Contact ids for contacts to be unlinked from deal */
    unlinkContactIds?: number[];
}
