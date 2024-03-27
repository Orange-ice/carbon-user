import { http } from '../utils/http';

export interface LoginParams {
  username: string;
  password: string;
}

export function login(data: LoginParams) {
  return http.request({
    url: '/sso/oauth/login',
    method: 'post',
    data: {
      ...data,
      sysTemType: 'CARBON_DATA'
    }
  }, { apiPrefix: 'EC' });
}
