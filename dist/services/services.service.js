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
exports.ServicesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const payloadRes_1 = require("../utils/payloadRes");
const typeorm_2 = require("../utils/typeorm");
const typeorm_3 = require("typeorm");
let ServicesService = class ServicesService {
    constructor(ServiceRepository) {
        this.ServiceRepository = ServiceRepository;
    }
    async create(createServiceDto) {
        const new_service = this.ServiceRepository.create(createServiceDto);
        const data = await new_service.save();
        return (0, payloadRes_1.ApiRes)('Successfuly created', common_1.HttpStatus.CREATED, data);
    }
    async findAll() {
        const all_services = await this.ServiceRepository.find();
        if (all_services.length == 0) {
            return (0, payloadRes_1.ApiRes)('Not found services', common_1.HttpStatus.NOT_FOUND);
        }
        return (0, payloadRes_1.ApiRes)('Services', common_1.HttpStatus.OK, all_services);
    }
    async findOne(id) {
        const service = await this.ServiceRepository.findOneBy({ id });
        if (!service) {
            return (0, payloadRes_1.ApiRes)('Not found service', common_1.HttpStatus.NOT_FOUND);
        }
        return (0, payloadRes_1.ApiRes)('Services', common_1.HttpStatus.OK, service);
    }
    async delete(id) {
        const service = await this.ServiceRepository.findOneBy({ id });
        if (!service) {
            return (0, payloadRes_1.ApiRes)('Not found service', common_1.HttpStatus.NOT_FOUND);
        }
        await service.remove();
        return (0, payloadRes_1.ApiRes)('Successfuly deleted', common_1.HttpStatus.OK);
    }
};
ServicesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(typeorm_2.Service)),
    __metadata("design:paramtypes", [typeorm_3.Repository])
], ServicesService);
exports.ServicesService = ServicesService;
//# sourceMappingURL=services.service.js.map