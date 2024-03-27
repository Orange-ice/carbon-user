import { createApp } from 'vue';
import App from './App.vue';
import 'the-new-css-reset/css/reset.css';
import 'virtual:uno.css';
import { setupRouter } from './router';

const app = createApp(App);

setupRouter(app);

app.mount('#app');
