import { BaseEntity } from "typeorm";
import { Users } from "./User";
export declare class Referals extends BaseEntity {
    id: number;
    customer: Users;
    customerId: number;
    referal_1: Users;
    referal1_id: number;
    referal_2: Users;
    referal2_id: number;
    created_at: Date;
    deleted_at: Date;
    static first_name: any;
}
