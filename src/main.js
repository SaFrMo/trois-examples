import { createApp } from 'vue'
import { TroisJSVuePlugin } from 'troisjs'//../trois-edge/src / plugin.js'
import App from './App.vue'

const app = createApp(App)
app.use(TroisJSVuePlugin);
app.mount('#app')
