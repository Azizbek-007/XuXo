import { Users } from 'src/utils/typeorm';
import { CashOutDto } from './dto/cash-out.dto';
import UpdateUserDto from './dto/user-update.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    myProfile(user: Users): Promise<void>;
    myProfileUpdate(dto: UpdateUserDto, user: Users): Promise<void>;
    myReferal(user: Users): Promise<void>;
    FindReferal(id: number): Promise<void>;
    CashOut(dto: CashOutDto, user: Users): Promise<void>;
    CashOutOrders(user: Users): Promise<void>;
}
