import type * as Brevo from "../index.mjs";
export interface GetContacts {
    contacts: Brevo.GetContactDetails[];
    /** Number of contacts */
    count: number;
}
