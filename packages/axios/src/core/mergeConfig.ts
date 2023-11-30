import { deepMerge, isPlainObject } from '../helper/utils'
import { AxiosRequestConfig } from '../types'

type RequestConfigKey = keyof AxiosRequestConfig

const strategyKeysFromConfig2 = ['url', 'params', 'data']
const strategyKeysDeepMerge = ['headers', 'auth']
const strategys = Object.create(null)
strategyKeysFromConfig2.forEach((key) => {
  strategys[key] = fromConfig2Strategy
})
strategyKeysDeepMerge.forEach((key) => {
  strategys[key] = deepMergeStrategy
})

export default function mergeConfig(
  config1: AxiosRequestConfig,
  config2?: AxiosRequestConfig, // 自定义配置
): AxiosRequestConfig {
  if (!config2) {
    config2 = {}
  }

  const config = Object.create(null)

  for (let key in config2) {
    mergeField(key as RequestConfigKey)
  }

  for (let key in config1) {
    if (!config2[key as RequestConfigKey]) {
      mergeField(key as RequestConfigKey)
    }
  }

  function mergeField(key: RequestConfigKey): void {
    const strategy = strategys[key] || defaultStrategy
    config[key] = strategy(config1[key], config2![key])
  }

  return config
}

function fromConfig2Strategy(val1: any, val2: any): any {
  if (typeof val2 !== 'undefined') {
    return val2
  }
}
function deepMergeStrategy(val1: any, val2: any): any {
  if (isPlainObject(val2)) {
    return deepMerge(val1, val2)
  } else if (typeof val2 !== 'undefined') {
    return val2
  } else if (isPlainObject(val1)) {
    return deepMerge(val1)
  } else if (typeof val1 !== 'undefined') {
    return val1
  }
}
function defaultStrategy(val1: any, val2: any): any {
  return typeof val2 !== 'undefined' ? val2 : val1
}
