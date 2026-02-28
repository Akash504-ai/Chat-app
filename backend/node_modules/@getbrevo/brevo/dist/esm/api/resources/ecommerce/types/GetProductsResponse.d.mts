import type * as Brevo from "../../../index.mjs";
export interface GetProductsResponse {
    /** Number of products */
    count: number;
    products: Brevo.GetProductDetails[];
}
