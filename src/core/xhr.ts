import { parseHeaders } from '../helper/headers'
import { createError } from '../helper/error'
import type { AxiosRequestConfig, AxiosResponse } from '../types'

/**
 * 发起请求
 * @param config 处理过后的配置
 * @returns promise
 */
export default function xhr(config: AxiosRequestConfig) {
  return new Promise<AxiosResponse>((resolve, reject) => {
    const {
      url,
      method = 'get',
      data = null,
      headers,
      responseType,
      timeout,
    } = config
    const request = new XMLHttpRequest()

    if (responseType) {
      request.responseType = responseType
    }
    request.open(method.toUpperCase(), url, true)

    request.onreadystatechange = function () {
      if (request.readyState !== 4) {
        return
      }
      // 网络错误或者超时的时候的状态码都是 0
      if (request.status === 0) {
        return
      }

      const responseHeaders = parseHeaders(request.getAllResponseHeaders())
      const responseData =
        responseType !== 'text' ? request.response : request.responseText
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request,
      }
      handleResponse(response)
    }
    // 网络错误  断网的情况
    request.onerror = function handleError() {
      reject(createError('Network Error', config, null, request))
    }
    if (timeout) {
      request.timeout = timeout
    }
    request.ontimeout = function handleTimeout() {
      reject(
        createError(
          `Timeout of ${timeout} ms exceeded`,
          config,
          'ECONNABORTED',
          request,
        ),
      )
    }

    Object.keys(headers).forEach((name) => {
      // data 为空，且设置了 content-type 是没有意义的
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })

    request.send(data)

    function handleResponse(response: AxiosResponse) {
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        reject(
          createError(
            `Request failed with status code ${response.status}`,
            config,
            null,
            request,
            response,
          ),
        )
      }
    }
  })
}
