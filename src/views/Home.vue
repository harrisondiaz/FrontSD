<script>
import PxHeader from "@/components/PxHeader.vue";
import Infinitesimal from "@/components/infinityscrool.vue";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
  components: {Infinitesimal, PxHeader},
  props:{
    First_name : String
  }
}
</script>

<template>
  <px-header></px-header>
  <h1 class="text-center ">Hola! {{First_name}}</h1>
  <infinitesimal></infinitesimal>
  <p class="text-center fs-2">Bienvenido al Sistema de Informacion </p>
</template>
