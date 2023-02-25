import { gender } from "src/utils/types";
import { UserRoles } from "src/utils/user.role";
import { BaseEntity } from "typeorm";
import { Branches } from "./Branche";
import { Company } from "./Company";
export default class Employee extends BaseEntity {
    id: number;
    balance: number;
    branches: Branches[];
    comment: string;
    company: Company;
    date_of_birth: string;
    destroyer: string;
    gender: gender;
    name: string;
    number_of_groups: number;
    phone: string;
    roles: UserRoles;
    password: string;
}
