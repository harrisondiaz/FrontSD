import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/main.css'
import './assets/main.css'

const Endpoint = {
    data(){
        return {
            authorized : false,
            name_user : '',
            baseURL : 'https://back-end-sd-production.up.railway.app'
        }
    }
}
createApp(App).use(router).mixin(Endpoint).mount('#app')
