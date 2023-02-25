"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiRes = void 0;
const common_1 = require("@nestjs/common");
function ApiRes(message, status, payload) {
    const option = { message, payload };
    throw new common_1.HttpException(option, status);
}
exports.ApiRes = ApiRes;
//# sourceMappingURL=payloadRes.js.map