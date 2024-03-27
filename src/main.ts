import { createApp } from 'vue';
import App from './App.vue';
import 'the-new-css-reset/css/reset.css';
import 'virtual:uno.css';
import { setupRouter } from './router';
import { setupStore } from './store';

const app = createApp(App);

setupStore(app);

setupRouter(app);

app.mount('#app');
