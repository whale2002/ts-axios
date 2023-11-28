import { parseHeaders } from "../helper/headers";
import { createError } from "../helper/error";
/**
 * 发起请求
 * @param config 处理过后的配置
 * @returns promise
 */
export default function xhr(config) {
  return new Promise(function (resolve, reject) {
    var url = config.url,
      _config$method = config.method,
      method = _config$method === void 0 ? 'get' : _config$method,
      _config$data = config.data,
      data = _config$data === void 0 ? null : _config$data,
      headers = config.headers,
      responseType = config.responseType,
      timeout = config.timeout,
      cancelToken = config.cancelToken;
    var request = new XMLHttpRequest();
    if (responseType) {
      request.responseType = responseType;
    }
    request.open(method.toUpperCase(), url, true);
    request.onreadystatechange = function () {
      if (request.readyState !== 4) {
        return;
      }
      // 网络错误或者超时的时候的状态码都是 0
      if (request.status === 0) {
        return;
      }
      var responseHeaders = parseHeaders(request.getAllResponseHeaders());
      var responseData = responseType !== 'text' ? request.response : request.responseText;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };
      handleResponse(response);
    };
    // 网络错误  断网的情况
    request.onerror = function handleError() {
      reject(createError('Network Error', config, null, request));
    };
    if (timeout) {
      request.timeout = timeout;
    }
    request.ontimeout = function handleTimeout() {
      reject(createError("Timeout of ".concat(timeout, " ms exceeded"), config, 'ECONNABORTED', request));
    };
    Object.keys(headers).forEach(function (name) {
      // data 为空，且设置了 content-type 是没有意义的
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name];
      } else {
        request.setRequestHeader(name, headers[name]);
      }
    });
    if (cancelToken) {
      cancelToken.promise.then(function (reason) {
        request.abort();
        reject(reason);
      });
    }
    request.send(data);
    function handleResponse(response) {
      if (response.status >= 200 && response.status < 300) {
        resolve(response);
      } else {
        reject(createError("Request failed with status code ".concat(response.status), config, null, request, response));
      }
    }
  });
}