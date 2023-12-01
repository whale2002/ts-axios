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
export function isObject(val: any): boolean {
  return val !== null && typeof val === 'object'
}

/**
 * 判断一个值是否为普通对象
 * @param val 要判断的值
 * @returns 如果值为普通对象则返回true，否则返回false
 */
export function isPlainObject(val: any): boolean {
  return toString.call(val) === '[object Object]'
}

/**
 * 判断一个值是否为FormData类型
 * @param val 要判断的值
 * @returns 如果val不是未定义且是FormData类型，则返回true；否则返回false
 */
export function isFormData(val: any): val is FormData {
  return typeof val !== 'undefined' && val instanceof FormData
}

/**判断一个值是否为 URLSearchParams 类型 */
export function isURLSearchParams(val: any): val is URLSearchParams {
  return typeof val !== 'undefined' && val instanceof URLSearchParams
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

/**
 * 将一个对象的属性合并到另一个对象中，并返回合并后的对象
 * @param to - 合并的目标对象
 * @param from - 合并的源对象
 * @returns 合并后的对象
 */
export function extend<T, U>(
  to: T,
  from: U,
  options: { allOwnKeys?: boolean } = {},
): T & U {
  const keys = (
    options.allOwnKeys ? Object.getOwnPropertyNames(from) : Object.keys(from)
  ) as Array<keyof U>

  for (const key of keys) {
    // eslint-disable-next-line no-extra-semi
    ;(to as T & U)[key] = from[key] as any
  }

  return to as T & U
}
/**
 * 深度合并多个对象
 * @param objs - 待合并的对象数组
 * @returns 合并后的对象
 */
export function deepMerge(...objs: any[]): any {
  const result = Object.create(null)

  objs.forEach((obj) => {
    if (obj) {
      Object.keys(obj).forEach((key) => {
        const val = obj[key]
        if (isPlainObject(val)) {
          if (isPlainObject(result[key])) {
            result[key] = deepMerge(result[key], val)
          } else {
            result[key] = deepMerge({}, val)
          }
        } else {
          result[key] = val
        }
      })
    }
  })

  return result
}