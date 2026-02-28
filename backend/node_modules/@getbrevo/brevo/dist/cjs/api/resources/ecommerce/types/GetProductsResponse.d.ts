import type * as Brevo from "../../../index.js";
export interface GetProductsResponse {
    /** Number of products */
    count: number;
    products: Brevo.GetProductDetails[];
}
