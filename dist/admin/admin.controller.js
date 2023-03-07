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
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/utils/jwt/jwt-auth.guard");
const roles_decorator_1 = require("../auth/utils/role/roles.decorator");
const roles_guard_1 = require("../auth/utils/role/roles.guard");
const types_1 = require("../utils/types");
const admin_service_1 = require("./admin.service");
const create_referal_dto_1 = require("./dto/create-referal.dto");
const query_dto_1 = require("./dto/query.dto");
const setPaymetStatus_dto_1 = require("./dto/setPaymetStatus.dto");
let AdminController = class AdminController {
    constructor(adminService) {
        this.adminService = adminService;
    }
    allReferal(query) {
        return this.adminService.findAll(query);
    }
    allUsers(query) {
        return query;
    }
    createReferal(dto) {
        return this.adminService.createReferal(dto);
    }
    IsActive(query) {
        return this.adminService.IsActiveProtcess(query);
    }
    async PaymetOrder(query) {
        return this.adminService.PaymetOrder(query);
    }
    SetPaymetStatus(body) {
        return this.adminService.SetPaymetStatus(body);
    }
};
__decorate([
    (0, common_1.Get)('users'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_dto_1.QueryDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "allReferal", null);
__decorate([
    (0, common_1.Get)('users/all'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "allUsers", null);
__decorate([
    (0, common_1.Post)('referal'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_referal_dto_1.CreateReferalDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "createReferal", null);
__decorate([
    (0, common_1.Patch)('user/active'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_dto_1.isActiveDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "IsActive", null);
__decorate([
    (0, common_1.Get)('paymet/orders'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "PaymetOrder", null);
__decorate([
    (0, common_1.Patch)('paymet/status'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [setPaymetStatus_dto_1.default]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "SetPaymetStatus", null);
AdminController = __decorate([
    (0, roles_decorator_1.Roles)(types_1.Role.Admin),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('admin'),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], AdminController);
exports.AdminController = AdminController;
//# sourceMappingURL=admin.controller.js.map