import InterceptorManager from './InterceptorManager';
import type { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types';
export interface Interceptors {
    request: InterceptorManager<AxiosRequestConfig>;
    response: InterceptorManager<AxiosResponse>;
}
export declare class Axios {
    interceptors: Interceptors;
    defaults: AxiosRequestConfig;
    constructor(initConfig: AxiosRequestConfig);
    request(url: any, config?: any): AxiosPromise;
    get(url: string, config?: AxiosRequestConfig): AxiosPromise;
    delete(url: string, config?: AxiosRequestConfig): AxiosPromise;
    head(url: string, config?: AxiosRequestConfig): AxiosPromise;
    options(url: string, config?: AxiosRequestConfig): AxiosPromise;
    post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise;
    put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise;
    patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise;
    private _requestMethodWithoutData;
    private _requestMethodWithData;
}
//# sourceMappingURL=Axios.d.ts.map