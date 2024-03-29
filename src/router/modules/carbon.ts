import type { RouteRecordRaw } from 'vue-router';
import MenuLayout from '../../layout/MenuLayout.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/carbon',
    name: 'carbon',
    component: MenuLayout,
    meta: {
      title: 'Carbon',
    },
    children: [
      {
        path: 'index',
        name: 'carbon_index',
        component: () => import('../../views/carbon/index.vue'),
        meta: {
          title: '碳数据',
        },
      }
    ]
  },
];

export default routes;
