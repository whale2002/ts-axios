import { parseHeaders } from '../helper/headers'
import { createError } from '../helper/error'
import { isURLSameOrigin } from '../helper/url'
import { isFormData } from '../helper/utils'
import cookie from '../helper/cookie'
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
      cancelToken,
      withCredentials,
      xsrfCookieName,
      xsrfHeaderName,
      onDownloadProgress,
      onUploadProgress,
      auth
    } = config

    const request = new XMLHttpRequest()

    request.open(method.toUpperCase(), url, true)

    configureRequest()
    addEventListeners()
    processHeader()
    processCancel()

    request.send(data)
    function configureRequest() {
      if (responseType) {
        request.responseType = responseType
      }
      if (withCredentials) {
        request.withCredentials = withCredentials
      }
      if (timeout) {
        request.timeout = timeout
      }
    }
    function addEventListeners() {
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
      if (onDownloadProgress) {
        request.onprogress = onDownloadProgress
      }
      if (onUploadProgress) {
        request.upload.onprogress = onUploadProgress
      }
    }
    function processHeader() {
      if (isFormData(data)) {
        delete headers['Content-Type']
      }
      if(auth) {
        headers['Authorization'] = 'Basic ' + btoa(auth.username + ':' + auth.password)
      }

      if ((withCredentials || isURLSameOrigin(url)) && xsrfCookieName) {
        const xsrfValue = cookie.read(xsrfCookieName)
        if (xsrfValue) {
          headers[xsrfHeaderName] = xsrfValue
        }
      }
      Object.keys(headers).forEach((name) => {
        // data 为空，且设置了 content-type 是没有意义的
        if (data === null && name.toLowerCase() === 'content-type') {
          delete headers[name]
        } else {
          request.setRequestHeader(name, headers[name])
        }
      })
    }
    function processCancel() {
      if (cancelToken) {
        cancelToken.promise.then((reason) => {
          request.abort()
          reject(reason)
        })
      }
    }
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
