import type * as Brevo from "../../../../index.mjs";
/**
 * @example
 *     {
 *         conversionSource: "email_campaign",
 *         conversionSourceId: "sale"
 *     }
 */
export interface GetEcommerceAttributionProductsConversionSourceConversionSourceIdRequest {
    /** The Brevo campaign or automation workflow type for which data will be retrieved */
    conversionSource: Brevo.GetEcommerceAttributionProductsConversionSourceConversionSourceIdRequestConversionSource;
    /** The Brevo campaign or automation workflow id for which data will be retrieved */
    conversionSourceId: string;
}
