import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Query } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateReferalDto } from './dto/create-referal.dto';
import { isActiveDto, QueryDto } from './dto/query.dto';
import PaymetStatusDto from './dto/setPaymetStatus.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('users')
  allReferal(@Query() query: QueryDto): Promise<void>{
    return this.adminService.findAll(query);
  }

  @Post('referal')
  createReferal(@Body() dto: CreateReferalDto): Promise<void> {
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

  @Patch('paymet/status')
  SetPaymetStatus(@Body() body: PaymetStatusDto): Promise<void> {
    return this.adminService.SetPaymetStatus(body);
  }


  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.adminService.remove(+id);
  // }
}
