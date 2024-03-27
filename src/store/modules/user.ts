import { defineStore } from 'pinia';
import { store } from '../index.ts';

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
    async login() {
      this.setToken('Bearer token');
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
