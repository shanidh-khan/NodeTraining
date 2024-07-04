"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const loggerMiddleware = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
};
exports.default = loggerMiddleware;
//# sourceMappingURL=logger.middleware.js.map