"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const memory_cache_1 = __importDefault(require("memory-cache"));
// cache service for get requests
const longMaxAge = 31536000;
exports.cache = (duration) => {
    return (req, res, next) => {
        const key = "__express__" + req.originalUrl || req.url;
        const cachedBody = memory_cache_1.default.get(key);
        if (cachedBody) {
            res.send(cachedBody);
            return;
        }
        else {
            res.sendResponse = res.send;
            res.send = (body) => {
                memory_cache_1.default.put(key, body, duration * longMaxAge);
                res.sendResponse(body);
            };
            next();
        }
    };
};
//# sourceMappingURL=cache.service.js.map