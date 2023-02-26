import { PaymetRole } from "src/utils/types";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./User";

@Entity()
export class Paymets extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => Users, { createForeignKeyConstraints: false })
    @JoinColumn()
    customer: Users;

    @Column()
    customerId: number;

    @Column()
    amoute: number;
    
    @Column({
        type: 'enum',
        enum: PaymetRole,
        default: PaymetRole.Waiting
      })
    status: PaymetRole;

    @CreateDateColumn()
    created_at: Date;
}