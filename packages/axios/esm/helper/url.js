import { isDate, isObject, encode } from "./utils";

/**
 * 将请求参数拼接到url上
 * @param url 发请求的url
 * @param params 请求参数
 * @returns 拼接后的url
 */
export function buildURL(url, params) {
  if (!params) {
    return url;
  }
  var parts = [];
  Object.keys(params).forEach(function (key) {
    var val = params[key];
    if (val === null || typeof val === 'undefined') {
      return;
    }
    var values = [];
    if (Array.isArray(val)) {
      values = val;
      key += '[]';
    } else {
      values = [val];
    }
    values.forEach(function (val) {
      if (isDate(val)) {
        val = val.toISOString();
      } else if (isObject(val)) {
        val = JSON.stringify(val);
      }
      parts.push("".concat(encode(key), "=").concat(encode(val)));
    });
  });
  var joinedParams = parts.join('&');
  if (joinedParams) {
    var markIndex = url.indexOf('#');
    if (markIndex !== -1) {
      url = url.slice(0, markIndex);
    }
    url += (url.indexOf('?') === -1 ? '?' : '&') + joinedParams;
  }
  return url;
}