import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { useClickOutside } from './plugins/click-outside';
import { useEmitter } from './plugins/emitter';
import { useRouter } from './plugins/router';
import { routes } from './routes';
import { useLayout } from './plugins/layout';
import { useStore } from './plugins/store';

const app = createApp(App);

useClickOutside(app);
useEmitter(app);
useRouter(app, routes);
useStore(app);
useLayout(app);

app.mount('#app');
