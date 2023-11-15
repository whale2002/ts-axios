import { AxiosRequestConfig, AxiosPromise, Method } from '../types'
import dispatchRequest from './dispatchRequest'

export class Axios {
  request<T = any>(url: any, config?: any): AxiosPromise<T> {
    if (typeof url === 'string') {
      if (!config) {
        config = {}
      }
      config.url = url
    } else {
      config = url
    }
    return dispatchRequest<T>(config)
  }
  get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T> {
    return this._requestMethodWithoutData<T>('GET', url, config)
  }
  delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T> {
    return this._requestMethodWithoutData<T>('DELETE', url, config)
  }
  head<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T> {
    return this._requestMethodWithoutData<T>('HEAD', url, config)
  }
  options<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T> {
    return this._requestMethodWithoutData<T>('OPTIONS', url, config)
  }
  post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): AxiosPromise<T> {
    return this._requestMethodWithData<T>('POST', url, data, config)
  }
  put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): AxiosPromise<T> {
    return this._requestMethodWithData<T>('PUT', url, data, config)
  }
  patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): AxiosPromise<T> {
    return this._requestMethodWithData<T>('PATCH', url, data, config)
  }
  private _requestMethodWithoutData<T>(
    method: Method,
    url: string,
    config?: AxiosRequestConfig,
  ) {
    return this.request<T>(
      Object.assign(config || {}, {
        url,
        method,
      }),
    )
  }
  private _requestMethodWithData<T>(
    method: Method,
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ) {
    return this.request<T>(
      Object.assign(config, {
        method,
        url,
        data,
      }),
    )
  }
}
