"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongooseStringFilter = MongooseStringFilter;
const class_validator_1 = require("class-validator");
const STRING_OPERATORS = ['$eq', '$ne', '$in', '$nin'];
function isStringFilter(value) {
    // simple string is allowed
    if (typeof value === 'string')
        return true;
    // object with operators
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        const keys = Object.keys(value);
        // all keys must be allowed
        if (!keys.every((k) => STRING_OPERATORS.includes(k)))
            return false;
        return keys.every((k) => {
            const val = value[k];
            switch (k) {
                case '$eq':
                case '$ne':
                    return typeof val === 'string';
                case '$in':
                case '$nin':
                case '$all':
                    return Array.isArray(val) && val.every((s) => typeof s === 'string');
                case '$regex':
                case '$options':
                    return typeof val === 'string';
                default:
                    return false;
            }
        });
    }
    return false;
}
function MongooseStringFilter(options) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'MongooseStringFilter',
            target: object.constructor,
            propertyName,
            validator: {
                validate(value, args) {
                    return isStringFilter(value);
                },
                defaultMessage(args) {
                    return `${args.property} must be a string or an object with operators ${STRING_OPERATORS.join(', ')}`;
                },
            },
            ...options,
        });
    };
}
//# sourceMappingURL=mongoose.string.js.map