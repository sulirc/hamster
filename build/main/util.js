"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isArray = exports.isValidElement = exports.isNullOrUndef = exports.isFunction = exports.isNumber = exports.isString = void 0;
function isString(arg) {
    return typeof arg === 'string';
}
exports.isString = isString;
function isNumber(arg) {
    return typeof arg === 'number';
}
exports.isNumber = isNumber;
function isFunction(arg) {
    return typeof arg === 'function';
}
exports.isFunction = isFunction;
function isNullOrUndef(o) {
    return o === undefined || o === null;
}
exports.isNullOrUndef = isNullOrUndef;
function isValidElement(node) {
    return !isNullOrUndef(node) && node.vtype;
}
exports.isValidElement = isValidElement;
exports.isArray = Array.isArray;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLFNBQWdCLFFBQVEsQ0FBRSxHQUFRO0lBQ2hDLE9BQU8sT0FBTyxHQUFHLEtBQUssUUFBUSxDQUFBO0FBQ2hDLENBQUM7QUFGRCw0QkFFQztBQUVELFNBQWdCLFFBQVEsQ0FBRSxHQUFRO0lBQ2hDLE9BQU8sT0FBTyxHQUFHLEtBQUssUUFBUSxDQUFBO0FBQ2hDLENBQUM7QUFGRCw0QkFFQztBQUVELFNBQWdCLFVBQVUsQ0FBRSxHQUFRO0lBQ2xDLE9BQU8sT0FBTyxHQUFHLEtBQUssVUFBVSxDQUFBO0FBQ2xDLENBQUM7QUFGRCxnQ0FFQztBQUVELFNBQWdCLGFBQWEsQ0FBRSxDQUFNO0lBQ25DLE9BQU8sQ0FBQyxLQUFLLFNBQVMsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFBO0FBQ3RDLENBQUM7QUFGRCxzQ0FFQztBQUVELFNBQWdCLGNBQWMsQ0FBRSxJQUFJO0lBQ2xDLE9BQU8sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQTtBQUMzQyxDQUFDO0FBRkQsd0NBRUM7QUFFWSxRQUFBLE9BQU8sR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFBIn0=