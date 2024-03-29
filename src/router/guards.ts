import { PageEnum } from '../enums/pageEnum.ts';
import { Router } from 'vue-router';
import NProgress from 'nprogress';

NProgress.configure({ showSpinner: false });

const LOGIN_PATH = PageEnum.BASE_LOGIN;

const whitePathList = [LOGIN_PATH];

export function createRouterGuards(router: Router) {
  router.beforeEach(async (to, from, next) => {
    NProgress.start();
    next();
  });
  router.afterEach(() => {
    NProgress.done();
  });
}
