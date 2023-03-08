import { Paymets, Referals, Users } from 'src/utils/typeorm';
import { PaymetRole } from 'src/utils/types';
import { Repository } from 'typeorm';
import { CreateReferalDto } from './dto/create-referal.dto';
import { isActiveDto, QueryDto } from './dto/query.dto';
import PaymetStatusDto from './dto/setPaymetStatus.dto';
export declare class AdminService {
    private ReferalRepository;
    private usersRepository;
    private PaymetsRepository;
    c: number;
    constructor(ReferalRepository: Repository<Referals>, usersRepository: Repository<Users>, PaymetsRepository: Repository<Paymets>);
    recursiv_binary_count(user: Users['id'], number: any): Promise<void>;
    add_balance(user: Users['id']): Promise<void>;
    createReferal(dto: CreateReferalDto): Promise<void>;
    findAll(query: QueryDto): Promise<void>;
    IsActiveProtcess(query: isActiveDto): Promise<void>;
    PaymetOrder(query: {
        take: number;
        page: number;
        customer_id: number;
        status: PaymetRole;
    }): Promise<void>;
    SetPaymetStatus(dto: PaymetStatusDto): Promise<void>;
    AllUsers(): Promise<void>;
}
