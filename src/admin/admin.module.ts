import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Paymets, Referals, Users } from 'src/utils/typeorm';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([ Referals, Users, Paymets ])
  ],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule {}
