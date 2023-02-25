import { Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/utils/get-user.decorator';
import { JwtAuthGuard } from 'src/auth/utils/jwt/jwt-auth.guard';
import { Roles } from 'src/auth/utils/role/roles.decorator';
import { RolesGuard } from 'src/auth/utils/role/roles.guard';
import { Users } from 'src/utils/typeorm';
import { Role } from 'src/utils/types';
import { UsersService } from './users.service';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UsersController {
    constructor(
        private readonly usersService: UsersService
    ){}


    @Get('profile')
    myProfile (@GetUser() user: Users) {
        return this.usersService.Profile(user['id'])
    }

    @Get('referal')
    myReferal (@GetUser() user: Users){
        return this.usersService.Referal(user)
    }

    @Get('referal/:id')
    FindReferal (@Param('id') id: number){
        return this.usersService.FinReferal(id);
    }

    @Patch('tree')
    AdditonTreeCount(@GetUser() user: Users){
        return this.usersService.TreeAdditon(user)
    }
}
