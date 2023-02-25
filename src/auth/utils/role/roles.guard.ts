import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { UsersService } from "src/users/users.service";
import { Role } from "src/utils/types";
import { ROLES_KEY } from "./roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate{
    constructor(
        private reflector: Reflector,
        private userService: UsersService
        ){}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        console.log(requiredRoles)
        const request = context.switchToHttp().getRequest();
        console.log(request.user)
        if(request?.user){
            const { id } = request.user;
            const user = await this.userService.findOneBy(id);
            return requiredRoles.includes(user.role);
        }
        
        return false;
    }
}