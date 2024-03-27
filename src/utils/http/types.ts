import type { AxiosRequestConfig } from 'axios';
import { AxiosTransform } from './axiosTransform.ts';

export interface ECAxiosRequestConfig extends AxiosRequestConfig {
  requestOptions?: RequestOptions;
  transform?: AxiosTransform;
}

export interface RequestOptions {
  //忽略重复请求
  ignoreCancelToken?: boolean;
}

export interface Result<T = any> {
  code: number;
  type: 'success' | 'error' | 'warning';
  message: string;
  result: T;
}
