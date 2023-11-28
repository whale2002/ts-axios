function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var toString = Object.prototype.toString;

/**
 * 判断给定的值是否为Date对象
 * @param val 要判断的值
 * @returns 如果是Date对象则返回true，否则返回false
 */
export function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * 判断一个值是否为对象
 * @param val 要判断的值
 * @returns 如果值为对象类型则返回true，否则返回false
 */
export function isObject(val) {
  return val !== null && _typeof(val) === 'object';
}

/**
 * 判断一个值是否为普通对象
 * @param val 要判断的值
 * @returns 如果值为普通对象则返回true，否则返回false
 */
export function isPlainObject(val) {
  return toString.call(val) === '[object Object]';
}

/**
 * 对给定的字符串进行编码
 * @param val 需要编码的字符串
 * @returns 编码后的字符串
 */
export function encode(val) {
  return encodeURIComponent(val).replace(/%40/g, '@').replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, '+').replace(/%5B/gi, '[').replace(/%5D/gi, ']');
}

/**
 * 将一个对象的属性合并到另一个对象中，并返回合并后的对象
 * @param to - 合并的目标对象
 * @param from - 合并的源对象
 * @returns 合并后的对象
 */
export function extend(to, from) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var keys = options.allOwnKeys ? Object.getOwnPropertyNames(from) : Object.keys(from);
  var _iterator = _createForOfIteratorHelper(keys),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var key = _step.value;
      // eslint-disable-next-line no-extra-semi
      ;
      to[key] = from[key];
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return to;
}
/**
 * 深度合并多个对象
 * @param objs - 待合并的对象数组
 * @returns 合并后的对象
 */
export function deepMerge() {
  var result = Object.create(null);
  for (var _len = arguments.length, objs = new Array(_len), _key = 0; _key < _len; _key++) {
    objs[_key] = arguments[_key];
  }
  objs.forEach(function (obj) {
    if (obj) {
      Object.keys(obj).forEach(function (key) {
        var val = obj[key];
        if (isPlainObject(val)) {
          if (isPlainObject(result[key])) {
            result[key] = deepMerge(result[key], val);
          } else {
            result[key] = deepMerge({}, val);
          }
        } else {
          result[key] = val;
        }
      });
    }
  });
  return result;
}