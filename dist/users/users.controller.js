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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const get_user_decorator_1 = require("../auth/utils/get-user.decorator");
const jwt_auth_guard_1 = require("../auth/utils/jwt/jwt-auth.guard");
const typeorm_1 = require("../utils/typeorm");
const cash_out_dto_1 = require("./dto/cash-out.dto");
const user_update_dto_1 = require("./dto/user-update.dto");
const users_service_1 = require("./users.service");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    myProfile(user) {
        console.log(user);
        return this.usersService.Profile(user['id']);
    }
    myProfileUpdate(dto, user) {
        return this.usersService.ProfileUpdate(user, dto);
    }
    myReferal(user) {
        return this.usersService.Referal(user);
    }
    FindReferal(id) {
        return this.usersService.FinReferal(id);
    }
    CashOut(dto, user) {
        return this.usersService.cashOut(user, dto);
    }
    CashOutOrders(user) {
        return this.usersService.CashOutOrders(user);
    }
};
__decorate([
    (0, common_1.Get)('profile'),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeorm_1.Users]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "myProfile", null);
__decorate([
    (0, common_1.Patch)('profile'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_update_dto_1.default, typeorm_1.Users]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "myProfileUpdate", null);
__decorate([
    (0, common_1.Get)('referal'),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeorm_1.Users]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "myReferal", null);
__decorate([
    (0, common_1.Get)('referal/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "FindReferal", null);
__decorate([
    (0, common_1.Post)('cashout'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cash_out_dto_1.CashOutDto, typeorm_1.Users]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "CashOut", null);
__decorate([
    (0, common_1.Get)('cashout/orders'),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeorm_1.Users]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "CashOutOrders", null);
UsersController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map