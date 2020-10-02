"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createVText = exports.createVoid = exports.createVNode = void 0;
function createVNode(type, props, children) {
    return {
        vtype: 2 /* Node */,
        type,
        props: props || {},
        children,
        dom: null,
    };
}
exports.createVNode = createVNode;
function createVoid() {
    return {
        dom: null,
        vtype: 16 /* Void */,
    };
}
exports.createVoid = createVoid;
function createVText(text) {
    return {
        vtype: 1 /* Text */,
        text,
        dom: null,
    };
}
exports.createVText = createVText;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidm5vZGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdm5vZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBUUEsU0FBZ0IsV0FBVyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsUUFBUTtJQUMvQyxPQUFPO1FBQ0wsS0FBSyxjQUFnQjtRQUNyQixJQUFJO1FBQ0osS0FBSyxFQUFFLEtBQUssSUFBSSxFQUFFO1FBQ2xCLFFBQVE7UUFDUixHQUFHLEVBQUUsSUFBSTtLQUNWLENBQUM7QUFDSixDQUFDO0FBUkQsa0NBUUM7QUFFRCxTQUFnQixVQUFVO0lBQ3hCLE9BQU87UUFDTCxHQUFHLEVBQUUsSUFBSTtRQUNULEtBQUssZUFBZ0I7S0FDdEIsQ0FBQztBQUNKLENBQUM7QUFMRCxnQ0FLQztBQUVELFNBQWdCLFdBQVcsQ0FBQyxJQUFJO0lBQzlCLE9BQU87UUFDTCxLQUFLLGNBQWdCO1FBQ3JCLElBQUk7UUFDSixHQUFHLEVBQUUsSUFBSTtLQUNWLENBQUM7QUFDSixDQUFDO0FBTkQsa0NBTUMifQ==