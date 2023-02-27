import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { compareHash } from 'src/utils/helpers';
import { JwtPayload } from 'src/utils/types';
import { Users } from 'src/utils/typeorm';
import { ApiRes } from 'src/utils/payloadRes';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(phone_number: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(phone_number);
    if (!user)
      throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);
      
    const isPasswordValid = await compareHash(
      password,
      user.password,
    );
    return isPasswordValid ? user : null;
  }

  async login(user: Users) {
    console.log(user)
    const payload: JwtPayload = { phone_number: user.phone_number, id: user.id, role: user['role'] };
    delete user.password;
    const token: string = this.jwtService.sign(payload);

    ApiRes('Succesfuly login', HttpStatus.OK, { token, user });
  }
}