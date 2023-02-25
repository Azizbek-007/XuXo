import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Users } from 'src/utils/typeorm';

export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): Users => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);  