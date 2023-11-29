import { AxiosRequestConfig, AxiosResponse } from '../types/index';
export declare class AxiosError extends Error {
    isAxiosError: boolean;
    config?: AxiosRequestConfig;
    code?: string | null;
    request?: XMLHttpRequest;
    response?: AxiosResponse;
    constructor(message: string, config: AxiosRequestConfig, code?: string | null, request?: XMLHttpRequest, response?: AxiosResponse);
}
export declare function createError(message: string, config: AxiosRequestConfig, code?: string | null, request?: XMLHttpRequest, response?: AxiosResponse): AxiosError;
