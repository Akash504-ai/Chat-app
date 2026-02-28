/**
 * @example
 *     {
 *         folderId: 2,
 *         name: "Magento Customer - ES"
 *     }
 */
export interface CreateListRequest {
    /** Id of the parent folder in which this list is to be created */
    folderId: number;
    /** Name of the list */
    name: string;
}
