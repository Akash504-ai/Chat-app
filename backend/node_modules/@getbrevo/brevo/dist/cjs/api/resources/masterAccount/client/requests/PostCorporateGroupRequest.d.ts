/**
 * @example
 *     {
 *         groupName: "My group"
 *     }
 */
export interface PostCorporateGroupRequest {
    /** The name of the group of sub-accounts */
    groupName: string;
    /** Pass the list of sub-account Ids to be included in the group */
    subAccountIds?: number[];
}
