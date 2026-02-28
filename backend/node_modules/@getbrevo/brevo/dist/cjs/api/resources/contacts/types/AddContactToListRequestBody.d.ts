export type AddContactToListRequestBody = {
    emails?: string[] | undefined;
} | {
    ids?: number[] | undefined;
} | {
    extIds?: string[] | undefined;
};
