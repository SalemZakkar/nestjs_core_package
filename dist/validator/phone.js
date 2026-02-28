"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhoneValidator = PhoneValidator;
const class_validator_1 = require("class-validator");
function PhoneValidator(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'PhoneValidator',
            propertyName: propertyName,
            target: object.constructor,
            validator: {
                validate: (value, validationArguments) => {
                    if (typeof value !== 'object')
                        return false;
                    const { code, number } = value;
                    if (!code || !number)
                        return false;
                    if (typeof code !== 'string')
                        return false;
                    if (typeof number !== 'string')
                        return false;
                    return true;
                },
                defaultMessage(args) {
                    return `${args.property} must be a valid phone number`;
                },
            },
        });
    };
}
//# sourceMappingURL=phone.js.map