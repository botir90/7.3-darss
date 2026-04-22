
import { SetMetadata } from '@nestjs/common';
import { RoleUser } from 'src/shared/enums/roles.enum';


export const ROLES_KEY = 'roles';
export const Roles = (...roles: RoleUser[]) => SetMetadata(ROLES_KEY, roles);
