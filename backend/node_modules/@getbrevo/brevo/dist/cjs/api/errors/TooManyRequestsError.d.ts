import type * as core from "../../core/index.js";
import * as errors from "../../errors/index.js";
import type * as Brevo from "../index.js";
export declare class TooManyRequestsError extends errors.BrevoError {
    constructor(body: Brevo.ErrorModel, rawResponse?: core.RawResponse);
}
