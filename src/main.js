import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

const app = createApp(App);

app.use(store).use(router).mount('#app');

app.config.globalProperties.$scrollToTop = () => window.scrollTo(0,0);

// TODO: Fix error 404 on refresh in production
// TODO: Form validations
// TODO: Fix width on desktop for Alert component
