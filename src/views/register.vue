

<template>

  <div class="container-fluid" id="log">
    <div>

    <img class="back size position-relative start-25 withbackgound" src="/trafico-web.png">
    <h1 >Registro</h1>

        <form class="formContent" @submit.prevent="this.register">
          <div class="border border-warning text-center">
            <div class="margen">
              <p class="form-label text-start">Usuario</p>
              <input class="form-control" v-model="formLogIn.nombre_usuario">
              <br>
              <p class="form-label text-start">Contraseña</p>
              <input type="password" class="form-control" v-model="formLogIn.password">
              <br>
              <button type="submit" class="btn btn-outline-light">Registro</button>
              <br>
              <br>
        <div class="alert alert-danger" role="alert" v-if="error">
          {{error_msg}}
        </div>
              <div class="alert alert-success" role="alert" v-if="ready">
                {{ready_msg}}
              </div>
        <router-link to="/"><a>¿Estas Registrado? Inicia sesión</a></router-link>
      </div>
    </div>
        </form>
    </div>
  </div>
</template>

<style scoped>
  .margen{
    margin: 5%;
  }
  .back{
    background-color: white;
  }
  .size{
    width: 25%;
  }
  .start-25{
    margin-left: 35%;
  }
  .withbackgound{
    background-color: transparent;
  }
  #log {
    max-width: 50%;
    margin: 0 auto;
    padding: 2rem;

    font-weight: normal;
  }

  a,
  .green {
    text-decoration: none;
    color: hsla(160, 100%, 37%, 1);
    transition: 0.4s;
  }

  @media (hover: hover) {
    a:hover {
      background-color: hsla(160, 100%, 37%, 0.2);
    }
  }

  @media (min-width: 1024px) {
    body {
      display: flex;
      place-items: center;
    }

  }
</style>
<script>

import axios from "axios";

//import IconLaptop from '../components/icons/IconLaptop.vue'
// eslint-disable-next-line vue/no-export-in-script-setup
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name : "login",
  data() {
    return{
      formLogIn:{
        id_usuario : 0,
        nombre_usuario: '',
        password: ''
      },
      error : false,
      ready: false,
      ready_msg: '',
      error_msg : '',
      naming:[]
    }
  },
  methods:{
    register(){
            if(this.formLogIn.nombre_usuario != '' && this.formLogIn.password != ''){
              axios.post('https://api-1.azurewebsites.net/registrar', this.formLogIn)
                .then( datum =>{
              console.log(datum)

               })
              this.formLogIn.nombre_usuario = ''
              this.formLogIn.password = ''
              this.error = false
              this.ready = true
              this.ready_msg = '¡Usuario registrado! :3'
          }else {
              this.ready = false
              this.error = true
              this.error_msg = "Los campos no pueden ser vacios"
            }
    }
  }
}

</script>
