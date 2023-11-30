import { AxiosRequestConfig } from './types'
import { processHeaders } from './helper/headers'
import { stringifyRequestData, parseResponseData } from './helper/data'

const config: AxiosRequestConfig = {
  method: 'get',
  timeout: 0,
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  headers: {
    common: {
      Accept: 'application/json, text/plain, */*',
    },
  },
  transformRequest: [
    function (data: any, header: any) {
      processHeaders(header, data)
      return stringifyRequestData(data)
    },
  ],
  transformResponse: [
    function (data: any) {
      return parseResponseData(data)
    },
  ],
  validateStatus(status: number): boolean {
    return status >= 200 && status < 300
  }
}

const methodsWithoutData = ['delete', 'get', 'head', 'options']
methodsWithoutData.forEach((method) => {
  config.headers[method] = {}
})

const methodsWithData = ['post', 'put', 'patch']
methodsWithData.forEach((method) => {
  config.headers[method] = {
    'Content-Type': 'application/x-www-form-urlencoded',
  }
})

export default config
