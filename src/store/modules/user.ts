import { defineStore } from 'pinia';
import { store } from '../index.ts';
import { login, LoginParams } from '../../api/user.ts';

interface UserState {
  token: string;
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): UserState => ({
    token: ''
  }),
  getters: {
    getToken(): string {
      return this.token;
    }
  },
  actions: {
    setToken(token: string) {
      this.token = token;
    },
    async login(params: LoginParams) {
      const res = await login(params)
      this.setToken(res.accessToken);
    }
  },
  persist: {
    paths: ['token']
  }
});

// 在setup之外的地方使用
export function useUser() {
  return useUserStore(store);
}
