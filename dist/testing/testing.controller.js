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
exports.TestingController = void 0;
const common_1 = require("@nestjs/common");
const testing_service_1 = require("./testing.service");
const create_testing_dto_1 = require("./dto/create-testing.dto");
const update_testing_dto_1 = require("./dto/update-testing.dto");
let TestingController = class TestingController {
    constructor(testingService) {
        this.testingService = testingService;
    }
    create(createTestingDto) {
        return this.testingService.create(createTestingDto);
    }
    findAll() {
        return this.testingService.findAll();
    }
    findOne(id) {
        return this.testingService.findOne(+id);
    }
    update(id, updateTestingDto) {
        return this.testingService.update(+id, updateTestingDto);
    }
    remove(id) {
        return this.testingService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_testing_dto_1.CreateTestingDto]),
    __metadata("design:returntype", void 0)
], TestingController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TestingController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TestingController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_testing_dto_1.UpdateTestingDto]),
    __metadata("design:returntype", void 0)
], TestingController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TestingController.prototype, "remove", null);
TestingController = __decorate([
    (0, common_1.Controller)('testing'),
    __metadata("design:paramtypes", [testing_service_1.TestingService])
], TestingController);
exports.TestingController = TestingController;
//# sourceMappingURL=testing.controller.js.map