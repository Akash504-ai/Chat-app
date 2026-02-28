import type * as Brevo from "../index.js";
export interface GetContacts {
    contacts: Brevo.GetContactDetails[];
    /** Number of contacts */
    count: number;
}
