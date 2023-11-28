/**
 * 判断给定的值是否为Date对象
 * @param val 要判断的值
 * @returns 如果是Date对象则返回true，否则返回false
 */
export declare function isDate(val: any): val is Date;
/**
 * 判断一个值是否为对象
 * @param val 要判断的值
 * @returns 如果值为对象类型则返回true，否则返回false
 */
export declare function isObject(val: any): val is Object;
/**
 * 判断一个值是否为普通对象
 * @param val 要判断的值
 * @returns 如果值为普通对象则返回true，否则返回false
 */
export declare function isPlainObject(val: any): val is Object;
/**
 * 对给定的字符串进行编码
 * @param val 需要编码的字符串
 * @returns 编码后的字符串
 */
export declare function encode(val: string): string;
/**
 * 将一个对象的属性合并到另一个对象中，并返回合并后的对象
 * @param to - 合并的目标对象
 * @param from - 合并的源对象
 * @returns 合并后的对象
 */
export declare function extend<T, U>(to: T, from: U, options?: {
    allOwnKeys?: boolean;
}): T & U;
/**
 * 深度合并多个对象
 * @param objs - 待合并的对象数组
 * @returns 合并后的对象
 */
export declare function deepMerge(...objs: any[]): any;
//# sourceMappingURL=utils.d.ts.map