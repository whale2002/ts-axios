import xhr from './xhr'
import { buildURL } from './helper/url'
import type { AxiosRequestConfig, AxiosResponse } from './types'
import { parseResponseData, stringifyRequestData } from './helper/data'
import { processHeaders } from './helper/headers'

function axios(config: AxiosRequestConfig) {
  processConfig(config)
  return xhr(config).then((res) => {
    return transformResponseData(res)
  })
}

function processConfig(config: AxiosRequestConfig) {
  config.url = transformURL(config)
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
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

export default axios
