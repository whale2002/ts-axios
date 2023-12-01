import xhr from './xhr'
import { buildURL, isAbsoluteURL, combineURL } from '../helper/url'
import { flattenHeaders } from '../helper/headers'
import transform from './transform'
import type { AxiosPromise, AxiosRequestConfig, AxiosResponse } from '../types'

export default function dispatchRequest(
  config: AxiosRequestConfig,
): AxiosPromise {
  throwIfCancellationRequested(config)
  processConfig(config)
  return xhr(config).then((res) => transformResponseData(res))
}
function processConfig(config: AxiosRequestConfig) {
  config.url = transformURL(config)
  config.data = transform(config.data, config.headers, config.transformRequest)
  config.headers = flattenHeaders(config.headers, config.method)
}

function transformURL(config: AxiosRequestConfig) {
  const { params, paramsSerializer, baseURL } = config
  let { url } = config
  if (baseURL && !isAbsoluteURL(url)) {
    url = combineURL(baseURL, url)
  }
  return buildURL(url, params, paramsSerializer)
}

function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transform(res.data, res.headers, res.config.transformResponse)
  return res
}

function throwIfCancellationRequested(config: AxiosRequestConfig): void {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested()
  }
}
