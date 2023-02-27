import { Paymets, Referals, Users } from 'src/utils/typeorm';
import { CreateUserDetails } from 'src/utils/types';
import { Repository } from 'typeorm';
import { CashOutDto } from './dto/cash-out.dto';
import UpdateUserDto from './dto/user-update.dto';
export declare class UsersService {
    private usersRepository;
    private ReferalRepository;
    private PaymetsRepository;
    c: number;
    constructor(usersRepository: Repository<Users>, ReferalRepository: Repository<Referals>, PaymetsRepository: Repository<Paymets>);
    createUser(userDetails: CreateUserDetails): Promise<any>;
    findOne(phone_number: string): Promise<Users | undefined>;
    findOneBy(id: number): Promise<Users>;
    Profile(user: Users['id']): Promise<void>;
    Referal(user: Users): Promise<void>;
    FinReferal(id: number): Promise<void>;
    ProfileUpdate(user: Users, dto: UpdateUserDto): Promise<void>;
    cashOut(user: Users, dto: CashOutDto): Promise<void>;
    CashOutOrders(user: Users): Promise<void>;
}
