"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Roles = void 0;
const common_1 = require("@nestjs/common");
const Roles = (...args) => {
    return (0, common_1.SetMetadata)('role', args);
};
exports.Roles = Roles;
//# sourceMappingURL=role.guard.js.map