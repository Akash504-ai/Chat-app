"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrevoTimeoutError = exports.BrevoError = exports.BrevoEnvironment = exports.BrevoClient = exports.Brevo = void 0;
exports.Brevo = __importStar(require("./api/index.js"));
var Client_js_1 = require("./Client.js");
Object.defineProperty(exports, "BrevoClient", { enumerable: true, get: function () { return Client_js_1.BrevoClient; } });
var environments_js_1 = require("./environments.js");
Object.defineProperty(exports, "BrevoEnvironment", { enumerable: true, get: function () { return environments_js_1.BrevoEnvironment; } });
var index_js_1 = require("./errors/index.js");
Object.defineProperty(exports, "BrevoError", { enumerable: true, get: function () { return index_js_1.BrevoError; } });
Object.defineProperty(exports, "BrevoTimeoutError", { enumerable: true, get: function () { return index_js_1.BrevoTimeoutError; } });
__exportStar(require("./exports.js"), exports);
