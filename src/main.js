import { createApp } from 'vue'
import { TroisJSVuePlugin } from '../trois-edge/src/plugin.ts'
import App from './App.vue'

const app = createApp(App)
app.use(TroisJSVuePlugin);
app.mount('#app')
