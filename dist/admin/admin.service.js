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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const payloadRes_1 = require("../utils/payloadRes");
const typeorm_2 = require("../utils/typeorm");
const types_1 = require("../utils/types");
const typeorm_3 = require("typeorm");
let AdminService = class AdminService {
    constructor(ReferalRepository, usersRepository) {
        this.ReferalRepository = ReferalRepository;
        this.usersRepository = usersRepository;
        this.c = 0;
    }
    async recursiv_binary_count(user, number) {
        let ref_data = await this.ReferalRepository.findOneBy({ customerId: user });
        const ref_1 = (ref_data === null || ref_data === void 0 ? void 0 : ref_data.referal1_id) || null;
        const ref_2 = (ref_data === null || ref_data === void 0 ? void 0 : ref_data.referal2_id) || null;
        if (ref_1) {
            console.log("ref1 ", ref_1);
            number--, this.c++;
            await this.recursiv_binary_count(ref_1, number);
        }
        if (ref_2) {
            console.log("ref1 ", ref_1);
            number--, this.c++;
            await this.recursiv_binary_count(ref_2, number);
        }
    }
    async add_balance(user) {
        const user_data = await this.usersRepository.findOneBy({ id: user });
        if (user_data.status == types_1.UserStatus.level_3)
            return;
        await this.recursiv_binary_count(user, 33);
        console.log("count ", this.c);
        if (user_data.status == null && (this.c >= 6 && this.c <= 24)) {
            await this.usersRepository.update(user_data.id, {
                balance: user_data.balance + 250000,
                status: types_1.UserStatus.level_1
            });
        }
        else if (user_data.status == types_1.UserStatus.level_1 && (this.c > 24 && this.c <= 32)) {
            await this.usersRepository.update(user_data.id, {
                balance: user_data.balance + 600000,
                status: types_1.UserStatus.level_2
            });
        }
        else if (user_data.status == types_1.UserStatus.level_2 && this.c > 32) {
            await this.usersRepository.update(user_data.id, {
                balance: user_data.balance + 1000000,
                status: types_1.UserStatus.level_3
            });
        }
        this.c = 0;
    }
    async createReferal(dto) {
        let cheking = await this.ReferalRepository.findOne({
            where: { 'customerId': dto.customerId }
        });
        console.log(cheking);
        if (cheking == null) {
            console.log('created');
            const new_user = this.ReferalRepository.create({
                customerId: dto.customerId,
                referal1_id: dto.referal
            });
            await new_user.save();
            await this.add_balance(dto.customerId);
            (0, payloadRes_1.ApiRes)('OK', common_1.HttpStatus.OK);
        }
        if (cheking !== null && cheking.referal2_id == null) {
            if (cheking.referal1_id == dto.referal) {
                (0, payloadRes_1.ApiRes)('Found this referal', common_1.HttpStatus.BAD_REQUEST);
            }
            console.log('updated');
            await this.ReferalRepository.update(cheking.id, {
                referal2_id: dto.referal
            });
            await this.add_balance(dto.customerId);
            (0, payloadRes_1.ApiRes)('OK', common_1.HttpStatus.OK);
        }
        if (cheking.referal1_id != null && cheking.referal2_id != null) {
            (0, payloadRes_1.ApiRes)('Limited', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async findAll() {
        return await this.ReferalRepository.find({
            relations: {
                customer: true,
                referal_1: true,
                referal_2: true
            },
            select: {
                customer: {
                    id: true,
                    first_name: true,
                    last_name: true
                },
                referal_1: {
                    id: true,
                    first_name: true,
                    last_name: true
                },
                referal_2: {
                    id: true,
                    first_name: true,
                    last_name: true
                }
            }
        });
    }
    findOne(id) {
        return `This action returns a #${id} admin`;
    }
    update(id, updateAdminDto) {
        return `This action updates a #${id} admin`;
    }
    remove(id) {
        return `This action removes a #${id} admin`;
    }
};
AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(typeorm_2.Referals)),
    __param(1, (0, typeorm_1.InjectRepository)(typeorm_2.Users)),
    __metadata("design:paramtypes", [typeorm_3.Repository,
        typeorm_3.Repository])
], AdminService);
exports.AdminService = AdminService;
//# sourceMappingURL=admin.service.js.map