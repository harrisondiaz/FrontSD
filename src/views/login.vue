<script>

import BTN from '../components/BTN.vue'
//import IconLaptop from '../components/icons/IconLaptop.vue'
// eslint-disable-next-line vue/no-export-in-script-setup
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name : "login"
}

</script>

<template>

  <div class="container-fluid" id="log">
    <div>

    <img class="back size position-relative start-25 withbackgound" src="/trafico-web.png">
    <h1 >Inicio de sesión</h1>
    <div class="border border-warning">
      <div class="margen">
      <p class="form-label ">Usuario</p>
      <input class="form-control" >
      <br>
      <p class="form-label">Contraseña</p>
      <input type="password" class="form-control">
      <br>
      <router-link v-bind:to="'/assigature'"><b-t-n class="position-relative" phrase="Acceder"></b-t-n></router-link>
      </div>
    </div>
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
    max-width: 1280px;
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

    #log {
      display: grid;
      grid-template-columns: 1fr 1fr;
      padding: 0 2rem;
    }
  }
</style>
