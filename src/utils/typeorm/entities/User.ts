import { UserStatus, Role, isActive } from "src/utils/types";
import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Referals } from "./Referal";

@Entity('Users')
export class Users extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column({ select: false })
    password: string;

    @Column({ default: 0 })
    balance: number;

    @Column({ unique: true })
    passport_number: string; 
    
    @Column({ unique: true })
    phone_number: string;

    @Column()
    pinfl: string;

    @Column({ nullable: true })
    card_number: string;

    @Column({ nullable: true }) 
    expiration_date: string; 

    @Column('simple-array', { nullable: true})
    tree: Number[];

    @Column('enum', { enum: UserStatus, default:  UserStatus.level_1 })
    status: UserStatus; 

    @Column({
        type: 'enum',
        enum: Role,
        default: Role.User
      })
    role: Role;

    @Column({
      type: 'enum',
      enum: isActive,
      default: isActive.NotActive
    })
    isActive: isActive;

    @OneToMany(() => Referals, (referal) => referal.customer, { eager: true})
    referals: Referals[]

    @CreateDateColumn() 
    created_at: Date;

    @DeleteDateColumn({ select: false })
    deleted_at: Date;
}
/*
"id": 6,
"phone_number": "+998910000001",
"password": "1234567890"

id: 8
"phone_number": "+998910000002",
"password": "1234567890"

id: 11
"phone_number": "+998910000003",
"password": "1234567890"

id: 12
"phone_number": "+998910000004",
"password": "1234567890"

id: 13
"phone_number": "+998910000005",
"password": "1234567890" */