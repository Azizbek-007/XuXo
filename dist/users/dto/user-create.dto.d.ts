import { CreateUserDetails } from "src/utils/types";
export declare class CreateUserDto implements CreateUserDetails {
    first_name: string;
    last_name: string;
    password: string;
    passport_number: string;
    phone_number: string;
    pinfl: string;
}
