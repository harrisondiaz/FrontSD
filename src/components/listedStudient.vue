<template>
  <h1 class="text-center">Estudiantes</h1>
  <button class="download-button position-absolute top-25 end-0"   style="background-color: transparent">
    <div class="docs"><svg class="css-i6dzq1" stroke-linejoin="round" stroke-linecap="round" fill="none" stroke-width="2" stroke="currentColor" height="20" width="20" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line y2="13" x2="8" y1="13" x1="16"></line><line y2="17" x2="8" y1="17" x1="16"></line><polyline points="10 9 9 9 8 9"></polyline></svg> Docs</div>
    <div class="download" role="button" @click="download">
      <svg class="css-i6dzq1" stroke-linejoin="round" stroke-linecap="round" fill="none" stroke-width="2" stroke="currentColor" height="24" width="24" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line y2="3" x2="12" y1="15" x1="12"></line></svg>
    </div>
  </button><div class="input-group  mb-3" style="width: 50%;">
    <button class="input-group-text btn btn-outline-secondary text-light">Busqueda({{filterName}})</button>
    <button type="button" class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split text-light " data-bs-toggle="dropdown" aria-expanded="false">
    <span class="visually-hidden">Toggle Dropdown</span>
  </button>
  <ul class="dropdown-menu dropdown-menu-dark">
    <li><a class="dropdown-item" @click="definefilter('Codigo Estudiante')">Codigo Estudiante</a></li>
    <li><a class="dropdown-item" @click="definefilter('Nombre Estudiante')">Nombre Estudiante</a></li>
    <li><a class="dropdown-item" @click="definefilter('Apellido Estudiante')">Apellido Estudiante</a></li>
    <li><a class="dropdown-item" @click="definefilter('Tipo de Documento')">Tipo de Documento</a></li>
    <li><a class="dropdown-item" @click="definefilter('Estado')">Estado</a></li>
  </ul>
    <input class="form-control"  v-model="filterInput"><br>
  </div>
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
      <th scope="col">Opción</th>
    </tr>
    </thead>
    <tbody>
    <tr v-show="filter(n)"  v-for="n in naming" :key="n.id_estudiante">
      <th scope="row">{{n.id_estudiante}}</th>
      <td>{{n.nombre_estudiante}}</td>
      <td>{{n.apellido_estudiante}}</td>
      <td v-if="n.tipo_documento=='PASSPORT'">Pasaporte</td>
      <td v-else-if="n.tipo_documento=='CC'">CC</td>
      <td v-else>TI</td>
      <td v-if="n.estado=='A'">Activo(a)</td>
      <td v-else-if="n.estado=='E'">Eliminado(a)</td>
      <td v-else>Retirado</td>

<!--      <td>{{n.estado_materia}}</td>-->

      <td><img src="https://comunidadvalorant.es/wp-content/uploads/2021/04/guia-killjoy-valorant.jpg" style="width: 10px;height: 10%"></td>
      <td class=""  role="button" data-bs-toggle="dropdown" aria-expanded="false"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
</svg>
        <ul class="dropdown-menu dropdown-menu-dark">
            <li><button type="button" class="btn dropdown-item" data-bs-toggle="modal" data-bs-target="#modalupdata" @click="save(n)"><img src="https://cdn-icons-png.flaticon.com/512/420/420140.png" style="width:30px;"> Actualizar</button></li>
            <li><button type="button" class="btn dropdown-item" data-bs-toggle="modal" data-bs-target="#modalremove" @click="save(n)"><img src="https://cdn-icons-png.flaticon.com/512/463/463612.png" style="width:30px;"> Borrar</button></li>
          </ul>
        </td>
    </tr>
    </tbody>
  </table>

  <!-- Modal -->
  <div class="modal fade text-bg-dark" id="modalupdata" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                <input class="form-control" id="cod_materia" v-model="formData.id_estudiante" disabled>
                <label class="form-label">Nombre:</label>
                <input class="form-control" id="nombre_materia" v-model="formData.nombre_estudiante">
                <label class="form-label">Apellido:</label>
                <input class="form-control" id="nombre_materia" v-model="formData.apellido_estudiante">
                <label class="form-label">Foto:</label>
                <input type="text" class="form-control" id="creditos" v-model="formData.foto">
                <label class="form-label">Estado:</label>
                <select class ="form-select" v-model="formData.estado">
                  <option selected>Seleccione una opción</option>
                  <option value="A">Activo(a)</option>
                  <option value="E" disabled>Eliminado(a)</option>
                  <option value="R">Retirado(a)</option>
                </select>
                <label class="form-label">Tipo Documento:</label>
                <select class="form-select" id="estado_materia" v-model="formData.tipo_documento">
                  <option selected>Seleccione una opción....</option>
                  <option value="PASSPORT">Pasaporte</option>
                  <option value='TI'>TI</option>
                  <option value='CC'>CC</option>
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
   <!-- Modal -->
   <div class="modal fade text-bg-dark" id="modalremove" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog text-bg-dark">
      <div class="modal-content text-bg-dark">
        <div class=" text-bg-dark">
          <h1 class="modal-title fs-5 text-center" id="exampleModalLabel">Confirmacion</h1>
        </div>
        <div class="modal-body text-bg-dark">
          <hr class="">
          <p class="text-center">¿Desea eliminar este estudiante?</p>
        </div>
        <div class="modal-footer text-bg-dark">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="detele()">Confirmar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


 import exportXlsFile from 'export-from-json'
 import axios from "axios";

