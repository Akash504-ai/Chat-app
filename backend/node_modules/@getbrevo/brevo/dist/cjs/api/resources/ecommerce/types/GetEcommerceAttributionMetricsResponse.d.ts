import type * as Brevo from "../../../index.js";
export interface GetEcommerceAttributionMetricsResponse {
    /** List of conversion attribution metrics */
    results: Brevo.ConversionSourceMetrics[];
    /** Attribution list aggregated totals */
    totals: GetEcommerceAttributionMetricsResponse.Totals;
}
export declare namespace GetEcommerceAttributionMetricsResponse {
    /**
     * Attribution list aggregated totals
     */
    interface Totals {
        averageBasket: number;
        ordersCount: number;
        revenue: number;
    }
}
