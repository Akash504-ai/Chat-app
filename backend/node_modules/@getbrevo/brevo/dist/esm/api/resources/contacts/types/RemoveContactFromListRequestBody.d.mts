export type RemoveContactFromListRequestBody = {
    emails?: string[] | undefined;
} | {
    ids?: number[] | undefined;
} | {
    all?: boolean | undefined;
} | {
    extIds?: string[] | undefined;
};
