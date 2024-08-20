import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { useEmitter } from './plugins/emitter';
import { useClickOutisde } from './plugins/click-outside';
import { useStore } from './plugins/store';

const app = createApp(App);

useEmitter(app);
useClickOutisde(app);
useStore(app);

app.mount('#app');
