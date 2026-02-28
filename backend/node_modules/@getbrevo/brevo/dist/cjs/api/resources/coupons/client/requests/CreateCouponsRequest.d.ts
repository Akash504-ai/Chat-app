/**
 * @example
 *     {
 *         collectionId: "23befbae-1505-47a8-bd27-e30ef739f32c",
 *         coupons: ["Uf12AF"]
 *     }
 */
export interface CreateCouponsRequest {
    /** The id of the coupon collection for which the coupons will be created */
    collectionId: string;
    coupons: string[];
}
