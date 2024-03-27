import type { AxiosTransform } from './axiosTransform.ts';
import { ECAxiosRequestConfig } from './types.ts';
import { ECAxios } from './Axios.ts';
import { ApiPrefix } from '../../enums/httpEnum.ts';


/**
 * @description 数据处理
 * */
const transform: AxiosTransform = {

  /**
   * @description: 处理请求数据
   */
  transformRequestData: (res, options) => {
    console.log('transformRequestData', res, options);
    return res.data;
  },


  /**
   * @description: 请求前config配置
   * */
  beforeRequestHook: (config, options) => {
    // 处理api公共前缀 （默认GHG）
    config.baseURL = ApiPrefix[options.apiPrefix || 'GHG']

    return config;
  },


  /**
   * @description 响应错误处理
   * */
  responseInterceptorsCatch: (error) => {
    return Promise.reject(error);
  }
};

function createAxios(opt?: Partial<ECAxiosRequestConfig>) {
  return new ECAxios({
    timeout: 30 * 1000,
    baseURL: '',
    transform,
    ...opt
  });
}

export const http = createAxios();
