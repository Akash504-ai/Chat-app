import type * as Brevo from "../../../index.js";
export interface GetCategoriesResponse {
    categories: Brevo.GetCategoryDetails[];
    /** Number of categories */
    count: number;
}
