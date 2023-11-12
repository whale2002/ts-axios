import { parseHeaders } from './helper/headers'
import type { AxiosRequestConfig, AxiosResponse } from './types'

export default function xhr(config: AxiosRequestConfig) {
  return new Promise((resolve) => {
    const { url, method = 'get', data = null, headers, responseType } = config
    const request = new XMLHttpRequest()

    if (responseType) {
      request.responseType = responseType
    }
    request.open(method.toUpperCase(), url, true)

    request.onreadystatechange = function () {
      if (request.readyState !== 4) {
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
      resolve(response)
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
  })
}
