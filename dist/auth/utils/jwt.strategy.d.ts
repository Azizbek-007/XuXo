import { Strategy } from 'passport-jwt';
import { JwtPayload } from 'src/utils/types';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    constructor();
    validate(payload: JwtPayload): Promise<{
        id: number;
        phone_number: string;
    }>;
}
export {};
