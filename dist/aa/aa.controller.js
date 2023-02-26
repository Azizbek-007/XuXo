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
exports.AaController = void 0;
const common_1 = require("@nestjs/common");
const aa_service_1 = require("./aa.service");
const create_aa_dto_1 = require("./dto/create-aa.dto");
const update_aa_dto_1 = require("./dto/update-aa.dto");
let AaController = class AaController {
    constructor(aaService) {
        this.aaService = aaService;
    }
    create(createAaDto) {
        return this.aaService.create(createAaDto);
    }
    findAll() {
        return this.aaService.findAll();
    }
    findOne(id) {
        return this.aaService.findOne(+id);
    }
    update(id, updateAaDto) {
        return this.aaService.update(+id, updateAaDto);
    }
    remove(id) {
        return this.aaService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_aa_dto_1.CreateAaDto]),
    __metadata("design:returntype", void 0)
], AaController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AaController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AaController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_aa_dto_1.UpdateAaDto]),
    __metadata("design:returntype", void 0)
], AaController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AaController.prototype, "remove", null);
AaController = __decorate([
    (0, common_1.Controller)('aa'),
    __metadata("design:paramtypes", [aa_service_1.AaService])
], AaController);
exports.AaController = AaController;
//# sourceMappingURL=aa.controller.js.map