<template>
<px-header></px-header>
  <h2 class="text-center">Registrar Materia</h2>
  <div class="card text-bg-dark" id="formulario">
    <div class="card-body">
      <form @submit.prevent="createPost"  method="post">
      <label class="form-label">Codigo:</label>
      <input class="form-control" id="cod_materia" v-model="formData.cod_materia">
      <label class="form-label">Nombre:</label>
      <input class="form-control" id="nombre_materia" v-model="formData.nombre_materia">
      <label class="form-label">Creditos:</label>
      <input type="number" class="form-control" id="creditos" v-model="formData.creditos">
      <label class="form-label">Cupos:</label>
      <input type="number" class="form-control" id="cupos" v-model="formData.cupos">
      <label class="form-label">Estado:</label>
      <select class="form-select" id="estado_materia" v-model="formData.estado_materia">
        <option selected>Seleccione una opción....</option>
        <option value=true>Activo</option>
        <option value=false>Desactivo</option>
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
      msg : null,
      formData :{
        cod_materia:'',
        id_materia: this.cod_materia,
        nombre_materia: '',
        creditos : '',
        cupos: '',
        estado_materia: ''
      }
    }
  },
  async created() {

  },
  methods:{
      createPost(){
        // eslint-disable-next-line no-constant-condition
        this.formData.id_materia = this.formData.cod_materia
        console.log(this.formData)

        if(this.formData.cod_materia !=='' && this.formData.nombre_materia !== '' && this.formData.creditos !== '' &&  this.formData.cupos !== '' && this.formData.estado_materia !== '') {
          axios.post(this.baseURL+'/materia/registrar', this.formData)
              .then(response => console.log(response))
              .catch(error => console.log(error));
             this.formData.cod_materia = ''
              this.formData.nombre_materia = ''
              this.formData.creditos = ''
              this.formData.cupos = ''
              this.formData.estado_materia = ''
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