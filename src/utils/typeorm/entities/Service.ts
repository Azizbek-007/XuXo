import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Service extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    image: string;
    
    @Column()
    title: string;

    @Column()
    phone: string;

    @CreateDateColumn()
    created_at: Date;
}
