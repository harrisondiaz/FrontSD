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
            baseURL : 'http://192.168.1.6:5000'
        }
    }
}
createApp(App).use(router).mixin(Endpoint).mount('#app')
