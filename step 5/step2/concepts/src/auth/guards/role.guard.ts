import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { UserRole } from "../entities/user.entity";
import { ROLES_KEY } from "../decorators/role.decorators";

@Injectable()
export class RolesGuard implements CanActivate{
    // reflector is utility that will help as to access metadata
    constructor(private reflector: Reflector){}

    // 
    canActivate(context: ExecutionContext): boolean  {

        // retriev the roles metadata set by the roles decorator

        const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
            ROLES_KEY, [
            context.getHandler(),   // method level metadata
            context.getClass() // class level metadata
            ]
        );
        if(!requiredRoles) {
            return true
        }
        const { user } = context.switchToHttp().getRequest()
        if(!user){
            throw new ForbiddenException("user not authenticated")
        }
        const hasRequiredRole = requiredRoles.some(role => user.role === role)
        if(!hasRequiredRole){
             throw new ForbiddenException("insuffient permission")
        }
        return true;
    }

}