import { AxiosRequestConfig } from './types'

const config: AxiosRequestConfig = {
  method: 'get',
  timeout: 0,
  headers: {
    common: {
      Accept: 'application/json, text/plain, */*',
    },
  },
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
