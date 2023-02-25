import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { ApiRes } from 'src/utils/payloadRes';
import { Referals, Users } from 'src/utils/typeorm';
import { UserStatus } from 'src/utils/types';
import { Repository } from 'typeorm';
import { CreateReferalDto } from './dto/create-referal.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Injectable()
export class AdminService {
  public c=0;
  constructor(
    @InjectRepository(Referals) 
    private ReferalRepository: Repository<Referals>,
    @InjectRepository(Users) 
    private usersRepository: Repository<Users>,
  ){}


  async recursiv_binary_count (user: Users['id'], number){
    
    // referal data
    let ref_data = await this.ReferalRepository.findOneBy({ customerId: user })

    const ref_1 = ref_data?.referal1_id || null; 
    const ref_2 = ref_data?.referal2_id || null;

    if (ref_1) { 
      console.log("ref1 ", ref_1)
      number --, this.c++ 
      await this.recursiv_binary_count(ref_1, number)    
    }
    if (ref_2) {
      console.log("ref1 ", ref_1)
      number --, this.c++ 
      await this.recursiv_binary_count(ref_2, number)
    }
    
  } 

  async add_balance (user: Users['id']) {
    const user_data = await this.usersRepository.findOneBy({ id: user }); 
    if(user_data.status == UserStatus.level_3) return;

    await this.recursiv_binary_count(user, 33);
    console.log("count ",this.c)
    
    if (user_data.status == null && (this.c >= 6 && this.c <= 24)) {
      // add balaance 250,000
      await this.usersRepository.update(user_data.id, {
        balance: user_data.balance + 250000,
        status: UserStatus.level_1
      }); 
    } else if (user_data.status == UserStatus.level_1 && (this.c > 24 && this.c <= 32)){
      // add balaance 600,000
      await this.usersRepository.update(user_data.id, {
        balance: user_data.balance + 600000,
        status: UserStatus.level_2
      }); 
    } else if (user_data.status == UserStatus.level_2 && this.c > 32){
        // add balaance 1,000,000
        await this.usersRepository.update(user_data.id, {
        balance: user_data.balance + 1000000,
        status: UserStatus.level_3
      });
    }

    this.c = 0 
  }
  
  async createReferal(dto: CreateReferalDto) {
    let cheking = await this.ReferalRepository.findOne({ 
      where: { 'customerId': dto.customerId }
    });
    console.log(cheking)

    if(cheking == null) {
      console.log('created')
      const new_user = this.ReferalRepository.create({ 
            customerId: dto.customerId,    
            referal1_id: dto.referal 
          });
      await new_user.save();
      await this.add_balance(dto.customerId);
      ApiRes('OK', HttpStatus.OK);    
    } 
    if (cheking !== null && cheking.referal2_id == null){
      if(cheking.referal1_id == dto.referal){
        ApiRes('Found this referal', HttpStatus.BAD_REQUEST)
      }
      console.log('updated')
      await this.ReferalRepository.update(cheking.id, { 
        referal2_id: dto.referal  
      });
      await this.add_balance(dto.customerId);
      ApiRes('OK', HttpStatus.OK) 
    }

    if(cheking.referal1_id != null && cheking.referal2_id != null){
      ApiRes('Limited', HttpStatus.BAD_REQUEST)
    }  
  } 
 
  async findAll() {
    return await this.ReferalRepository.find({
      relations: {
        customer: true,
        referal_1: true,
        referal_2: true
      },
      select: {
        customer: {
          id: true, 
          first_name: true,
          last_name: true
        },
        referal_1: {
          id: true, 
          first_name: true,
          last_name: true
        },
        referal_2: {
          id: true, 
          first_name: true,
          last_name: true
        }
      }
     })
  }

  findOne(id: number) {
    return `This action returns a #${id} admin`;
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
