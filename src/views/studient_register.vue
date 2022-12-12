<template>
<px-header></px-header>
  <h2 class="text-center">Registrar Estudiante</h2>
  <div class="card text-bg-dark" id="formulario">
    <div class="card-body">
      <form @submit.prevent="createPost"  method="post">
      <label class="form-label">Codigo:</label>
      <input class="form-control" id="cod_estudiante" v-model="formData.id_estudiante" required>
      <label class="form-label">Nombre:</label>
      <input class="form-control" id="nombre_materia" v-model="formData.nombre_estudiante" required>
        <label class="form-label">Apellido:</label>
      <input class="form-control" id="nombre_materia" v-model="formData.apellido_estudiante" required>
      <label class="form-label">Foto:</label>
      <div class="input-group mb-3">
        <!--<label class="input-group-text" for="inputGroupFile01">Cargar</label>-->
        <input type="file" accept="image/*" class="form-control" >
      </div>
      <label class="form-label">Estado:</label>
      <select class ="form-select" v-model="formData.estado" >
        <option value=0 disabled>Seleccione una opción</option>
        <option value="A">Activo</option>
        <option value="R">Retirado</option>
      </select>
      <label class="form-label">Tipo Documento:</label>
      <select class="form-select" id="estado_materia" v-model="formData.tipo_documento" >
        <option value=0 disabled>Seleccione una opción....</option>
        <option value=1>Pasaporte</option>
        <option value=2>CC</option>
        <option value=3>TI</option>
      </select>
        <br>
      <button  class="btn btn-dark btn-outline-light" id="submito" >Registrar</button>
        <br>
        <br>
      <div id="empty"><br></div>
      </form>
    </div>
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

        id_estudiante: '',
        nombre_estudiante: '',
        apellido_estudiante: '',
        tipo_documento : 0,
        foto: '',
        estado: 0
      }
    }
  },
  async created() {

  },
  methods:{
      createPost(){
        // eslint-disable-next-line no-constant-condition
        if(this.formData.id_estudiante !=='' && this.formData.nombre_estudiante !== '' && this.formData.apellido_estudiante !== '' &&  this.formData.tipo_documento !== '' && this.formData.estado !== '') {
          axios.post(this.estudianteURL+'/estudiante/registrar', this.formData)
            .then(data => {
              console.log(data)
              this.formData.id_estudiante = ''
              this.formData.nombre_estudiante = ''
              this.formData.apellido_estudiante = ''
              this.formData.tipo_documento = ''
              this.formData.estado = ''
            })
              .catch( axios.post(this.baseURL+'/estudiante/registrar', this.formData)
                  .then(data => {
                    console.log(data)
                    this.formData.id_estudiante = ''
                    this.formData.nombre_estudiante = ''
                    this.formData.apellido_estudiante = ''
                    this.formData.tipo_documento = ''
                    this.formData.estado = ''
                  })
                  .catch(error => {
                    console.log(error)
                    document.getElementById("empty").innerHTML="<div class='alert alert-danger' role='alert'>" +
                        "Algun(a) estudiante ya tiene este codigo" +
                        "</div>"
                    document.getElementById("cod_estudiante").classList.add('is-invalid')
                  }))

          console.log(this.formData)
          //setInterval("location.reload()", 500);
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