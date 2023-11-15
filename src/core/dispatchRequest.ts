import xhr from './xhr'
import { buildURL } from '../helper/url'
import { parseResponseData, stringifyRequestData } from '../helper/data'
import { flattenHeaders, processHeaders } from '../helper/headers'
import type { AxiosPromise, AxiosRequestConfig, AxiosResponse } from '../types'

export default function dispatchRequest(
  config: AxiosRequestConfig,
): AxiosPromise {
  processConfig(config)
  return xhr(config)
}

function processConfig(config: AxiosRequestConfig) {
  config.url = transformURL(config)
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
  config.headers = flattenHeaders(config.headers, config.method)
}

function transformURL(config: AxiosRequestConfig) {
  const { url, params } = config
  return buildURL(url, params)
}
function transformHeaders(config: AxiosRequestConfig) {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}
function transformRequestData(config: AxiosRequestConfig) {
  return stringifyRequestData(config.data)
}
function transformResponseData(res: AxiosResponse) {
  res.data = parseResponseData(res.data)
  return res
}
