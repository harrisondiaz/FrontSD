<template>
<px-header></px-header>
  <h2 class="text-center">Registrar Inscripción</h2>
  <div class="card text-bg-dark" id="formulario">
    <div class="card-body">
      <form @submit.prevent="createPost"  method="post">
      <label class="form-label">Codigo Materia:</label>
      <input class="form-control" id="cod_materia" v-model="formData.id_materia">
      <label class="form-label">Codigo Estudiante:</label>
      <input class="form-control" id="nombre_materia" v-model="formData.id_estudiante">

        <br>
      <button  class="btn btn-dark btn-outline-light" id="submito" >Registrar</button>
      </form>
    </div>
    <div id="empty"><br></div>
    <p class="text-success" v-if="msg">Se ha registrado la materia correctamente</p>
  </div>
</template>

<script>
import axios from 'axios'
import PxHeader from "@/components/PxHeader.vue";
export default {
  name: "assignature_register",
  components: {PxHeader},
  data () {
    return{
      msg : null,
      formData :{
        id_materia:'',
        id_estudiante: '',
        fecha_inscripcion : new Date().getFullYear()+'-'+new Date().getMonth()+'-'+new Date().getDay(),
      }
    }
  },
  async created() {

  },
  methods:{
      createPost(){
        // eslint-disable-next-line no-constant-condition
        if(this.formData.cod_materia !=='' && this.formData.cod_materia!== '') {
          axios.post('https://api-2.azurewebsites.net/inscripcion/registrar', this.formData)
              .then(response => console.log(response))
              .catch(error => console.log(error))
              this.formData.cod_materia = ''
              this.formData.cod_estudiante = ''
          document.getElementById("empty").innerHTML="<p class='text-success display-7 text-center'>Inscripcion Realizada</p>";
        }else{
          document.getElementById("empty").innerHTML="<p class='text-danger display-7 text-center'>Falta rellenar algun campo <br> Recuerde rellenar todos los campos</p>";

        }
      }
  }
}
</script>

<style scoped>
#formulario{
  width: 40%;
  margin-top:5%;
  margin-bottom:1%;
  margin-left: 30%;
}
#submito{
  margin-left: auto;
  margin-right: auto;
}
</style>