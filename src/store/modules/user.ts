import { defineStore } from 'pinia';
import { store } from '../index.ts';
import { getUserInfo, login, LoginParams } from '../../api/user.ts';

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
      console.log(res);
      this.setToken(res.data.accesstoken);
    },
    async getInfo() {
      const res = await getUserInfo();
      console.log(res);
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
