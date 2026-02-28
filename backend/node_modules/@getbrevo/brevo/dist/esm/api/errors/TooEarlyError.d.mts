import type * as core from "../../core/index.mjs";
import * as errors from "../../errors/index.mjs";
import type * as Brevo from "../index.mjs";
export declare class TooEarlyError extends errors.BrevoError {
    constructor(body: Brevo.ContactErrorModel, rawResponse?: core.RawResponse);
}
