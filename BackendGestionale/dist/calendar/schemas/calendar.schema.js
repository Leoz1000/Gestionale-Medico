"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalendarSchema = exports.Calendar = void 0;
const mongoose_1 = require("@nestjs/mongoose");
var IsCame;
(function (IsCame) {
    IsCame[IsCame["yes"] = 1] = "yes";
    IsCame[IsCame["no"] = 2] = "no";
    IsCame[IsCame["notConfirmed"] = 0] = "notConfirmed";
})(IsCame || (IsCame = {}));
let Calendar = class Calendar {
};
exports.Calendar = Calendar;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Calendar.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], Calendar.prototype, "start", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], Calendar.prototype, "end", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Boolean)
], Calendar.prototype, "allDay", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Calendar.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 'notClient' }),
    __metadata("design:type", String)
], Calendar.prototype, "clientId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: '#3788d8' }),
    __metadata("design:type", String)
], Calendar.prototype, "backgroundColor", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: '#3788d8' }),
    __metadata("design:type", String)
], Calendar.prototype, "borderColor", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: IsCame.notConfirmed }),
    __metadata("design:type", Number)
], Calendar.prototype, "isCame", void 0);
exports.Calendar = Calendar = __decorate([
    (0, mongoose_1.Schema)()
], Calendar);
exports.CalendarSchema = mongoose_1.SchemaFactory.createForClass(Calendar);
//# sourceMappingURL=calendar.schema.js.map