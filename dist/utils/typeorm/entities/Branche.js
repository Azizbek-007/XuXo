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
exports.Branches = void 0;
const typeorm_1 = require("typeorm");
const Company_1 = require("./Company");
const Employee_1 = require("./Employee");
let Branches = class Branches extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Branches.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('enum', {
        enum: [0, 1]
    }),
    __metadata("design:type", Number)
], Branches.prototype, "is_recalculation_on", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Branches.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Branches.prototype, "logo", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => Employee_1.default, (employee) => employee.branches, { createForeignKeyConstraints: false }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Employee_1.default)
], Branches.prototype, "employee", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Company_1.Company),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Company_1.Company)
], Branches.prototype, "company", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Branches.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ select: false }),
    __metadata("design:type", Date)
], Branches.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ select: false }),
    __metadata("design:type", Date)
], Branches.prototype, "deleted_at", void 0);
Branches = __decorate([
    (0, typeorm_1.Entity)('branche')
], Branches);
exports.Branches = Branches;
//# sourceMappingURL=Branche.js.map