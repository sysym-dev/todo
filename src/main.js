import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { useEmitter } from './plugins/emitter';
import { useClickOutisde } from './plugins/click-outside';
import { useStore } from './plugins/store';
import { useRouter } from './plugins/router';
import { routes } from './routes';
import { useLayout } from './plugins/layout';
import { useSupabase } from './plugins/supabase';

const app = createApp(App);

useEmitter(app);
useClickOutisde(app);
useLayout(app);
useRouter(app, routes);
useStore(app);
useSupabase(app);

app.mount('#app');
