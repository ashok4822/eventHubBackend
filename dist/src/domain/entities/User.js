"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor({ id, name, email, password, role = 'user' }) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
    }
}
exports.default = User;
//# sourceMappingURL=User.js.map