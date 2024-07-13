import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { useClickOutside } from './plugins/click-outside';
import { useEmitter } from './plugins/emitter';

const app = createApp(App);

useClickOutside(app);
useEmitter(app);

app.mount('#app');
