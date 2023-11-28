function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import InterceptorManager from "./InterceptorManager";
import dispatchRequest from "./dispatchRequest";
import mergeConfig from "./mergeConfig";
export var Axios = /*#__PURE__*/function () {
  function Axios(initConfig) {
    _classCallCheck(this, Axios);
    _defineProperty(this, "interceptors", void 0);
    _defineProperty(this, "defaults", void 0);
    this.defaults = initConfig;
    this.interceptors = {
      request: new InterceptorManager(),
      response: new InterceptorManager()
    };
  }
  _createClass(Axios, [{
    key: "request",
    value: function request(url, config) {
      if (typeof url === 'string') {
        if (!config) {
          config = {};
        }
        config.url = url;
      } else {
        config = url;
      }
      config = mergeConfig(this.defaults, config);
      var chain = [{
        resolved: dispatchRequest,
        rejected: undefined
      }];
      this.interceptors.request.forEach(function (interceptor) {
        chain.unshift(interceptor);
      });
      this.interceptors.response.forEach(function (interceptor) {
        chain.push(interceptor);
      });
      var promise = Promise.resolve(config);
      while (chain.length) {
        var _chain$shift = chain.shift(),
          resolved = _chain$shift.resolved,
          rejected = _chain$shift.rejected;
        promise = promise.then(resolved, rejected);
      }
      return promise;
    }
  }, {
    key: "get",
    value: function get(url, config) {
      return this._requestMethodWithoutData('GET', url, config);
    }
  }, {
    key: "delete",
    value: function _delete(url, config) {
      return this._requestMethodWithoutData('DELETE', url, config);
    }
  }, {
    key: "head",
    value: function head(url, config) {
      return this._requestMethodWithoutData('HEAD', url, config);
    }
  }, {
    key: "options",
    value: function options(url, config) {
      return this._requestMethodWithoutData('OPTIONS', url, config);
    }
  }, {
    key: "post",
    value: function post(url, data, config) {
      return this._requestMethodWithData('POST', url, data, config);
    }
  }, {
    key: "put",
    value: function put(url, data, config) {
      return this._requestMethodWithData('PUT', url, data, config);
    }
  }, {
    key: "patch",
    value: function patch(url, data, config) {
      return this._requestMethodWithData('PATCH', url, data, config);
    }
  }, {
    key: "_requestMethodWithoutData",
    value: function _requestMethodWithoutData(method, url, config) {
      return this.request(Object.assign(config || {}, {
        url: url,
        method: method
      }));
    }
  }, {
    key: "_requestMethodWithData",
    value: function _requestMethodWithData(method, url, data, config) {
      return this.request(Object.assign(config || {}, {
        method: method,
        url: url,
        data: data
      }));
    }
  }]);
  return Axios;
}();