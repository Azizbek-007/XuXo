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
exports.Referals = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
let Referals = class Referals extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Referals.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.Users, (user) => user.referals),
    __metadata("design:type", User_1.Users)
], Referals.prototype, "customer", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", Number)
], Referals.prototype, "customerId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => User_1.Users, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'referal1_id' }),
    __metadata("design:type", User_1.Users)
], Referals.prototype, "referal_1", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", Number)
], Referals.prototype, "referal1_id", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => User_1.Users, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'referal2_id' }),
    __metadata("design:type", User_1.Users)
], Referals.prototype, "referal_2", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, unique: true }),
    __metadata("design:type", Number)
], Referals.prototype, "referal2_id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Referals.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ select: false }),
    __metadata("design:type", Date)
], Referals.prototype, "deleted_at", void 0);
Referals = __decorate([
    (0, typeorm_1.Entity)()
], Referals);
exports.Referals = Referals;
//# sourceMappingURL=Referal.js.map