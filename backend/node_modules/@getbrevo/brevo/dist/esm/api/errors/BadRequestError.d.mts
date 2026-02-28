import type * as core from "../../core/index.mjs";
import * as errors from "../../errors/index.mjs";
export declare class BadRequestError extends errors.BrevoError {
    constructor(body?: unknown, rawResponse?: core.RawResponse);
}
