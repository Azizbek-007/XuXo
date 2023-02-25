import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./User";

@Entity()
export class Referals extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => Users, { nullable: false})
    @JoinColumn()
    customer: Users;

    @Column({ unique: true })
    customerId: number

    @OneToOne(() => Users, { nullable: false })
    @JoinColumn({ name: 'referal1_id' })
    referal_1: Users

    @Column({ unique: true })
    referal1_id: number

    @OneToOne(() => Users, { nullable: true })
    @JoinColumn({ name: 'referal2_id'})
    referal_2: Users

    @Column({ nullable: true, unique: true })
    referal2_id: number

    @CreateDateColumn() 
    created_at: Date;

    @DeleteDateColumn({ select: false })
    deleted_at: Date;
}