export interface IUser {
    id?: string;
    name: string;
    email: string;
    password: string;
    role: 'user' | 'admin';
    resetPasswordToken?: string;
    resetPasswordExpires?: Date;
}
declare class User implements IUser {
    id?: string;
    name: string;
    email: string;
    password: string;
    role: 'user' | 'admin';
    resetPasswordToken?: string;
    resetPasswordExpires?: Date;
    constructor({ id, name, email, password, role, resetPasswordToken, resetPasswordExpires }: IUser);
}
export default User;
//# sourceMappingURL=User.d.ts.map