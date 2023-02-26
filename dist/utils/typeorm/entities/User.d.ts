import { UserStatus, Role, isActive } from "src/utils/types";
import { BaseEntity } from "typeorm";
export declare class Users extends BaseEntity {
    id: number;
    first_name: string;
    last_name: string;
    password: string;
    balance: number;
    passport_number: string;
    phone_number: string;
    pinfl: string;
    card_number: string;
    expiration_date: string;
    tree: Number[];
    status: UserStatus;
    role: Role;
    isActive: isActive;
    created_at: Date;
    deleted_at: Date;
}
