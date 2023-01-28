import { AxiosRequestConfig } from './types/index'
import xhr from './xhr'
import { bulidURL, transformRequest, processHeaders } from './helpers'

function axios(config: AxiosRequestConfig): void {
  processConfig(config)
  xhr(config)
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config)
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
}

/**
 * 处理URL
 * @param config 请求配置
 * @returns
 */
function transformUrl(config: AxiosRequestConfig): string {
  const { url, params } = config
  return bulidURL(url, params)
}

/**
 * 处理请求数据
 * @param config
 * @returns
 */
function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}

/**
 * 处理请求头
 * @param config
 * @returns
 */
function transformHeaders(config: AxiosRequestConfig) {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

export default axios
