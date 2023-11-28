import { isPlainObject } from "./utils";

/**
 * 将请求数据进行转换
 * @param data 需要转换的数据
 * @returns 转换后的数据
 */
export function stringifyRequestData(data) {
  if (isPlainObject(data)) {
    try {
      return JSON.stringify(data);
    } catch (e) {
      return data;
    }
  }
  return data;
}

/**
 * 将响应数据进行转换
 * @param data 需要转换的数据
 * @returns 转换后的数据
 */
export function parseResponseData(data) {
  if (typeof data === 'string') {
    try {
      return JSON.parse(data);
    } catch (e) {
      return data;
    }
  }
  return data;
}