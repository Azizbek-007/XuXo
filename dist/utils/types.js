"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymetRole = exports.isActive = exports.Role = exports.gender = exports.UserStatus = void 0;
var UserStatus;
(function (UserStatus) {
    UserStatus["level_1"] = "agent";
    UserStatus["level_2"] = "motivator";
    UserStatus["level_3"] = "manager";
})(UserStatus = exports.UserStatus || (exports.UserStatus = {}));
var gender;
(function (gender) {
    gender["Male"] = "Male";
    gender["Female"] = "Female";
})(gender = exports.gender || (exports.gender = {}));
var Role;
(function (Role) {
    Role["User"] = "User";
    Role["Admin"] = "Admin";
})(Role = exports.Role || (exports.Role = {}));
var isActive;
(function (isActive) {
    isActive[isActive["Active"] = 1] = "Active";
    isActive[isActive["NotActive"] = 0] = "NotActive";
})(isActive = exports.isActive || (exports.isActive = {}));
var PaymetRole;
(function (PaymetRole) {
    PaymetRole["Waiting"] = "Waiting";
    PaymetRole["Paid"] = "Paid";
    PaymetRole["Canceled"] = "Canceled";
})(PaymetRole = exports.PaymetRole || (exports.PaymetRole = {}));
//# sourceMappingURL=types.js.map