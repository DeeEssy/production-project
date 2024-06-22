export enum UserRole {
    ADMIN = 'ADMIN',
    USER = 'USER'

}

export interface User {
    id: number;
    username: string;
    avatar?: string;
    role: UserRole;
}

export interface UserSchema {
    authData?: User;

    _inited: boolean;
}
