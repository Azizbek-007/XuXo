"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const jwt_1 = require("@nestjs/jwt");
const helpers_1 = require("../utils/helpers");
const payloadRes_1 = require("../utils/payloadRes");
let AuthService = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async validateUser(phone_number, password) {
        const user = await this.usersService.findOne(phone_number);
        if (!user)
            throw new common_1.HttpException('Invalid Credentials', common_1.HttpStatus.UNAUTHORIZED);
        const isPasswordValid = await (0, helpers_1.compareHash)(password, user.password);
        return isPasswordValid ? user : null;
    }
    async login(user) {
        const payload = { phone_number: user.phone_number, id: user.id, roles: user.role };
        delete user.password;
        const token = this.jwtService.sign(payload);
        (0, payloadRes_1.ApiRes)('Succesfuly login', common_1.HttpStatus.OK, { token, user });
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map