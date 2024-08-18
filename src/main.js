import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { useEmitter } from './plugins/emitter';

const app = createApp(App);

useEmitter(app);

app.mount('#app');
