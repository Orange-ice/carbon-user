import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import type { App } from 'vue';
import { ModuleType } from './types.ts';
import { createRouterGuards } from './guards.ts';

const modules = import.meta.glob<ModuleType>('./modules/**/*.ts', { eager: true });

const routeModuleList: RouteRecordRaw[] = Object.keys(modules).reduce((list, key) => {
  const mod = modules[key].default ?? {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  return [...list, ...modList];
}, [] as RouteRecordRaw[]);

const LoginRoute: RouteRecordRaw = {
  path: '/login',
  name: 'login',
  component: () => import('../views/login/index.vue'),
  meta: {
    title: '登录'
  }
};

// 需要验证权限的路由
const asyncRoutes = [...routeModuleList];

// 普通路由 无需验证权限
const constantRouter: RouteRecordRaw[] = [LoginRoute];

// TODO 暂时将所有路由合并并展示
const allRoutes = [...constantRouter, ...asyncRoutes];

const router = createRouter({
  history: createWebHistory(),
  strict: true,
  // routes: constantRouter,
  routes: allRoutes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});


export function setupRouter(app: App) {
  app.use(router);
  createRouterGuards(router);
}

export default router;
