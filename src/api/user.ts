import { http } from '../utils/http';
import { Result } from '../utils/http/types.ts';

export interface LoginParams {
  username: string;
  password: string;
}

export function login(data: LoginParams) {
  return http.request<Result<{ accesstoken: string }>>({
    url: '/sso/oauth/login',
    method: 'post',
    data: {
      ...data,
      sysTemType: 'CARBON_DATA'
    }
  }, { apiPrefix: 'EC' });
}

// 获取用户信息
export function getUserInfo() {
  return http.request({
    url: '/roles/getUserInfo',
    method: 'get',
    params: { projectType: 'ghg' }
  }, { apiPrefix: 'PERMISSION' });
}
