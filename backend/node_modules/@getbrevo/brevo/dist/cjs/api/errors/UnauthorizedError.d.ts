import type * as core from "../../core/index.js";
import * as errors from "../../errors/index.js";
export declare class UnauthorizedError extends errors.BrevoError {
    constructor(body?: unknown, rawResponse?: core.RawResponse);
}
