import { Referals, Users } from 'src/utils/typeorm';
import { Repository } from 'typeorm';
import { CreateReferalDto } from './dto/create-referal.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
export declare class AdminService {
    private ReferalRepository;
    private usersRepository;
    c: number;
    constructor(ReferalRepository: Repository<Referals>, usersRepository: Repository<Users>);
    recursiv_binary_count(user: Users['id'], number: any): Promise<void>;
    add_balance(user: Users['id']): Promise<void>;
    createReferal(dto: CreateReferalDto): Promise<void>;
    findAll(): Promise<Referals[]>;
    findOne(id: number): string;
    update(id: number, updateAdminDto: UpdateAdminDto): string;
    remove(id: number): string;
}
