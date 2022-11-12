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
      <th scope="col">Opción</th>
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
      <td v-else-if="n.estado=='E'">Eliminado(a)</td>
      <td v-else>Retirado</td>

<!--      <td>{{n.estado_materia}}</td>-->
      <td v-if="n.foto!='' " ><img :src="n.foto" ></td>
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

export default {


  // eslint-disable-next-line vue/multi-word-component-names
  name: "listed",
  data(){
    return{
      naming : [],
      data: null,
      formData :{
        cod_estudiante:'',
        nombre_estudiante: '',
        apellido_estudiante: '',
        tipo_documento : 0,
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
        if(this.formData.cod_estudiante !=='' && this.formData.nombre_estudiante !== '' && this.formData.apellido_estudiante !== '' &&  this.formData.tipo_documento !== '' && this.formData.estado !== '') {
          axios.put('https://api-3-n.azurewebsites.net/estudiante/actualizar/' + this.data.cod_estudiante, this.formData)
              .then(data => console.log(data))
          setInterval("location.reload()", 500);
        }else{
          document.getElementById("empty").innerHTML="<p class='text-danger display-7 text-center'>Falta rellenar algun campo <br> Recuerde rellenar todos los campos</p>";
        }
      },detele() {
        console.log(this.data)
        console.log(this.data.cod_estudiante)
        console.log('https://api-3-n.azurewebsites.net/estudiante/eliminar/' + this.data.cod_estudiante)
        axios.delete('https://api-3-n.azurewebsites.net/estudiante/eliminar/' + this.data.cod_estudiante)
            .then(datum => console.log(datum))
        setInterval("location.reload()",500);
      },
      save(e){
        this.data = e
        this.formData.cod_estudiante = e.cod_estudiante;
        this.formData.nombre_estudiante = e.nombre_estudiante;
        this.formData.apellido_estudiante = e.apellido_estudiante;
        this.formData.tipo_documento = e.tipo_documento;
        this.formData.estado = e.estado;
        console.log(this.formData)
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