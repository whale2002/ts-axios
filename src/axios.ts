import { Axios } from './core/Axios'
import { extend } from './helper/utils'
import { AxiosInstance } from './types'
import defaultConfig from './defaults'

function createInstance(): AxiosInstance {
  const context = new Axios(defaultConfig)
  const instance = Axios.prototype.request.bind(context)

  extend(instance, context)

  return instance as AxiosInstance
}

const axios = createInstance()
export default axios
