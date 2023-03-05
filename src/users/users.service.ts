import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hashPassword } from 'src/utils/helpers';
import { ApiRes } from 'src/utils/payloadRes';
import { Paymets, Referals, Users } from 'src/utils/typeorm';
import { CreateUserDetails } from 'src/utils/types';
import { Repository } from 'typeorm';
import { CashOutDto } from './dto/cash-out.dto';
import UpdateUserDto from './dto/user-update.dto';

// This should be a real class/interface representing a user entity
@Injectable()
export class UsersService {
  public c = 0;
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
    @InjectRepository(Referals) 
    private ReferalRepository: Repository<Referals>,
    @InjectRepository(Paymets) 
    private PaymetsRepository: Repository<Paymets>
  ){}

  async createUser(userDetails: CreateUserDetails) {
    const existingUser = await this.usersRepository.findOneBy([
      { 
        phone_number: userDetails.phone_number
      }, {
        passport_number: userDetails.passport_number
      }
    ])
    if (existingUser){
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }
    const password = await hashPassword(userDetails.password);
    const params = { ...userDetails, password };
    const newUser = this.usersRepository.create(params);
    let data = await this.usersRepository.save(newUser);
    delete data['password'];
    console.log(data)
    ApiRes('Successfuly', HttpStatus.OK, data);
  }

  async findOne(phone_number: string): Promise<Users | undefined> {
    return this.usersRepository.findOneBy({ phone_number })
  }

  async findOneBy(id: number){
    return this.usersRepository.findOneBy({  id })
  }

  async Profile(user: Users['id']){
    const data = await this.usersRepository.findOne({
      where: {
        id: user
      },
      select: [
        'id', 
        'first_name', 
        'last_name',
        'balance', 
        'passport_number', 
        'card_number',
        'expiration_date',
        'phone_number',
        'pinfl',
        'status',
        'tree',
        'created_at'
      ]
    });

    ApiRes('Successfuly', HttpStatus.OK, data);
  }


  async Referal(user: Users){
    const my_referal = await this.ReferalRepository.find({
      relations: {
        referal_1: true, 
        referal_2: true
      },
      where: { customerId: user.id },
      select: {
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
    });
    if(my_referal.length == 0){
      ApiRes('Not Found referal', HttpStatus.NOT_FOUND); 
    }
    ApiRes('Successfuly', HttpStatus.OK, my_referal);
  }

  async FinReferal(id: number) {
    let OneUserRef = await this.ReferalRepository.findOne({
      relations: {
        customer: true,
        referal_1: true, 
        referal_2: true
      },
      where: { id },
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
    });
    
    if(!OneUserRef){
      ApiRes('Not found binary referal', HttpStatus.NOT_FOUND);
    }
    ApiRes('Seccesfuly', HttpStatus.OK, OneUserRef);
  }
  async ProfileUpdate (user: Users, dto: UpdateUserDto) {
    const find_user = await this.usersRepository.findOneBy({ id: user['id'] });
    await this.usersRepository.update(find_user['id'], dto);
    ApiRes("Updated", HttpStatus.OK);
  }
  async cashOut (user: Users, dto: CashOutDto) {
    const find_user = await this.usersRepository.findOneBy({ id: user['id'] }); 
    if (find_user['card_number'] && find_user['expiration_date']) {
      if (find_user['balance'] >= dto['amoute']){
        const new_paymet_trans = this.PaymetsRepository.create({
          customer: find_user,
          amoute: dto['amoute']
        });
        const data = await new_paymet_trans.save();
        const balance = Number(find_user['balance']) - Number(dto['amoute'])
        await this.usersRepository.update(find_user['id'], { balance });
        data.customer.balance = balance;
        ApiRes('Craeted order for money withdrawal', HttpStatus.OK, data);
      }else{
        ApiRes('You don\'t have enough funds to make a withdrawal', HttpStatus.BAD_REQUEST);
      }
    }else{
      ApiRes('Not Found card number and expiration date', HttpStatus.NOT_FOUND);
    }
  }

  async CashOutOrders(user: Users) {
    const MyOrders = await this.PaymetsRepository.findBy({ customerId: user['id'] });
    if(MyOrders.length == 0) ApiRes("Not found orders", HttpStatus.NOT_FOUND);
    ApiRes('Found Orders', HttpStatus.OK, MyOrders);
  }

}