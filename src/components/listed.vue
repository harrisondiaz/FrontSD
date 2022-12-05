<template>
  <h1 class="text-center">Materias</h1>
 <button class="download-button position-absolute top-25 end-0"   style="background-color: transparent">
    <div class="docs"><svg class="css-i6dzq1" stroke-linejoin="round" stroke-linecap="round" fill="none" stroke-width="2" stroke="currentColor" height="20" width="20" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line y2="13" x2="8" y1="13" x1="16"></line><line y2="17" x2="8" y1="17" x1="16"></line><polyline points="10 9 9 9 8 9"></polyline></svg> Docs</div>
    <div class="download" role="button" @click="download">
      <svg class="css-i6dzq1" stroke-linejoin="round" stroke-linecap="round" fill="none" stroke-width="2" stroke="currentColor" height="24" width="24" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line y2="3" x2="12" y1="15" x1="12"></line></svg>
    </div>
  </button>
  <div class="input-group  mb-3" style="width: 50%;">
    <button class="input-group-text btn btn-outline-secondary text-light">Busqueda({{filterName}})</button>
    <button type="button" class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split text-light " data-bs-toggle="dropdown" aria-expanded="false">
      <span class="visually-hidden">Toggle Dropdown</span>
    </button>
    <ul class="dropdown-menu dropdown-menu-dark">
      <li><a class="dropdown-item" @click="definefilter('Codigo Materia')">Cod Materia</a></li>
      <li><a class="dropdown-item" @click="definefilter('Nombre Materia')">Nombre Materia</a></li>
      <li><a class="dropdown-item" @click="definefilter('Creditos')">Creditos</a></li>
      <li><a class="dropdown-item" @click="definefilter('Cupos')">Cupos</a></li>

    </ul>
    <input class="form-control"  v-model="filterInput"><br>
  </div>

  <br>
  <br>
  <table class="table table-dark table-bordered" >
    <thead>
    <tr>
      <th @click="sort('id_materia')" scope="col" style="user-select:none">Cod Materia  </th>
      <th @click="sort('nombre_materia')" scope="col" style="user-select:none">Nombre Materia  </th>
      <th @click="sort('creditos')" scope="col" style="user-select:none">Creditos  </th>
      <th @click="sort('cupos')" scope="col" style="user-select:none">Cupos  </th>
      <th @click="sort('estado_materia')" scope="col" style="user-select:none">Estado  </th>
      <th scope="col">Opción</th>
    </tr>
    </thead>
    <tbody>
    <tr v-show="filter(n)" v-for="n in sorted" :key="n.cod_materia">
      <th scope="row">{{n.cod_materia}}</th>
      <td>{{n.nombre_materia}}</td>
      <td>{{n.creditos}}</td>
      <td>{{n.cupos}}</td>
