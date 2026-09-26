import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { floatingPlugin } from './components/floating'
import './assets/styles/floating/index.css'
import './assets/styles/playground.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(floatingPlugin)

app.mount('#app')
