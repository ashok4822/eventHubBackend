export interface IUser {
    id?: string;
    name: string;
    email: string;
    password: string;
    role: 'user' | 'admin';
}
declare class User implements IUser {
    id?: string;
    name: string;
    email: string;
    password: string;
    role: 'user' | 'admin';
    constructor({ id, name, email, password, role }: IUser);
}
export default User;
//# sourceMappingURL=User.d.ts.map