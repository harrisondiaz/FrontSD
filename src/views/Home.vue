<script>
import PxHeader from "@/components/PxHeader.vue";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
  components: { PxHeader},
  data(){
    return{
    phrase : this.$name_user
    }
  },
  methods:{

  }
}
</script>

<template>
  <px-header></px-header>
  <h1 class="text-center ">Hola! {{phrase}}</h1>

  <p class="text-center fs-2">Bienvenido al Sistema de Informacion </p>
</template>
