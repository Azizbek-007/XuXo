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
const typeorm_1 = require("typeorm");
const Lead_1 = require("./Lead");
let Leads_Category = class Leads_Category extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Leads_Category.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Leads_Category.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Lead_1.default, (lead) => lead.lead_category, { nullable: false }),
    __metadata("design:type", Lead_1.default)
], Leads_Category.prototype, "lead", void 0);
__decorate([
    (0, typeorm_1.RelationId)((leadCategory) => leadCategory.lead),
    __metadata("design:type", Number)
], Leads_Category.prototype, "leadId", void 0);
Leads_Category = __decorate([
    (0, typeorm_1.Entity)()
], Leads_Category);
exports.default = Leads_Category;
//# sourceMappingURL=LeadCategory.js.map