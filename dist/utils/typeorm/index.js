"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = exports.Referals = exports.Users = void 0;
const Referal_1 = require("./entities/Referal");
Object.defineProperty(exports, "Referals", { enumerable: true, get: function () { return Referal_1.Referals; } });
const Service_1 = require("./entities/Service");
Object.defineProperty(exports, "Service", { enumerable: true, get: function () { return Service_1.Service; } });
const User_1 = require("./entities/User");
Object.defineProperty(exports, "Users", { enumerable: true, get: function () { return User_1.Users; } });
const entities = [
    User_1.Users,
    Referal_1.Referals,
    Service_1.Service
];
exports.default = entities;
//# sourceMappingURL=index.js.map