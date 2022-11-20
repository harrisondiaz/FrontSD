

<template>

  <div class="container-fluid" id="log">
    <div>

    <img class="back size position-relative start-25 withbackgound" src="/trafico-web.png">
    <h1 >Inicio de sesión</h1>

        <form class="formContent" @submit.prevent="this.logIn">
    <div class="border border-warning text-center">
      <div class="margen">
          <p class="form-label text-start">Usuario</p>
          <input class="form-control" v-model="formLogIn.nombre_usuario">
          <br>
          <p class="form-label text-start">Contraseña</p>
          <input type="password" class="form-control" v-model="formLogIn.password">
          <br>
        <button type="submit" class="btn btn-outline-light">Acceder</button>
        <br>
        <br>
        <div class="alert alert-danger" role="alert" v-if="error">
          {{error_msg}}
        </div>
        <router-link to="/register"><a>¿No estas Registrado?</a></router-link>
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
      nombre_usuario: '',
      password: ''},
      error : false,
      error_msg : '',
      naming:[]
    }
  },
  methods:{
    logIn(){
      axios.post(this.baseURL+'/login', this.formLogIn)
          .then( datum =>{
            console.log(this.formLogIn)
            console.log(datum)
            if(datum.data.msg == "Usuario fue encontrado con exito"){
              //localStorage.token = datum.token;
              console.log(datum.data.getToken)
              this.$name_user = this.formLogIn.nombre_usuario
              this.$router.push("/assigature");
              this.$name_user = this.formLogIn.nombre_usuario
            }else{
              this.error = true;
              this.error_msg = "No hemos podido encontrarte :c";
            }
          })

      /*fetch("https://api-1.azurewebsites.net/login")
          .then((response) => response.json())
          .then(data => (this.naming = data))
          .then(console.log(this.naming));*/

    }
  }
}

</script>
