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
const types_1 = require("../../types");
const typeorm_1 = require("typeorm");
const Employee_1 = require("./Employee");
const LeadCategory_1 = require("./LeadCategory");
let Leads = class Leads extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Leads.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('enum', { enum: types_1.LeadEnum, default: types_1.LeadEnum.Incoming }),
    __metadata("design:type", String)
], Leads.prototype, "lead_type", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Leads.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Leads.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)('enum', { enum: types_1.LeadInvateEnum, nullable: true }),
    __metadata("design:type", String)
], Leads.prototype, "invate", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Leads.prototype, "comment", void 0);
__decorate([
    (0, typeorm_1.Column)('enum', { enum: types_1.gender, nullable: true }),
    __metadata("design:type", String)
], Leads.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Leads.prototype, "date_of_birth", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Employee_1.default, { nullable: false, createForeignKeyConstraints: false }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Employee_1.default)
], Leads.prototype, "author", void 0);
__decorate([
    (0, typeorm_1.Column)({ select: false }),
    __metadata("design:type", Number)
], Leads.prototype, "authorId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((type) => LeadCategory_1.default, (leadCategory) => leadCategory.lead, { nullable: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], Leads.prototype, "lead_category", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Leads.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ select: false }),
    __metadata("design:type", Date)
], Leads.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ select: false }),
    __metadata("design:type", Date)
], Leads.prototype, "deleted_at", void 0);
Leads = __decorate([
    (0, typeorm_1.Entity)()
], Leads);
exports.default = Leads;
//# sourceMappingURL=Lead.js.map