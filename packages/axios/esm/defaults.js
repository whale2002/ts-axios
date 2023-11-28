import { processHeaders } from "./helper/headers";
import { stringifyRequestData, parseResponseData } from "./helper/data";
var config = {
  method: 'get',
  timeout: 0,
  headers: {
    common: {
      Accept: 'application/json, text/plain, */*'
    }
  },
  transformRequest: [function (data, header) {
    processHeaders(header, data);
    return stringifyRequestData(data);
  }],
  transformResponse: [function (data) {
    return parseResponseData(data);
  }]
};
var methodsWithoutData = ['delete', 'get', 'head', 'options'];
methodsWithoutData.forEach(function (method) {
  config.headers[method] = {};
});
var methodsWithData = ['post', 'put', 'patch'];
methodsWithData.forEach(function (method) {
  config.headers[method] = {
    'Content-Type': 'application/x-www-form-urlencoded'
  };
});
export default config;