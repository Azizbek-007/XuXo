import { Request } from 'express';
import { SaveOptions, RemoveOptions } from 'typeorm';

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
    pinfl: string
};
export type JwtPayload = { 
    id: number, 
    phone_number: string,
    roles: string 
}
export enum UserStatus {
    level_1 = 'agent',
    level_2 = 'motivator',
    level_3 = 'manager'
}

export enum gender {
    Male = 'Male',
    Female = 'Female'
}

export enum Role {
    User = 'User',
    Admin = 'Admin',
}

export enum isActive {
    Active = 1,
    NotActive = 0
}
export enum PaymetRole {
    Waiting = 'Waiting',
    Paid = 'Paid',
    Canceled = 'Canceled'
}