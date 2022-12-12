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
            estudianteURL: 'https://estudiantes-production.up.railway.app',
            materiaURL: 'https://materias-production.up.railway.app',
            inscriptionURL: 'https://inscripciones-production.up.railway.app',
            loginURL: 'https://ususario-production.up.railway.app',
            baseURL : 'https://back-end-sd-production.up.railway.app'
        }
    }
}
createApp(App).use(router).mixin(Endpoint).mount('#app')
