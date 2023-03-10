import { HttpException, HttpStatus } from "@nestjs/common";
import { Response } from 'express';

export function ApiRes(message: string, status: HttpStatus, payload?: object ) {
    const option = { message, payload };
    throw new HttpException(option, status);
} 