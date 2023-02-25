import { CreateUserDto } from 'src/users/dto/user-create.dto';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    private usersService;
    constructor(authService: AuthService, usersService: UsersService);
    register(userCreate: CreateUserDto): Promise<import("../utils/typeorm").Users>;
    login(req: any): Promise<void>;
    getProfile(req: any): any;
}
