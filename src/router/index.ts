import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import type { App } from 'vue';


const LoginRoute: RouteRecordRaw = {
  path: '/login',
  name: 'Login',
  component: () => import('../views/login/index.vue'),
  meta: {
    title: '登录'
  }
};

// 普通路由 无需验证权限
const constantRouter: RouteRecordRaw[] = [LoginRoute];

const router = createRouter({
  history: createWebHistory(),
  strict: true,
  routes: constantRouter,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});


export function setupRouter(app: App) {
  app.use(router);
  // 路由守卫 TODO
}

export default router;
