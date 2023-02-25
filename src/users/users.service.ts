import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hashPassword } from 'src/utils/helpers';
import { ApiRes } from 'src/utils/payloadRes';
import { Referals, Users } from 'src/utils/typeorm';
import { CreateUserDetails } from 'src/utils/types';
import { Repository } from 'typeorm';

// This should be a real class/interface representing a user entity
let ref_data_arr = []
@Injectable()
export class UsersService {
  public c = 0;
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
    @InjectRepository(Referals) 
    private ReferalRepository: Repository<Referals>
  ){}

  async createUser(userDetails: CreateUserDetails): Promise<Users> {
    const existingUser = await this.usersRepository.findOneBy({ phone_number: userDetails.phone_number })
    if (existingUser)
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    const password = await hashPassword(userDetails.password);
    const params = { ...userDetails, password };
    const newUser = this.usersRepository.create(params);
    return this.usersRepository.save(newUser);
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
  async addtion_balance (user: Users['id'], number){
    
    // referal data
    let ref_data = await this.ReferalRepository.findOneBy({ customerId: user })
    console.log(ref_data)

    const ref_1 = ref_data?.referal1_id, 
    ref_2 = ref_data?.referal2_id;
    console.log(ref_1, ref_2)

    if (!ref_1 && !ref_2) {
      return this.c;
    }else{
      if (ref_1) { 
        number --, this.c++ 
        await this.addtion_balance(ref_1, number)    
      }
      if (ref_2) {
        number --, this.c++ 
        await this.addtion_balance(ref_2, number)
      }
    }
    
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

  async TreeAdditon (user: Users) {
    let profile = await this.usersRepository.findOneBy({ id: user.id });
    let new_tree: any
    if (profile.tree != null) {
      let check_id = [...profile.tree].find((e) => e == 1) || null;
      console.log(check_id)
      if (check_id != null) {
        ApiRes("Exist", HttpStatus.CONFLICT);
      }
      new_tree = [ ...profile.tree, 1 ];
    }else{
      new_tree = [ 1 ];
    }
    await this.usersRepository.update(profile.id, { 
      tree: new_tree
    });

    ApiRes("Successfuly", HttpStatus.OK);
  }

}