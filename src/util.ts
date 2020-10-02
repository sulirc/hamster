export function isString (arg: any): arg is string {
  return typeof arg === 'string'
}

export function isNumber (arg: any): arg is number {
  return typeof arg === 'number'
}

export function isFunction (arg: any): arg is Function {
  return typeof arg === 'function'
}

export function isNullOrUndef (o: any): o is undefined | null {
  return o === undefined || o === null
}

export function isValidElement (node) {
  return !isNullOrUndef(node) && node.vtype
}

export const isArray = Array.isArray