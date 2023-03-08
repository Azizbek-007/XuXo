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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
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
    constructor(ReferalRepository, usersRepository, PaymetsRepository) {
        this.ReferalRepository = ReferalRepository;
        this.usersRepository = usersRepository;
        this.PaymetsRepository = PaymetsRepository;
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
    async findAll(query) {
        var _a, e_1, _b, _c, _d, e_2, _e, _f;
        console.log(query);
        const take = query.take || 10;
        const page = query.page || 1;
        const skip = (page - 1) * take;
        const isActive = query.IsActive;
        let result = await this.usersRepository.find({
            relations: {
                referals: true
            },
            where: { isActive },
            order: { id: "DESC" },
            take: take,
            skip: skip
        });
        let payload = [];
        try {
            for (var _g = true, result_1 = __asyncValues(result), result_1_1; result_1_1 = await result_1.next(), _a = result_1_1.done, !_a;) {
                _c = result_1_1.value;
                _g = false;
                try {
                    const num = _c;
                    let r_data = num['referals'];
                    if (r_data.length > 0) {
                        let id = r_data[0]['id'];
                        let data = await this.ReferalRepository.findOne({
                            relations: {
                                referal_1: true,
                                referal_2: true
                            },
                            where: { id }
                        });
                        console.log(data);
                        const arr = [
                            'password', 'balance', 'passport_number', 'phone_number', 'pinfl', 'card_number', 'expiration_date', 'tree',
                            'status', 'created_at', 'referals', 'customerId', 'referal1_id', 'referal2_id'
                        ];
                        try {
                            for (var _h = true, arr_1 = (e_2 = void 0, __asyncValues(arr)), arr_1_1; arr_1_1 = await arr_1.next(), _d = arr_1_1.done, !_d;) {
                                _f = arr_1_1.value;
                                _h = false;
                                try {
                                    const n = _f;
                                    const r_1 = data['referal_1'], r_2 = data['referal_2'];
                                    if (r_1 != null) {
                                        delete r_1[n];
                                    }
                                    if (r_2 != null) {
                                        delete r_2[n];
                                    }
                                }
                                finally {
                                    _h = true;
                                }
                            }
                        }
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (!_h && !_d && (_e = arr_1.return)) await _e.call(arr_1);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                        num.referals = [data];
                    }
                    payload.push(num);
                }
                finally {
                    _g = true;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (!_g && !_a && (_b = result_1.return)) await _b.call(result_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        let total = await this.usersRepository.count({ where: { isActive } });
        result.filter(e => delete e.password);
        (0, payloadRes_1.ApiRes)('Found', common_1.HttpStatus.OK, { data: payload, count: total });
    }
    async IsActiveProtcess(query) {
        const { id, active } = query;
        if (+active == 0 || +active == 1) {
            const user = await this.usersRepository.findOneBy({ id });
            if (!user)
                (0, payloadRes_1.ApiRes)('Not Found User', common_1.HttpStatus.NOT_FOUND);
            await this.usersRepository.update(user.id, {
                isActive: active
            });
            (0, payloadRes_1.ApiRes)('Successfuly updated', common_1.HttpStatus.OK);
        }
        else {
            (0, payloadRes_1.ApiRes)('enum values: 1, 0', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async PaymetOrder(query) {
        const take = query.take || 10;
        const skip = query.page || 0;
        const [result, total] = await this.PaymetsRepository.findAndCount({
            relations: ['customer'],
            where: { customerId: query.customer_id, status: query.status },
            take,
            skip
        });
        if (total == 0)
            (0, payloadRes_1.ApiRes)('Orders not found', common_1.HttpStatus.NOT_FOUND);
        (0, payloadRes_1.ApiRes)('Found', common_1.HttpStatus.OK, { data: result, count: total });
    }
    async SetPaymetStatus(dto) {
        const customer_ = await this.usersRepository.findOneBy({ id: dto['customer'] });
        const order_ = await this.PaymetsRepository.findOneBy({ id: dto['order_id'] });
        if (!customer_ || !order_) {
            (0, payloadRes_1.ApiRes)('Customer or Order Not Found', common_1.HttpStatus.NOT_FOUND);
        }
        await this.PaymetsRepository.update(order_.id, {
            status: dto['status']
        });
        (0, payloadRes_1.ApiRes)('Successfuly', common_1.HttpStatus.OK);
    }
    async AllUsers() {
        var _a, e_3, _b, _c;
        const find_user = await this.usersRepository.find({
            select: ['id', 'first_name', 'last_name']
        });
        let payload = [];
        try {
            for (var _d = true, find_user_1 = __asyncValues(find_user), find_user_1_1; find_user_1_1 = await find_user_1.next(), _a = find_user_1_1.done, !_a;) {
                _c = find_user_1_1.value;
                _d = false;
                try {
                    const iterator = _c;
                    const user_id = iterator['id'];
                    const find_in_referal = await this.ReferalRepository.findOneBy([
                        {
                            referal1_id: user_id
                        },
                        {
                            referal2_id: user_id
                        }
                    ]);
                    if (find_in_referal) {
                        payload.push(iterator);
                    }
                }
                finally {
                    _d = true;
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (!_d && !_a && (_b = find_user_1.return)) await _b.call(find_user_1);
            }
            finally { if (e_3) throw e_3.error; }
        }
        if (payload.length == 0) {
            (0, payloadRes_1.ApiRes)("Not Found Users", common_1.HttpStatus.NOT_FOUND);
        }
        (0, payloadRes_1.ApiRes)('Successfuly', common_1.HttpStatus.OK, payload);
    }
};
AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(typeorm_2.Referals)),
    __param(1, (0, typeorm_1.InjectRepository)(typeorm_2.Users)),
    __param(2, (0, typeorm_1.InjectRepository)(typeorm_2.Paymets)),
    __metadata("design:paramtypes", [typeorm_3.Repository,
        typeorm_3.Repository,
        typeorm_3.Repository])
], AdminService);
exports.AdminService = AdminService;
//# sourceMappingURL=admin.service.js.map