export default {


  // eslint-disable-next-line vue/multi-word-component-names
  name: "listed",
  data(){
    return{
      naming : [],
      data: null,
      formData :{
        id_estudiante:'',
        nombre_estudiante: '',
        apellido_estudiante: '',
        tipo_documento : 0,
        foto: '',
        estado: ''
      },
      filterInput : '',
      filterType: 0,
      filterName: 'Filtro'
    }

  }
  ,created() {

    fetch(this.baseURL+"/estudiante/listar")
        .then((response) => response.json())
        .then(data => (this.naming = data))


    for (const data in this.naming) {
      console.log(data.toLocaleLowerCase())
    }

  },methods:{
      download(){
        const data = this.naming;
        const fileName = 'download';
        const exportType = exportXlsFile.types.xls
        console.log(data)
        exportXlsFile({data , fileName ,exportType})
      },
      updata() {
        console.log(this.data)
        console.log(this.formData)
        this.formData.foto = null
        if(this.formData.tipo_documento=='PASSAPORT'){
          this.formData.tipo_documento=1
        }else if(this.formData.tipo_documento=='CC'){
          this.formData.tipo_documento= 3
        }else {
          this.formData.tipo_documento= 2
        }
        if(this.formData.id_estudiante !=='' && this.formData.nombre_estudiante !== '' && this.formData.apellido_estudiante !== '' &&  this.formData.tipo_documento !== '' && this.formData.estado !== '') {
          axios.put(this.baseURL+'/estudiante/actualizar/' + this.data.id_estudiante, this.formData)
              .then(data => console.log(data))
          setInterval("location.reload()", 500);
        }else{
          document.getElementById("empty").innerHTML="<p class='text-danger display-7 text-center'>Falta rellenar algun campo <br> Recuerde rellenar todos los campos</p>";
        }
      },detele() {
        console.log(this.data)
        console.log(this.data.id_estudiante)
        console.log(this.baseURL+'/estudiante/eliminar/' + this.data.id_estudiante)
        axios.delete(this.baseURL+'/estudiante/eliminar/' + this.data.id_estudiante)
            .then(datum => console.log(datum))
        setInterval("location.reload()",500);
      },
      save(e){
        this.data = e
        this.formData.id_estudiante = e.id_estudiante;
        this.formData.nombre_estudiante = e.nombre_estudiante;
        this.formData.apellido_estudiante = e.apellido_estudiante;
        this.formData.tipo_documento = e.tipo_documento;
        this.formData.estado = e.estado;
        console.log(this.formData)
      },
      filter(datum){
        console.log(datum+""+this.filterInput)
        if(this.filterType == 1){
            return datum.id_estudiante.toString().indexOf(this.filterInput.toString())
        }else if(this.filterType == 2){
          return datum.nombre_estudiante.toLocaleLowerCase().indexOf(this.filterInput.toLocaleLowerCase()) >=0
        }else if(this.filterType == 3){
          return datum.apellido_estudiante.toLocaleLowerCase().indexOf(this.filterInput.toLocaleLowerCase()) >=0
        }else if(this.filterType == 4){
          return datum.tipo_documento.toLocaleLowerCase().indexOf(this.filterInput.toLocaleLowerCase()) >=0
        }else if(this.filterType == 5){
          return datum.estado.toLocaleLowerCase().indexOf(this.filterInput.toLocaleLowerCase()) >=0
        }else {
          return true;
        }
      },definefilter(type){
        if(type == "Codigo Estudiante"){
            this.filterType = 1
            this.filterName = type
          }else if(type == "Nombre Estudiante"){
            this.filterType = 2
            this.filterName = type
          }else if(type == "Apellido Estudiante"){
            this.filterType = 3
            this.filterName = type
          }else if(type == "Tipo de Documento"){
            this.filterType = 4
            this.filterName = type
          }else{
            this.filterType = 5
            this.filterName = type
        }
      }
      
  }
}

</script>

<style scoped>

</style>