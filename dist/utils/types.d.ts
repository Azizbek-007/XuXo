export type ValidateUserDetails = {
    phone_number: string;
    password: string;
};
export type CreateUserDetails = {
    first_name: string;
    last_name: string;
    password: string;
    passport_number: string;
    phone_number: string;
    pinfl: string;
};
export type JwtPayload = {
    id: number;
    phone_number: string;
    roles: string;
};
export declare enum UserStatus {
    level_1 = "agent",
    level_2 = "motivator",
    level_3 = "manager"
}
export declare enum gender {
    Male = "Male",
    Female = "Female"
}
export declare enum Role {
    User = "User",
    Admin = "Admin"
}
