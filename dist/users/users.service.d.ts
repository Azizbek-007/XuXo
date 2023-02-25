import { Referals, Users } from 'src/utils/typeorm';
import { CreateUserDetails } from 'src/utils/types';
import { Repository } from 'typeorm';
export declare class UsersService {
    private usersRepository;
    private ReferalRepository;
    c: number;
    constructor(usersRepository: Repository<Users>, ReferalRepository: Repository<Referals>);
    createUser(userDetails: CreateUserDetails): Promise<Users>;
    findOne(phone_number: string): Promise<Users | undefined>;
    findOneBy(id: number): Promise<Users>;
    Profile(user: Users['id']): Promise<void>;
    addtion_balance(user: Users['id'], number: any): Promise<number>;
    Referal(user: Users): Promise<void>;
    FinReferal(id: number): Promise<void>;
    TreeAdditon(user: Users): Promise<void>;
}
