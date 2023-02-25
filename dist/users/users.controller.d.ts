import { Users } from 'src/utils/typeorm';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    myProfile(user: Users): Promise<void>;
    myReferal(user: Users): Promise<void>;
    FindReferal(id: number): Promise<void>;
    AdditonTreeCount(user: Users): Promise<void>;
}
