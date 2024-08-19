import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { useEmitter } from './plugins/emitter';
import { useClickOutisde } from './plugins/click-outside';

const app = createApp(App);

useEmitter(app);
useClickOutisde(app);

app.mount('#app');
