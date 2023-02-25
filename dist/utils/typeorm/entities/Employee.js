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
const class_transformer_1 = require("class-transformer");
const types_1 = require("../../types");
const user_role_1 = require("../../user.role");
const typeorm_1 = require("typeorm");
const Branche_1 = require("./Branche");
const Company_1 = require("./Company");
let Employee = class Employee extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Employee.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Employee.prototype, "balance", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((type) => Branche_1.Branches, (branche) => branche.employee, { nullable: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], Employee.prototype, "branches", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "comment", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Company_1.Company, (company) => company.author, { nullable: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Company_1.Company)
], Employee.prototype, "company", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "date_of_birth", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Employee.prototype, "destroyer", void 0);
__decorate([
    (0, typeorm_1.Column)('enum', { enum: types_1.gender }),
    __metadata("design:type", String)
], Employee.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Employee.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Employee.prototype, "number_of_groups", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Employee.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)('enum', { enum: user_role_1.UserRoles }),
    __metadata("design:type", String)
], Employee.prototype, "roles", void 0);
__decorate([
    (0, typeorm_1.Column)({ select: false }),
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", String)
], Employee.prototype, "password", void 0);
Employee = __decorate([
    (0, typeorm_1.Entity)()
], Employee);
exports.default = Employee;
//# sourceMappingURL=Employee.js.map