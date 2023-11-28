import { Axios } from './core/Axios'
import { extend } from './helper/utils'
import type { AxiosRequestConfig, AxiosStatic } from './types'
import defaults from './defaults'
import mergeConfig from './core/mergeConfig'
import CancelToken from './cancel/CancelToken'
import Cancel, { isCancel } from './cancel/Cancel'

function createInstance(config?: AxiosRequestConfig): AxiosStatic {
  const context = new Axios(config)
  const instance = Axios.prototype.request.bind(context)

  extend(instance, context, { allOwnKeys: true })
  extend(instance, Axios.prototype, { allOwnKeys: true })

  return instance as AxiosStatic
}

const axios = createInstance(defaults)
axios.create = function (instanceConfig) {
  return createInstance(mergeConfig(defaults, instanceConfig))
}

axios.CancelToken = CancelToken
axios.Cancel = Cancel
axios.isCancel = isCancel

export default axios