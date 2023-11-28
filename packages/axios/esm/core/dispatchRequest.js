import xhr from "./xhr";
import { buildURL } from "../helper/url";
import { flattenHeaders } from "../helper/headers";
import transform from "./transform";
export default function dispatchRequest(config) {
  throwIfCancellationRequested(config);
  processConfig(config);
  return xhr(config).then(function (res) {
    return transformResponseData(res);
  });
}
function processConfig(config) {
  config.url = transformURL(config);
  config.data = transform(config.data, config.headers, config.transformRequest);
  config.headers = flattenHeaders(config.headers, config.method);
}
function transformURL(config) {
  var url = config.url,
    params = config.params;
  return buildURL(url, params);
}
function transformResponseData(res) {
  res.data = transform(res.data, res.headers, res.config.transformResponse);
  return res;
}
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}