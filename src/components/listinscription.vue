<template>
  <h1 class="text-center">Inscripciones</h1>
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
    <li><a class="dropdown-item" @click="definefilter('Cod Materia')">Cod Materia</a></li>
    <li><a class="dropdown-item" @click="definefilter('Nombre Materia')">Nombre Materia</a></li>
    <li><a class="dropdown-item" @click="definefilter('Fecha Inscripción')">Fecha Inscripción</a></li>
  </ul>
  <input class="form-control"  v-model="filterInput"><br>
</div>
  <br>
  <br>
  <table class="table table-dark table-bordered" >
    <thead>
    <tr>
      <th @click="sort('id_estudiante')" scope="col" style="user-select:none">Cod Estudiante  </th>
      <th @click="sort('nombre_estudiante')" scope="col" style="user-select:none">Nombre Estudiante  </th>
      <th @click="sort('id_materia')" scope="col" style="user-select:none"> Cod Materia  </th>
      <th @click="sort('nombre_materia')" scope="col" style="user-select:none"> Nombre Materia  </th>
      <th @click="sort('fecha_inscripcion')" scope="col" style="user-select:none">Fecha Inscripción  </th>
      <th scope="col">Eliminar  </th>
    </tr>
    </thead>
    <tbody>
    <tr v-show="filter(n)" v-for="n in sorted" :key="n.id_estudiante">
      <th scope="row">{{n.id_estudiante}}</th>
      <th scope="row">{{n.nombre_estudiante}}</th>
      <td>{{n.id_materia}}</td>
      <td>{{n.nombre_materia}}</td>
      <td>{{n.fecha_inscripcion}}</td>
      <td><button type="button" class="btn " data-bs-toggle="modal" data-bs-target="#modalremove" @click="save(n)"><img src="https://cdn-icons-png.flaticon.com/512/463/463612.png" style="width:30px;"></button></td>

    </tr>
    </tbody>
  </table>
  <p>
    <button class="btn btn-dark" @click="prevPage">Previous</button>
    &nbsp;
    <button class="btn btn-dark" @click="nextPage">Next</button>
  </p>
  <!-- Modal -->
  <div class="modal fade text-bg-dark" id="modalremove" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog text-bg-dark">
      <div class="modal-content text-bg-dark">
        <div class=" text-bg-dark">
          <h1 class="modal-title fs-5 text-center" id="exampleModalLabel">Confirmacion</h1>
        </div>
        <div class="modal-body text-bg-dark">
          <hr class="">
          <p class="text-center">¿Desea eliminar esta inscripción?</p>
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
      filterInput: '',
      filterType: 0,
      filterName: 'Filtro',
      formData:{
        id_estudiante:'',
        id_materia:''
      },
      currentSort: 'name',
      currentSortDir: 'asc',
      pageSize: 10,
      currentPage: 1
    }

  }
  ,created() {

    fetch(this.baseURL+"/inscripcion/listar")
        .then((response) => response.json())
        .then(data => (this.naming = data))
        .then(console.log(this.naming));

  },methods:{
      download(){
        const data = this.naming;
        const fileName = 'download';
        const exportType = exportXlsFile.types.xls
        console.log(data)
        exportXlsFile({data , fileName ,exportType})
      },detele() {
        console.log(this.baseURL+'/inscripcion/eliminar/' + this.formData.id_estudiante+'/'+this.formData.id_materia)
        axios.delete(this.baseURL+'/inscripcion/eliminar/' + this.formData.id_estudiante+'/'+this.formData.id_materia)
            .then(datum => console.log(datum))
        setInterval("location.reload()",500);
      },save(data){
        this.formData.id_materia = data.id_materia
        this.formData.id_estudiante = data.id_estudiante
      },filter(datum){
        console.log(datum+""+this.filterInput)
        if(this.filterType == 1){
          return datum.id_estudiante.toString().indexOf(this.filterInput.toString())
        }else if(this.filterType == 2){
          return datum.nombre_estudiante.toLocaleLowerCase().indexOf(this.filterInput.toLocaleLowerCase()) >=0
        }else if(this.filterType == 3){
          return datum.id_materia.toString().indexOf(this.filterInput.toString())
        }else if(this.filterType == 4){
          return datum.nombre_materia.toLocaleLowerCase().indexOf(this.filterInput.toLocaleLowerCase()) >=0
        }else if(this.filterType == 5){
          return datum.fecha_inscripcion.toLocaleLowerCase().indexOf(this.filterInput.toLocaleLowerCase()) >=0
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
      }else if(type == "Cod Materia"){
        this.filterType = 3
        this.filterName = type
      }else if(type == "Nombre Materia"){
        this.filterType = 4
        this.filterName = type
      }else{
        this.filterType = 5
        this.filterName = type
      }
    }, nextPage: function () {
      if ((this.currentPage * this.pageSize) < this.naming.length) this.currentPage++;
    },
    prevPage: function () {
      if (this.currentPage > 1) this.currentPage--;
    }, sort: function (s) {
      //if s == current sort, reverse
      if (s === this.currentSort) {
        this.currentSortDir = this.currentSortDir == 'asc' ? 'desc' : 'asc';
      }
      this.currentSort = s;
    }
  },computed:{
    sorted: function () {

      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return this.naming.sort((a, b) => {
        let modifier = 1;
        if (this.currentSortDir === 'desc') modifier = -1;
        if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
        if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
        return 0;
      }).filter((row, index) => {
        let start = (this.currentPage - 1) * this.pageSize;
        let end = this.currentPage * this.pageSize;
        if (index >= start && index < end) return true;
      });
    }
  }
}

</script>

<style scoped>

</style>