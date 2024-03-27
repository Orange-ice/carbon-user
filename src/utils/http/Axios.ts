import type { AxiosInstance, AxiosResponse } from 'axios';
import axios from 'axios';
import { ECAxiosRequestConfig, RequestOptions, Result } from './types.ts';
import { AxiosCanceler } from './axiosCancel.ts';

export class ECAxios {
  private axiosInstance: AxiosInstance;
  // 请求配置
  private options: ECAxiosRequestConfig;

  constructor(options: ECAxiosRequestConfig) {
    this.options = options;
    this.axiosInstance = axios.create(options);
    this.setupInterceptors();
  }

  private getTransform() {
    const { transform } = this.options;
    return transform;
  }


  /**
   * @description 拦截器配置
   * */
  private setupInterceptors() {
    const transform = this.getTransform();
    if (!transform) {
      return;
    }

    const {
      requestInterceptors,
      requestInterceptorsCatch,
      responseInterceptors,
      responseInterceptorsCatch
    } = transform;

    const axiosCanceler = new AxiosCanceler();


    // 请求拦截器
    this.axiosInstance.interceptors.request.use(
      (config) => {
        const ignoreCancelToken = config.headers.ignoreCancelToken;
        const ignoreCancel = ignoreCancelToken !== undefined ? ignoreCancelToken : this.options.requestOptions?.ignoreCancelToken;

        !ignoreCancel && axiosCanceler.addPending(config);

        if (requestInterceptors) {
          config = requestInterceptors(config, this.options);
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // 请求错误捕获
    requestInterceptorsCatch && this.axiosInstance.interceptors.request.use(undefined, requestInterceptorsCatch);


    // 响应拦截器
    this.axiosInstance.interceptors.response.use(
      (res) => {
        res && axiosCanceler.removePending(res.config);
        if (responseInterceptors) {
          res = responseInterceptors(res);
        }
        return res;
      },
      (error) => {
        responseInterceptorsCatch?.(error);
        return Promise.reject(error);
      }
    );
  }

  /**
   * @description 统一请求方法
   * */
  request<T = any>(config: ECAxiosRequestConfig, options?: RequestOptions): Promise<T> {
    let conf: ECAxiosRequestConfig = Object.assign({}, config);
    const transform = this.getTransform();
    const { requestOptions } = this.options;
    const opt: RequestOptions = Object.assign({}, requestOptions, options);

    const { beforeRequestHook, requestCatch, transformRequestData } = transform || {};
    if (beforeRequestHook) {
      conf = beforeRequestHook(conf, opt);
    }

    // conf.requestOptions = opt;

    return new Promise((resolve, reject) => {
      this.axiosInstance.request<any, AxiosResponse<Result>>(conf).then(res => {
        const isCancel = axios.isCancel(res);
        if (transformRequestData && !isCancel) {
          try {
            const handledRes = transformRequestData(res, opt);
            resolve(handledRes);
          } catch (err) {
            reject(err || new Error('request error!'));
          }
          return;
        }
        resolve(res as unknown as Promise<T>);
      }).catch((e: Error) => {
        if (requestCatch) {
          reject(requestCatch(e));
          return;
        }
        reject(e);
      });
    });
  }


}
