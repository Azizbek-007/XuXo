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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const helpers_1 = require("../utils/helpers");
const payloadRes_1 = require("../utils/payloadRes");
const typeorm_2 = require("../utils/typeorm");
const typeorm_3 = require("typeorm");
let ref_data_arr = [];
let UsersService = class UsersService {
    constructor(usersRepository, ReferalRepository) {
        this.usersRepository = usersRepository;
        this.ReferalRepository = ReferalRepository;
        this.c = 0;
    }
    async createUser(userDetails) {
        const existingUser = await this.usersRepository.findOneBy({ phone_number: userDetails.phone_number });
        if (existingUser)
            throw new common_1.HttpException('User already exists', common_1.HttpStatus.CONFLICT);
        const password = await (0, helpers_1.hashPassword)(userDetails.password);
        const params = Object.assign(Object.assign({}, userDetails), { password });
        const newUser = this.usersRepository.create(params);
        return this.usersRepository.save(newUser);
    }
    async findOne(phone_number) {
        return this.usersRepository.findOneBy({ phone_number });
    }
    async findOneBy(id) {
        return this.usersRepository.findOneBy({ id });
    }
    async Profile(user) {
        const data = await this.usersRepository.findOne({
            where: {
                id: user
            },
            select: [
                'id',
                'first_name',
                'last_name',
                'balance',
                'passport_number',
                'card_number',
                'expiration_date',
                'phone_number',
                'pinfl',
                'status',
                'tree',
                'created_at'
            ]
        });
        (0, payloadRes_1.ApiRes)('Successfuly', common_1.HttpStatus.OK, data);
    }
    async addtion_balance(user, number) {
        let ref_data = await this.ReferalRepository.findOneBy({ customerId: user });
        console.log(ref_data);
        const ref_1 = ref_data === null || ref_data === void 0 ? void 0 : ref_data.referal1_id, ref_2 = ref_data === null || ref_data === void 0 ? void 0 : ref_data.referal2_id;
        console.log(ref_1, ref_2);
        if (!ref_1 && !ref_2) {
            return this.c;
        }
        else {
            if (ref_1) {
                number--, this.c++;
                await this.addtion_balance(ref_1, number);
            }
            if (ref_2) {
                number--, this.c++;
                await this.addtion_balance(ref_2, number);
            }
        }
    }
    async Referal(user) {
        const my_referal = await this.ReferalRepository.find({
            relations: {
                referal_1: true,
                referal_2: true
            },
            where: { customerId: user.id },
            select: {
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
        if (my_referal.length == 0) {
            (0, payloadRes_1.ApiRes)('Not Found referal', common_1.HttpStatus.NOT_FOUND);
        }
        (0, payloadRes_1.ApiRes)('Successfuly', common_1.HttpStatus.OK, my_referal);
    }
    async FinReferal(id) {
        let OneUserRef = await this.ReferalRepository.findOne({
            relations: {
                customer: true,
                referal_1: true,
                referal_2: true
            },
            where: { id },
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
        if (!OneUserRef) {
            (0, payloadRes_1.ApiRes)('Not found binary referal', common_1.HttpStatus.NOT_FOUND);
        }
        (0, payloadRes_1.ApiRes)('Seccesfuly', common_1.HttpStatus.OK, OneUserRef);
    }
    async TreeAdditon(user) {
        let profile = await this.usersRepository.findOneBy({ id: user.id });
        let new_tree;
        if (profile.tree != null) {
            let check_id = [...profile.tree].find((e) => e == 1) || null;
            console.log(check_id);
            if (check_id != null) {
                (0, payloadRes_1.ApiRes)("Exist", common_1.HttpStatus.CONFLICT);
            }
            new_tree = [...profile.tree, 1];
        }
        else {
            new_tree = [1];
        }
        await this.usersRepository.update(profile.id, {
            tree: new_tree
        });
        (0, payloadRes_1.ApiRes)("Successfuly", common_1.HttpStatus.OK);
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(typeorm_2.Users)),
    __param(1, (0, typeorm_1.InjectRepository)(typeorm_2.Referals)),
    __metadata("design:paramtypes", [typeorm_3.Repository,
        typeorm_3.Repository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map