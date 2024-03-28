import type { AxiosRequestConfig } from 'axios';
import { AxiosTransform } from './axiosTransform.ts';

export interface ECAxiosRequestConfig extends AxiosRequestConfig {
  requestOptions?: RequestOptions;
  transform?: AxiosTransform;
}

export interface RequestOptions {
  //忽略重复请求
  ignoreCancelToken?: boolean;
  // api前缀
  apiPrefix?: 'GHG' | 'EC' | 'PERMISSION';
}

export interface Result<T = any> {
  code: string;
  message: string;
  data: T;
  success: boolean;

  page: number | null;
  size: number | null;
  total: number | null;
  totalPageNum: number | null;
}
