import type { RouteRecordRaw } from 'vue-router';

export interface ModuleType {
  default: Array<RouteRecordRaw> | RouteRecordRaw;
}
