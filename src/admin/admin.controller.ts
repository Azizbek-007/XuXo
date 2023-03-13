import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/utils/jwt/jwt-auth.guard';
import { Roles } from 'src/auth/utils/role/roles.decorator';
import { RolesGuard } from 'src/auth/utils/role/roles.guard';
import { Role } from 'src/utils/types';
import { AdminService } from './admin.service';
import { CreateReferalDto } from './dto/create-referal.dto';
import { isActiveDto, QueryDto } from './dto/query.dto';
import PaymetStatusDto from './dto/setPaymetStatus.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Roles(Role.Admin)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('users')
  allReferal(@Query() query: QueryDto): Promise<void>{
    return this.adminService.findAll(query);
  }

  @Get('users/all')
  allUsers(): Promise<void>{
    return this.adminService.AllUsers();
  }

  @Post('referal')
  createReferal(@Body() dto: CreateReferalDto): Promise<void> {
    console.log('ok')
    return this.adminService.createReferal(dto);
  }

  @Patch('user/active')
  IsActive(@Query() query: isActiveDto): Promise<void> {
    return this.adminService.IsActiveProtcess(query);
  }

  @Get('paymet/orders')
  async PaymetOrder (@Query() query) {
    return this.adminService.PaymetOrder(query);
  }

  @Get('binary/:id')
  async BinaryCount(@Param('id') id: number) {
    return this.adminService.BinaryCount(id);
  }

  @Patch('paymet/status')
  SetPaymetStatus(@Body() body: PaymetStatusDto): Promise<void> {
    return this.adminService.SetPaymetStatus(body);
  }


  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.adminService.remove(+id);
  // }
}
