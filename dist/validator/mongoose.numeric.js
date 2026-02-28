"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongooseNumericFilter = MongooseNumericFilter;
const class_validator_1 = require("class-validator");
const NUMERIC_OPERATORS = [
    '$eq',
    '$ne',
    '$gt',
    '$gte',
    '$lt',
    '$lte',
    '$in',
    '$nin',
    '$all',
    '$mod',
];
function isNumericFilter(value) {
    // simple number is allowed
    if (typeof value === 'number')
        return true;
    // object with operators
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        const keys = Object.keys(value);
        // all keys must be allowed operators
        if (!keys.every((k) => NUMERIC_OPERATORS.includes(k)))
            return false;
        return keys.every((k) => {
            const val = value[k];
            switch (k) {
                case '$eq':
                case '$ne':
                case '$gt':
                case '$gte':
                case '$lt':
                case '$lte':
                    return typeof val === 'number';
                case '$in':
                case '$nin':
                case '$all':
                    return Array.isArray(val) && val.every((n) => typeof n === 'number');
                case '$mod':
                    return (Array.isArray(val) &&
                        val.length === 2 &&
                        val.every((n) => typeof n === 'number'));
                default:
                    return false;
            }
        });
    }
    return false;
}
function MongooseNumericFilter(options) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'MongooseNumericFilter',
            target: object.constructor,
            propertyName: propertyName,
            validator: {
                validate: (value, validationArguments) => {
                    return isNumericFilter(value);
                },
                defaultMessage: (args) => {
                    return `${args.property} must be a number or an object with operators ${NUMERIC_OPERATORS.join(', ')}`;
                },
            },
            ...options,
        });
    };
}
//# sourceMappingURL=mongoose.numeric.js.map