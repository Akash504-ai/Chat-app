export interface GetEcommerceAttributionMetricsConversionSourceConversionSourceIdResponse {
    averageBasket: number;
    conversionSource: GetEcommerceAttributionMetricsConversionSourceConversionSourceIdResponse.ConversionSource;
    id: number;
    ordersCount: number;
    revenue: number;
    newCustomersCount: number;
}
export declare namespace GetEcommerceAttributionMetricsConversionSourceConversionSourceIdResponse {
    const ConversionSource: {
        readonly EmailCampaign: "email_campaign";
        readonly SmsCampaign: "sms_campaign";
        readonly AutomationWorkflowEmail: "automation_workflow_email";
        readonly AutomationWorkflowSms: "automation_workflow_sms";
    };
    type ConversionSource = (typeof ConversionSource)[keyof typeof ConversionSource];
}
