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
exports.Paymets = void 0;
const types_1 = require("../../types");
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
let Paymets = class Paymets extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Paymets.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => User_1.Users, { createForeignKeyConstraints: false }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", User_1.Users)
], Paymets.prototype, "customer", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Paymets.prototype, "customerId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Paymets.prototype, "amoute", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: types_1.PaymetRole,
        default: types_1.PaymetRole.Waiting
    }),
    __metadata("design:type", String)
], Paymets.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Paymets.prototype, "created_at", void 0);
Paymets = __decorate([
    (0, typeorm_1.Entity)()
], Paymets);
exports.Paymets = Paymets;
//# sourceMappingURL=Paymet.js.map