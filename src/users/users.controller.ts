import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/utils/get-user.decorator';
import { JwtAuthGuard } from 'src/auth/utils/jwt/jwt-auth.guard';
import { Users } from 'src/utils/typeorm';
import { CashOutDto } from './dto/cash-out.dto';
import UpdateUserDto from './dto/user-update.dto';
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

    @Patch('profile')
    myProfileUpdate (@Body() dto: UpdateUserDto, @GetUser() user: Users) {
        return this.usersService.ProfileUpdate(user, dto);
    }

    @Get('referal')
    myReferal (@GetUser() user: Users){
        return this.usersService.Referal(user)
    }

    @Get('referal/:id')
    FindReferal (@Param('id') id: number){
        return this.usersService.FinReferal(id);
    }

    @Post('cashout')
    CashOut(@Body() dto: CashOutDto, @GetUser() user: Users) {
        return this.usersService.cashOut(user, dto);
    }

    @Get('cashout/orders')
    CashOutOrders(@GetUser() user: Users) {
        return this.usersService.CashOutOrders(user);
    }
    
}
