/**
 * @example
 *     {
 *         event: "invalid_parameter",
 *         notifyURL: "https://brevo.com",
 *         type: "transactional"
 *     }
 */
export interface ExportWebhooksHistoryRequest {
    /**
     * Number of days in the past including today (positive
     * integer). _Not compatible with 'startDate' and 'endDate'_
     */
    days?: number;
    /** Filter the history for a specific email */
    email?: string;
    /**
     * Mandatory if startDate is used. Ending date of the report
     * (YYYY-MM-DD). Must be greater than equal to startDate
     */
    endDate?: string;
    /** Filter the history for a specific event type */
    event: ExportWebhooksHistoryRequest.Event;
    /**
     * Filter the history for a specific message id. Applicable
     * only for transactional webhooks.
     */
    messageId?: number;
    /** Webhook URL to receive CSV file link */
    notifyURL: string;
    /** Sorting order of records (asc or desc) */
    sort?: string;
    /**
     * Mandatory if endDate is used. Starting date of the history
     * (YYYY-MM-DD). Must be lower than equal to endDate
     */
    startDate?: string;
    /** Filter the history based on webhook type */
    type: ExportWebhooksHistoryRequest.Type;
    /** Filter the history for a specific webhook id */
    webhookId?: number;
}
export declare namespace ExportWebhooksHistoryRequest {
    /** Filter the history for a specific event type */
    const Event: {
        readonly InvalidParameter: "invalid_parameter";
        readonly MissingParameter: "missing_parameter";
        readonly HardBounce: "hardBounce";
        readonly SoftBounce: "softBounce";
        readonly Delivered: "delivered";
        readonly Spam: "spam";
        readonly Request: "request";
        readonly Opened: "opened";
        readonly Click: "click";
        readonly Invalid: "invalid";
        readonly Deferred: "deferred";
        readonly Blocked: "blocked";
        readonly Unsubscribed: "unsubscribed";
        readonly Error: "error";
        readonly UniqueOpened: "uniqueOpened";
        readonly LoadedByProxy: "loadedByProxy";
        readonly AllEvents: "allEvents";
    };
    type Event = (typeof Event)[keyof typeof Event];
    /** Filter the history based on webhook type */
    const Type: {
        readonly Transactional: "transactional";
        readonly Marketing: "marketing";
    };
    type Type = (typeof Type)[keyof typeof Type];
}
