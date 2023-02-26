"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestingService = void 0;
const common_1 = require("@nestjs/common");
let TestingService = class TestingService {
    create(createTestingDto) {
        return 'This action adds a new testing';
    }
    findAll() {
        return `This action returns all testing`;
    }
    findOne(id) {
        return `This action returns a #${id} testing`;
    }
    update(id, updateTestingDto) {
        return `This action updates a #${id} testing`;
    }
    remove(id) {
        return `This action removes a #${id} testing`;
    }
};
TestingService = __decorate([
    (0, common_1.Injectable)()
], TestingService);
exports.TestingService = TestingService;
//# sourceMappingURL=testing.service.js.map