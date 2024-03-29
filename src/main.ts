import { createApp } from 'vue';
import App from './App.vue';
import 'the-new-css-reset/css/reset.css';
import 'virtual:uno.css';
import { setupRouter } from './router';
import { setupStore } from './store';
import { setupArcoGlobalApi } from './plugins/setupArcoGlobalApi.ts';

const app = createApp(App);

setupStore(app);

setupRouter(app);

setupArcoGlobalApi();

app.mount('#app');
