"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor({ id, name, email, password, role = 'user', resetPasswordToken, resetPasswordExpires }) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.resetPasswordToken = resetPasswordToken;
        this.resetPasswordExpires = resetPasswordExpires;
    }
}
exports.default = User;
//# sourceMappingURL=User.js.map