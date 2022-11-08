<template>
  <h1 class="text-center">Estudiantes</h1>
  <p class="form-label">Busqueda(Filtro)</p>
  <button class="btn btn-info position-absolute top-25 end-0" @click="download">Descargar Información</button>
  <input class="form-control form-control-sm" style="width: 30%" v-model="filterInput"><br>
  <br>
  <table class="table table-dark table-bordered" >
    <thead>
    <tr>
      <th scope="col">Cod Estudiante  </th>
      <th scope="col">Nombre   </th>
      <th scope="col">Apellidos  </th>
      <th scope="col">Tipo de documento  </th>
      <th scope="col">Estado  </th>
      <th scope="col">Foto  </th>
      <th scope="col">Modificar  </th>
    </tr>
    </thead>
    <tbody>
    <tr v-show="filter(n)"  v-for="n in naming" :key="n.cod_estudiante">
      <th scope="row">{{n.cod_estudiante}}</th>
      <td>{{n.nombre_estudiante}}</td>
      <td>{{n.apellido_estudiante}}</td>
      <td v-if="n.tipo_documento=='PASSPORT'">Pasaporte</td>
      <td v-else-if="n.tipo_documento=='CC'">CC</td>
      <td v-else>TI</td>
      <td v-if="n.estado=='A'">Activo(a)</td>
      <td v-else>Desactivo(a)</td>

      <!--      <td>{{n.estado_materia}}</td>-->
      <td v-if="n.foto!='' " ><img :src="n.foto" ></td>
      <!--<td><button class="btn" @click="detele({cod_materia: n.cod_materia})" id="btnremove"><img src="https://cdn-icons-png.flaticon.com/512/463/463612.png" style="width:30px;"></button></td>-->
      <td><button type="button" class="btn " data-bs-toggle="modal" data-bs-target="#exampleModal" @click="save(n)"><img src="https://cdn-icons-png.flaticon.com/512/420/420140.png" style="width:30px;"></button></td>
    </tr>
    </tbody>
  </table>
  <!-- Modal -->
  <div class="modal fade text-bg-dark" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog text-bg-dark">
      <div class="modal-content text-bg-dark">
        <div class=" text-bg-dark">
          <h1 class="modal-title fs-5 text-center" id="exampleModalLabel">Modificación</h1>
        </div>
        <div class="modal-body text-bg-dark">
          <div class="card text-bg-dark" id="formulario">
            <div class="card-body">
              <form @submit.prevent="createPost"  method="post">
                <label class="form-label">Codigo:</label>
                <input class="form-control" id="cod_materia" v-model="formData.cod_estudiante" disabled>
                <label class="form-label">Nombre:</label>
                <input class="form-control" id="nombre_materia" v-model="formData.nombre_estudiante">
                <label class="form-label">Apellido:</label>
                <input class="form-control" id="nombre_materia" v-model="formData.apellido_estudiante">
                <label class="form-label">Foto:</label>
                <input type="text" class="form-control" id="creditos" v-model="formData.foto">
                <label class="form-label">Estado:</label>
                <select class ="form-select" v-model="formData.estado">
                  <option selected>Seleccione una opción</option>
                  <option value="A">Activo</option>
                  <option value="R">Desactivo</option>
                </select>
                <label class="form-label">Tipo Documento:</label>
                <select class="form-select" id="estado_materia" v-model="formData.estado_materia">
                  <option selected>Seleccione una opción....</option>
                  <option value='1'>Pasaporte</option>
                  <option value='2'>CC</option>
                  <option value='3'>TI</option>
                </select>
                <br>
              </form>
            </div>
        </div>
        <div class="modal-footer text-bg-dark">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button type="button" class="btn btn-success" data-bs-dismiss="modal" @click="updata()">Actualizar</button>
          <div id="empty"></div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>



import axios from "axios";

export default {


  // eslint-disable-next-line vue/multi-word-component-names
  name: "listed",
  components: {},

  data(){
    return{
      naming : [],
      data: null,
      formData :{
        cod_estudiante:'',
        nombre_estudiante: '',
        apellido_estudiante: '',
        tipo_documento : '',
        foto: '',
        estado: ''
      },
      filterInput : ''
    }

  }
  ,created() {

    fetch("https://api-3-n.azurewebsites.net/estudiante/listar")
        .then((response) => response.json())
        .then(data => (this.naming = data))
        .then(console.log(this.naming));

  },methods:{
      updata() {
        console.log(this.data)
        console.log(this.formData)
        if(this.formData.cod_estudiante !=='' && this.formData.nombre_estudiante !== '' && this.formData.apellido_estudiante !== '' &&  this.formData.tipo_documento !== '' && this.formData.estado !== '') {
          axios.put('https://api-1.azurewebsites.net/materia/actualizar/' + this.data.cod_materia, this.formData)
              .then(data => console.log(data))
          //setInterval("location.reload()", 500);
        }else{
          document.getElementById("empty").innerHTML="<p class='text-danger display-7 text-center'>Falta rellenar algun campo <br> Recuerde rellenar todos los campos</p>";
        }
      },
      save(e){
        this.data = e
        this.formData.cod_estudiante = e.cod_estudiante;
        this.formData.nombre_estudiante = e.nombre_estudiante;
        this.formData.apellido_estudiante = e.apellido_estudiante;
        this.formData.tipo_documento = e.tipo_documento;
        this.formData.estado = e.estado;
      },
      filter(datum){
        console.log(datum+""+this.filterInput)
        return datum.nombre_estudiante.toLocaleLowerCase().indexOf(this.filterInput.toLocaleLowerCase()) >=0
      }

  }
}

</script>

<style scoped>

</style>