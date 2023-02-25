import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Users } from 'src/utils/typeorm';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(phone_number: string, password: string): Promise<any>;
    login(user: Users): Promise<void>;
}
