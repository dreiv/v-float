import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { floatingPlugin } from './components/floating'
import './assets/styles/layers.css'
import './assets/styles/tokens.css'
import './assets/styles/base.css'
import './assets/styles/surfaces.css'
import './assets/styles/controls.css'
import './assets/styles/playground.css'
import './assets/styles/demo.css'
import './assets/styles/floating/index.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(floatingPlugin)

app.mount('#app')
