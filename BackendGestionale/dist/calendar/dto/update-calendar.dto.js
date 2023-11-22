"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCalendarDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_calendar_dto_1 = require("./create-calendar.dto");
class UpdateCalendarDto extends (0, swagger_1.PartialType)(create_calendar_dto_1.CreateCalendarDto) {
}
exports.UpdateCalendarDto = UpdateCalendarDto;
//# sourceMappingURL=update-calendar.dto.js.map