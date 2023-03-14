import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { ApiRes } from 'src/utils/payloadRes';
import { Paymets, Referals, Users } from 'src/utils/typeorm';
import { isActive, PaymetRole, UserStatus } from 'src/utils/types';
import { Any, Repository } from 'typeorm';
import { CreateReferalDto } from './dto/create-referal.dto';
import { isActiveDto, QueryDto } from './dto/query.dto';
import PaymetStatusDto from './dto/setPaymetStatus.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Injectable()
export class AdminService {
  public c=0;

  constructor(
    @InjectRepository(Referals) 
    private ReferalRepository: Repository<Referals>,
    @InjectRepository(Users) 
    private usersRepository: Repository<Users>,
    @InjectRepository(Paymets) 
    private PaymetsRepository: Repository<Paymets>
  ){}


  async recursiv_binary_count (user: Users['id'], number){
    let c =0;
    // referal data
    let ref_data = await this.ReferalRepository.findOneBy({ customerId: user })

    const ref_1 = ref_data?.referal1_id || null; 
    const ref_2 = ref_data?.referal2_id || null;

    if (ref_1) { 
      number --, this.c++ 
      await this.recursiv_binary_count(ref_1, number)    
    }
    if (ref_2) {
      number --, this.c++ 
      await this.recursiv_binary_count(ref_2, number)
    }
    
  } 

  async add_balance (user: Users['id']) {
    const user_data = await this.usersRepository.findOneBy({ id: user }); 
    if(user_data.status == UserStatus.level_3) return;

    await this.recursiv_binary_count(user, 33);
    console.log("binary count ",this.c)
    console.log(user_data.status)
    if (user_data.status == null && (this.c >= 6)) { 
      // add balaance 250,000
      console.log('added summa')
      await this.usersRepository.update(user_data.id, {
        balance: user_data.balance + 250000,
        status: UserStatus.level_1
      }); 
    } else if (user_data.status == UserStatus.level_1 && (this.c > 30)){
      // add balaance 600,000
      await this.usersRepository.update(user_data.id, {
        balance: user_data.balance + 600000,
        status: UserStatus.level_2
      }); 
    } else if (user_data.status == UserStatus.level_2 && this.c > 62){
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
   
    const ref_cheking = await this.ReferalRepository.findOneBy([
      { referal1_id: dto['referal'] },
      { referal2_id: dto['referal'] }
    ]);

    if(ref_cheking != null) {
      ApiRes('Found this referal', HttpStatus.BAD_REQUEST)
    }

    if(cheking == null) {
      console.log('created')
      const new_user = this.ReferalRepository.create({ 
            customerId: dto.customerId,    
            referal1_id: dto.referal 
          });
      await new_user.save();
      
      ApiRes('OK', HttpStatus.OK);    
    } 
    if (cheking !== null && cheking.referal2_id == null){
      if(cheking.referal1_id == dto.referal){
        ApiRes('Found this referal', HttpStatus.BAD_REQUEST)
      }

      await this.ReferalRepository.update(cheking.id, { 
        referal2_id: dto.referal  
      });


      ApiRes('OK', HttpStatus.OK) 
    }

    if(cheking.referal1_id != null && cheking.referal2_id != null){
      ApiRes('Limited', HttpStatus.BAD_REQUEST)
    }  
  } 
 
  async findAll(query: QueryDto) {
    console.log(query)
    const take = query.take || 10
    const page=query.page || 1;
    const skip= (page-1) * take ;

    const isActive = query.IsActive;
    
    let result = await this.usersRepository.find({
      relations: {
        referals: {
          referal_1: true,
          referal_2: true
        }
      },
      where: { isActive },
      order: { id: "DESC" },
      select: {
        
      },
      take: take,
      skip: skip
    });

    for await (const iterator of result) {
      await this.add_balance(iterator['id']);
    }

    let total = await this.usersRepository.count({ where: { isActive } });
    ApiRes('Found', HttpStatus.OK, {data: result, count: total})
  }

  async IsActiveProtcess (query: isActiveDto) {
    const { id, active } = query;

    if (+active == 0 || +active == 1){
      const user = await this.usersRepository.findOneBy({ id });
      if(!user) ApiRes('Not Found User', HttpStatus.NOT_FOUND);
  
      await this.usersRepository.update(user.id, {
        isActive: active
      });
      ApiRes('Successfuly updated', HttpStatus.OK);
    }else {
      ApiRes('enum values: 1, 0', HttpStatus.BAD_REQUEST);
    }
  }

  async BinaryCount(user: Users['id']) {
    let u_count = 0;
    await this.recursiv_binary_count(user, 33);
    u_count += this.c;
    this.c = 0
    return { count: u_count};
  }

  async PaymetOrder(query: { take: number, page: number, customer_id: number, status: PaymetRole}) {
    const take = query.take || 10;
    const skip = query.page || 0;
    const [result, total] = await this.PaymetsRepository.findAndCount(
        {
          relations: ['customer'],
          where: { customerId: query.customer_id, status: query.status },
          take,
          skip
        }
    );
    if (total == 0) ApiRes('Orders not found', HttpStatus.NOT_FOUND);
    ApiRes('Found', HttpStatus.OK, {data: result, count: total});
  }

  async SetPaymetStatus(dto: PaymetStatusDto) {
    const customer_ = await this.usersRepository.findOneBy({ id: dto['customer'] });
    const order_ = await this.PaymetsRepository.findOneBy({ id: dto['order_id'] });
    if(!customer_ || !order_){
      ApiRes('Customer or Order Not Found', HttpStatus.NOT_FOUND);
    }
    await this.PaymetsRepository.update(order_.id, {
      status: dto['status']
    });
    ApiRes('Successfuly', HttpStatus.OK);
  }

  async AllUsers () {
    const find_user = await this.usersRepository.find({
      where: { isActive: 1 },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        isActive: true,
        balance: true,
      }
    });
    let payload = [];
    for await (const iterator of find_user) {
      const user_id = iterator['id'];
      console.log(user_id)
      let data = await this.ReferalRepository.findOne({
        where: [
          { referal1_id: user_id },
          { referal2_id: user_id }
        ]
      });

      if(data == null){ 
        payload.push(find_user);
      }
    }

    if(payload.length == 0) {
      ApiRes("Not Found Users", HttpStatus.NOT_FOUND);
    }
    ApiRes('Successfuly', HttpStatus.OK, ...payload);   
  }
}
