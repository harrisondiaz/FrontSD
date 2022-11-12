<template>
<px-header></px-header>
  <h2 class="text-center">Registrar Inscripción</h2>
  <div class="card text-bg-dark" id="formulario">
    <div class="card-body">
      <form @submit.prevent="createPost"  method="post">
      <label class="form-label">Materia:</label>
      <select class="form-select" id="cod_materia" v-model="formData.id_materia">
        
        <option @value="n.cod_materia" v-for="n in assignature">{{n.cod_materia}} - {{n.nombre_materia}}</option>
      </select>
      <label class="form-label">Codigo Estudiante:</label>
      <select class="form-select" id="cod_materia" v-model="formData.id_estudiante">
        
        <option @value="n.cod_materia" v-for="n in studient">{{n.cod_estudiante}} - {{n.nombre_estudiante}}</option>
      </select>

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
      assignature : [],
      studient: [],
      msg : null,
      formData :{
        id_materia: 0,
        id_estudiante: 0,
        fecha_inscripcion : new Date().getFullYear()+'-'+new Date().getMonth()+'-'+new Date().getDay(),
      }
    }
  },
  created() {
    fetch("https://api-1.azurewebsites.net/materia/listar")
        .then((response) => response.json())
        .then(data => (this.assignature = data))
        .then(console.log(this.assignature));
        fetch("https://api-3-n.azurewebsites.net/estudiante/listar")
        .then((response) => response.json())
        .then(data => (this.studient = data))
        .then(console.log(this.studient));
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