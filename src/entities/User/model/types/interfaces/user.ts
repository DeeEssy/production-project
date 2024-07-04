import { UserRole } from '../enums/user';

export interface User {
    id: number;
    username: string;
    avatar?: string;
    roles: UserRole[];
}

export interface UserSchema {
    authData?: User;

    _inited: boolean;
}
