import xhr from './xhr'
import type { AxiosRequestConfig } from './types'

function axios(config: AxiosRequestConfig) {
  xhr(config) 
}

export default axios
