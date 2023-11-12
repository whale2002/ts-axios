const toString = Object.prototype.toString

/**
 * 判断给定的值是否为Date对象
 * @param val 要判断的值
 * @returns 如果是Date对象则返回true，否则返回false
 */
export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}

/**
 * 判断一个值是否为对象
 * @param val 要判断的值
 * @returns 如果值为对象类型则返回true，否则返回false
 */
export function isObject(val: any): val is Object {
  return val !== null && typeof val === 'object'
}

/**
 * 判断一个值是否为普通对象
 * @param val 要判断的值
 * @returns 如果值为普通对象则返回true，否则返回false
 */
export function isPlainObject(val: any): val is Object {
  return toString.call(val) === '[object Object]'
}

/**
 * 对给定的字符串进行编码
 * @param val 需要编码的字符串
 * @returns 编码后的字符串
 */
export function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}
