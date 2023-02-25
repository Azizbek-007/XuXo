"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUUIDV4 = exports.compareHash = exports.hashPassword = void 0;
const bcrypt = require("bcrypt");
const uuid_1 = require("uuid");
async function hashPassword(rawPassword) {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(rawPassword, salt);
}
exports.hashPassword = hashPassword;
async function compareHash(rawPassword, hashedPassword) {
    return bcrypt.compare(rawPassword, hashedPassword);
}
exports.compareHash = compareHash;
const generateUUIDV4 = () => (0, uuid_1.v4)();
exports.generateUUIDV4 = generateUUIDV4;
//# sourceMappingURL=helpers.js.map