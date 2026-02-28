import type * as Brevo from "../../../index.mjs";
export interface GetCategoriesResponse {
    categories: Brevo.GetCategoryDetails[];
    /** Number of categories */
    count: number;
}
