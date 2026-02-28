/**
 * @example
 *     {
 *         companyName: "Test Sub-account",
 *         email: "test-sub@example.com",
 *         groupIds: ["5f8f8c3b5f56a02d4433b3a7", "5f8f8c3b5f56a02d4433b3a8"],
 *         language: "fr",
 *         timezone: "Europe/Paris"
 *     }
 */
export interface PostCorporateSubAccountRequest {
    /** Set the name of the sub-account company */
    companyName: string;
    /** Email address for the organization */
    email: string;
    /** Set the group(s) for the sub-account */
    groupIds?: string[];
    /** Set the language of the sub-account */
    language?: PostCorporateSubAccountRequest.Language;
    /** Set the timezone of the sub-account */
    timezone?: string;
}
export declare namespace PostCorporateSubAccountRequest {
    /** Set the language of the sub-account */
    const Language: {
        readonly En: "en";
        readonly Fr: "fr";
        readonly It: "it";
        readonly Es: "es";
        readonly Pt: "pt";
        readonly De: "de";
    };
    type Language = (typeof Language)[keyof typeof Language];
}
