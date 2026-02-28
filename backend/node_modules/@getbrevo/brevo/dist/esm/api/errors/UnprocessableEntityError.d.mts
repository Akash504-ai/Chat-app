import type * as core from "../../core/index.mjs";
import * as errors from "../../errors/index.mjs";
import type * as Brevo from "../index.mjs";
export declare class UnprocessableEntityError extends errors.BrevoError {
    constructor(body: Brevo.ErrorModel, rawResponse?: core.RawResponse);
}
