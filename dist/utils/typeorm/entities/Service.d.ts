import { BaseEntity } from "typeorm";
export declare class Service extends BaseEntity {
    id: number;
    image: string;
    title: string;
    phone: string;
    created_at: Date;
}
