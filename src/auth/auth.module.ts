import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './utils/local/local.strategy';
import { JwtStrategy } from './utils/jwt/jwt.strategy';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../utils/constants';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '24d' },
    }),
  ],
  providers: [
    AuthService, 
    LocalStrategy, 
    JwtStrategy,
  ],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}