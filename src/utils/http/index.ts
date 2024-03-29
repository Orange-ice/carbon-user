import type { AxiosTransform } from './axiosTransform.ts';
import type { ECAxiosRequestConfig, Result } from './types.ts';
import { ECAxios } from './Axios.ts';
import { ApiPrefix, ResultEnum } from '../../enums/httpEnum.ts';
import { useUser } from '../../store/modules/user.ts';
import type { AxiosError } from 'axios';


/**
 * @description 数据处理
 * */
const transform: AxiosTransform = {

  /**
   * @description: 处理请求数据
   */
  transformRequestData: (res, options) => {
    const { $message } = window;
    console.log('transformRequestData', res, options);
    const { data } = res;
    if (!data) {
      throw new Error('请求出错，请稍候重试');
    }

    const { code, total, data: resultData, message } = data;

    // 请求成功
    if (code === ResultEnum.SUCCESS) {
      // 如果非分页接口，直接返回结果数据
      return total === null ? resultData : data;
    }

    const errorMsg = message || '请求出错，请稍候重试';
    $message.error(errorMsg);
    throw new Error(errorMsg);
  },


  /**
   * @description: 请求前config配置
   * */
  beforeRequestHook: (config, options) => {
    // 处理api公共前缀 （默认GHG）
    config.baseURL = ApiPrefix[options.apiPrefix || 'GHG'];

    const userStore = useUser();
    const token = userStore.getToken;
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = token;
    }

    return config;
  },


  /**
   * @description 响应错误处理
   * */
  responseInterceptorsCatch: (error) => {
    const { $message } = window;
    const { response, message } = error as AxiosError<Result>;
    $message.error(response?.data?.message || message);
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
