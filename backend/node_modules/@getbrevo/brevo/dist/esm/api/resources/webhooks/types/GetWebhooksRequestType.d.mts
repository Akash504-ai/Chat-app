export declare const GetWebhooksRequestType: {
    readonly Marketing: "marketing";
    readonly Transactional: "transactional";
    readonly Inbound: "inbound";
};
export type GetWebhooksRequestType = (typeof GetWebhooksRequestType)[keyof typeof GetWebhooksRequestType];
