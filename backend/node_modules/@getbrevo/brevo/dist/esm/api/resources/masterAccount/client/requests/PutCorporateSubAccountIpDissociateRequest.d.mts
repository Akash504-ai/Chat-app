/**
 * @example
 *     {
 *         ids: [234322, 325553, 893432],
 *         ip: "103.11.32.88"
 *     }
 */
export interface PutCorporateSubAccountIpDissociateRequest {
    /**
     * Pass the list of sub-account Ids to be dissociated from the IP
     * address
     */
    ids: number[];
    /** IP address */
    ip: string;
}
