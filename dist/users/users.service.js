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
let UsersService = class UsersService {
    constructor(usersRepository, ReferalRepository, PaymetsRepository) {
        this.usersRepository = usersRepository;
        this.ReferalRepository = ReferalRepository;
        this.PaymetsRepository = PaymetsRepository;
        this.c = 0;
    }
    async createUser(userDetails) {
        const existingUser = await this.usersRepository.findOneBy([
            {
                phone_number: userDetails.phone_number
            }, {
                passport_number: userDetails.passport_number
            }
        ]);
        if (existingUser) {
            throw new common_1.HttpException('User already exists', common_1.HttpStatus.CONFLICT);
        }
        const password = await (0, helpers_1.hashPassword)(userDetails.password);
        const params = Object.assign(Object.assign({}, userDetails), { password });
        const newUser = this.usersRepository.create(params);
        let data = await this.usersRepository.save(newUser);
        delete data['password'];
        console.log(data);
        (0, payloadRes_1.ApiRes)('Successfuly', common_1.HttpStatus.OK, data);
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
            where: { customerId: id },
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
    async ProfileUpdate(user, dto) {
        const find_user = await this.usersRepository.findOneBy({ id: user['id'] });
        await this.usersRepository.update(find_user['id'], dto);
        (0, payloadRes_1.ApiRes)("Updated", common_1.HttpStatus.OK);
    }
    async cashOut(user, dto) {
        const find_user = await this.usersRepository.findOneBy({ id: user['id'] });
        if (find_user['card_number'] && find_user['expiration_date']) {
            if (find_user['balance'] >= dto['amoute']) {
                const new_paymet_trans = this.PaymetsRepository.create({
                    customer: find_user,
                    amoute: dto['amoute']
                });
                const data = await new_paymet_trans.save();
                const balance = Number(find_user['balance']) - Number(dto['amoute']);
                await this.usersRepository.update(find_user['id'], { balance });
                data.customer.balance = balance;
                (0, payloadRes_1.ApiRes)('Craeted order for money withdrawal', common_1.HttpStatus.OK, data);
            }
            else {
                (0, payloadRes_1.ApiRes)('You don\'t have enough funds to make a withdrawal', common_1.HttpStatus.BAD_REQUEST);
            }
        }
        else {
            (0, payloadRes_1.ApiRes)('Not Found card number and expiration date', common_1.HttpStatus.NOT_FOUND);
        }
    }
    async CashOutOrders(user) {
        const MyOrders = await this.PaymetsRepository.findBy({ customerId: user['id'] });
        if (MyOrders.length == 0)
            (0, payloadRes_1.ApiRes)("Not found orders", common_1.HttpStatus.NOT_FOUND);
        (0, payloadRes_1.ApiRes)('Found Orders', common_1.HttpStatus.OK, MyOrders);
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(typeorm_2.Users)),
    __param(1, (0, typeorm_1.InjectRepository)(typeorm_2.Referals)),
    __param(2, (0, typeorm_1.InjectRepository)(typeorm_2.Paymets)),
    __metadata("design:paramtypes", [typeorm_3.Repository,
        typeorm_3.Repository,
        typeorm_3.Repository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map