<!--      <td>{{n.estado_materia}}</td>-->
      <td v-if="n.estado_materia==1">Activo</td>
      <td v-else>Deshabilitado</td>
      <td class=""  role="button" data-bs-toggle="dropdown" aria-expanded="false"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
      </svg>
        <ul class="dropdown-menu dropdown-menu-dark">
          <li><button type="button" class="btn dropdown-item" data-bs-toggle="modal" data-bs-target="#modalupdata" @click="save(n)"><img src="https://cdn-icons-png.flaticon.com/512/420/420140.png" style="width:30px;"> Actualizar</button></li>
          <li><button type="button" class="btn dropdown-item" data-bs-toggle="modal" data-bs-target="#modalrevome" @click="save(n)"><img src="https://cdn-icons-png.flaticon.com/512/463/463612.png" style="width:30px;"> Borrar</button></li>
        </ul>
      </td>
    </tr>
    </tbody>
  </table>
  <p>
    <button class="btn btn-dark" @click="prevPage">Previous</button>
    &nbsp;
    <button class="btn btn-dark" @click="nextPage">Next</button>
  </p>
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
                <input type="number" class="form-control" id="cod_materia" v-model="formData.id_materia">
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
 <div class="modal fade text-bg-dark" id="modalrevome" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog text-bg-dark">
      <div class="modal-content text-bg-dark">
        <div class=" text-bg-dark">
          <h1 class="modal-title fs-5 text-center" id="exampleModalLabel">Confirmacion</h1>
        </div>
        <div class="modal-body text-bg-dark">
          <hr class="">
          <p class="text-center">¿Desea eliminar esta materia?</p>
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
        cod_materia:'',
        id_materia: '',
        nombre_materia: '',
        creditos : '',
        cupos: '',
        estado_materia: ''
      },
      filterInput : '',
      filterType: 0,
      filterName: 'Filtro',
      currentSort: 'name',
      currentSortDir: 'asc',
      pageSize: 10,
      currentPage: 1
    }

  }
  ,created() {

    fetch(this.baseURL+"/materia/listar")
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
      },
      updata() {
        console.log(this.data)
        console.log(this.formData)
        this.formData.id_materia = this.formData.cod_materia;
        if(this.formData.cod_materia !=='' && this.formData.nombre_materia !== '' && this.formData.creditos !== 0 &&  this.formData.cupos !== 0 && this.formData.estado_materia !== '') {
          axios.put(this.baseURL+'/materia/actualizar/' + this.data.cod_materia, this.formData)
              .then(data => console.log(data))
              .catch(err => {
                console.log(err)
                document.getElementById("empty").innerHTML = "<div class=\"toast\" role=\"alert\" aria-live=\"assertive\" aria-atomic=\"true\">\n" +
                    "  <div class=\"toast-header\">\n" +
                    "    <img src=\"...\" class=\"rounded me-2\" alt=\"...\">\n" +
                    "    <strong class=\"me-auto\">Bootstrap</strong>\n" +
                    "    <small class=\"text-muted\">11 mins ago</small>\n" +
                    "    <button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"toast\" aria-label=\"Close\"></button>\n" +
                    "  </div>\n" +
                    "  <div class=\"toast-body\">\n" +
                    "    Ups! Ocurrio algo inesperado por favor aguarte estamos revisando" +
                    "  </div>\n" +
                    "</div>"
              })
              .finally(()=>{setInterval("location.reload()", 500); })
        }else{
          document.getElementById("empty").innerHTML="<p class='text-danger display-7 text-center'>Falta rellenar algun campo <br> Recuerde rellenar todos los campos</p>";
        }
      },
      save(e){
        this.data = e
        this.formData.cod_materia = e.cod_materia;
        this.formData.id_materia = e.id_materia;
        this.formData.nombre_materia = e.nombre_materia;
        this.formData.creditos = e.creditos;
        this.formData.cupos = e.cupos;
        this.formData.estado_materia = e.estado_materia;
      },
      filter(datum){
        if(this.filterType == 1){
          return datum.cod_materia.toString().indexOf(this.filterInput.toString()) >= 0;
        }else if(this.filterType == 2){
          return datum.nombre_materia.toLocaleLowerCase().indexOf(this.filterInput.toLocaleLowerCase()) >=0
        }else if(this.filterType == 3){
          return datum.creditos.toString().indexOf(this.filterInput.toString()) >= 0;
        }else if(this.filterType == 4){
          return datum.cupos.toString().indexOf(this.filterInput.toString()) >= 0;
        }else if(this.filterType == 5){
          return datum.estado.toLocaleLowerCase().indexOf(this.filterInput.toLocaleLowerCase()) >=0
        }else {
          return true
        }
      },definefilter(type) {
        if (type == "Codigo Materia") {
          this.filterType = 1
          this.filterName = type
        } else if (type == "Nombre Materia") {
          this.filterType = 2
          this.filterName = type
        } else if (type == "Creditos") {
          this.filterType = 3
          this.filterName = type
        } else if (type == "Cupos") {
          this.filterType = 4
          this.filterName = type
        } else if(type == "Estado") {
          this.filterType = 5
          this.filterName = type
        }else {
          this.filterType = 0
          this.filterName = "Filtro"
        }
      },
      detele() {
        axios.delete(this.baseURL+'/materia/eliminar/' + this.formData.cod_materia, this.formData.cod_materia)
            .then(datum => console.log(datum))
        setInterval("location.reload()",500);
      },nextPage: function () {
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

<style >
.download-button {
  position: relative;
  border-width: 0;
  color: white;
  font-size: 15px;
  font-weight: 600;
  border-radius: 4px;
  z-index: 1;
}

.download-button .docs {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  gap: 10px;
  min-height: 40px;
  padding: 0 10px;
  border-radius: 4px;
  z-index: 1;
  background-color: #242a35;
  border: solid 1px #e8e8e82d;
  -webkit-transition: all .5s cubic-bezier(0.77, 0, 0.175, 1);
  transition: all .5s cubic-bezier(0.77, 0, 0.175, 1);
}

.download-button:hover {
  -webkit-box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
}

.download {
  position: absolute;
  inset: 0;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  max-width: 90%;
  margin: 0 auto;
  z-index: -1;
  border-radius: 4px;
  -webkit-transform: translateY(0%);
  -ms-transform: translateY(0%);
  transform: translateY(0%);
  background-color: #01e056;
  border: solid 1px #01e0572d;
  -webkit-transition: all .5s cubic-bezier(0.77, 0, 0.175, 1);
  transition: all .5s cubic-bezier(0.77, 0, 0.175, 1);
}

.download-button:hover .download {
  -webkit-transform: translateY(100%);
  -ms-transform: translateY(100%);
  transform: translateY(100%)
}

.download svg polyline,.download svg line {
  -webkit-animation: docs 1s infinite;
  animation: docs 1s infinite;
}

@-webkit-keyframes docs {
  0% {
    -webkit-transform: translateY(0%);
    transform: translateY(0%);
  }

  50% {
    -webkit-transform: translateY(-15%);
    transform: translateY(-15%);
  }

  100% {
    -webkit-transform: translateY(0%);
    transform: translateY(0%);
  }
}

@keyframes docs {
  0% {
    -webkit-transform: translateY(0%);
    transform: translateY(0%);
  }

  50% {
    -webkit-transform: translateY(-15%);
    transform: translateY(-15%);
  }

  100% {
    -webkit-transform: translateY(0%);
    transform: translateY(0%);
  }
}
.btnmore {
  width: 150px;
  height: 50px;
  border-radius: 5px;
  border: none;
  -webkit-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
  font-size: 20px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-weight: 600;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  background: #040f16;
  color: #f5f5f5;
}

.btnmore:hover {
  -webkit-box-shadow: 0 0 20px 0px #2e2e2e3a;
  box-shadow: 0 0 20px 0px #2e2e2e3a;
}

.btnmore .icon {
  position: absolute;
  height: 40px;
  width: 70px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-transition: all 0.5s;
  transition: all 0.5s;
}

.btnmore .text {
  -webkit-transform: translateX(55px);
  -ms-transform: translateX(55px);
  transform: translateX(55px);
}

.btnmore:hover .icon {
  width: 175px;
}

.btnmore:hover .text {
  -webkit-transition: all 0.5s;
  transition: all 0.5s;
  opacity: 0;
}

.btnmore:focus {
  outline: none;
}

.btnmore:active .icon {
  -webkit-transform: scale(0.85);
  -ms-transform: scale(0.85);
  transform: scale(0.85);
}
</style>