export interface NotFoundErrorBody {
    /** Error code displayed in case of a failure */
    code: NotFoundErrorBody.Code;
    /** Readable message associated to the failure */
    message: string;
}
export declare namespace NotFoundErrorBody {
    /** Error code displayed in case of a failure */
    const Code: {
        readonly InvalidParameter: "invalid_parameter";
        readonly MissingParameter: "missing_parameter";
        readonly OutOfRange: "out_of_range";
        readonly CampaignProcessing: "campaign_processing";
        readonly CampaignSent: "campaign_sent";
        readonly DocumentNotFound: "document_not_found";
        readonly NotEnoughCredits: "not_enough_credits";
        readonly PermissionDenied: "permission_denied";
        readonly DuplicateParameter: "duplicate_parameter";
        readonly DuplicateRequest: "duplicate_request";
        readonly MethodNotAllowed: "method_not_allowed";
        readonly Unauthorized: "unauthorized";
        readonly AccountUnderValidation: "account_under_validation";
        readonly NotAcceptable: "not_acceptable";
        readonly BadRequest: "bad_request";
        readonly UnprocessableEntity: "unprocessable_entity";
        readonly DomainDoesNotExist: "Domain does not exist";
        readonly ContactEmailNotFound: "Contact email not found";
        readonly AttributeNotFound: "Attribute not found";
        readonly CategoryIdNotFound: "Category id not found";
        readonly InvalidParametersPassed: "Invalid parameters passed";
        readonly RecordSForIdentifierNotFound: "Record(s) for identifier not found";
        readonly ReturnedWhenQueryParamsAreInvalid: "Returned when query params are invalid";
        readonly ReturnedWhenInvalidDataPosted: "Returned when invalid data posted";
        readonly FeedNotFound: "Feed not found";
        readonly CampaignIdNotFound: "Campaign ID not found";
        readonly ApiKeyNotFound: "api-key not found";
        readonly DmarcPolicyRequiresDomainAuthentication: "DMARC policy requires domain authentication";
        readonly DnsRecordsNotProperlyConfigured: "DNS records not properly configured";
        readonly InvalidOtpCodeProvided: "Invalid OTP code provided";
        readonly OtpCodeHasExpired: "OTP code has expired";
        readonly DomainAlreadyExistsInYourAccount: "Domain already exists in your account";
        readonly TheSumOfAllIpWeightsMustEqual100: "The sum of all IP weights must equal 100";
        readonly AuthenticationFailed: "Authentication failed";
        readonly InsufficientCredits: "Insufficient credits";
        readonly RequestAlreadyProcessed: "Request already processed";
    };
    type Code = (typeof Code)[keyof typeof Code];
}
