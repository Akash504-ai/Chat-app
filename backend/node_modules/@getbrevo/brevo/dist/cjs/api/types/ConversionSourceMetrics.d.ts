export interface ConversionSourceMetrics {
    averageBasket: number;
    conversionSource: ConversionSourceMetrics.ConversionSource;
    id: number;
    ordersCount: number;
    revenue: number;
}
export declare namespace ConversionSourceMetrics {
    const ConversionSource: {
        readonly EmailCampaign: "email_campaign";
        readonly SmsCampaign: "sms_campaign";
        readonly AutomationWorkflowEmail: "automation_workflow_email";
        readonly AutomationWorkflowSms: "automation_workflow_sms";
    };
    type ConversionSource = (typeof ConversionSource)[keyof typeof ConversionSource];
}
