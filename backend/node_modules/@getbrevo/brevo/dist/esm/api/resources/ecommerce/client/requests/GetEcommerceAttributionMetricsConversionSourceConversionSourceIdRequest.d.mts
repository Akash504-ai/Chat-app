import type * as Brevo from "../../../../index.mjs";
/**
 * @example
 *     {
 *         conversionSource: "email_campaign",
 *         conversionSourceId: "sale"
 *     }
 */
export interface GetEcommerceAttributionMetricsConversionSourceConversionSourceIdRequest {
    /** The Brevo campaign type or workflow type for which data will be retrieved */
    conversionSource: Brevo.GetEcommerceAttributionMetricsConversionSourceConversionSourceIdRequestConversionSource;
    /** The Brevo campaign or automation workflow id for which data will be retrieved */
    conversionSourceId: string;
}
