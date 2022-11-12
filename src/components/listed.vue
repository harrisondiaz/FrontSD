<template>
  <h1 class="text-center">Materias</h1>
  <div class="col-auto">
  <p class="form-label">Busqueda(Filtro)</p>
  <button class="btn btn-info position-absolute top-25 end-0" @click="download">Descargar Información  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cloud-download " viewBox="0 0 16 16">
  <path d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z"/>
  <path d="M7.646 15.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 14.293V5.5a.5.5 0 0 0-1 0v8.793l-2.146-2.147a.5.5 0 0 0-.708.708l3 3z"/>
</svg></button>
  <input class="form-control form-control-sm" style="width: 30%" v-model="filterInput">
  </div>
  <br>
  <br>
  <table class="table table-dark table-bordered" >
    <thead>
    <tr>
      <th scope="col">Cod.Materia  </th>
      <th scope="col">Nombre Materia  </th>
      <th scope="col">Creditos  </th>
      <th scope="col">Cupos  </th>
      <th scope="col">Estado  </th>
      <th scope="col">Opción</th>
    </tr>
    </thead>
    <tbody>
    <tr v-show="filter(n)" v-for="n in naming" :key="n.cod_materia">
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
                <input type="number" class="form-control" id="cod_materia" v-model="formData.cod_materia">
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
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="detele({cod_materia: data.cod_materia})">Confirmar</button>
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
        cod_materia:'',
        nombre_materia: '',
        creditos : '',
        cupos: '',
        estado_materia: ''
      },
      filterInput : ''
    }

  }
  ,created() {

    fetch("https://api-1.azurewebsites.net/materia/listar")
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
        if(this.formData.cod_materia !=='' ,this.formData.nombre_materia != '' , this.formData.creditos != 0 ,  this.formData.cupos != 0 , this.formData.estado_materia != '') {
          axios.put('https://api-1.azurewebsites.net/materia/actualizar/' + this.data.cod_materia, this.formData)
              .then(data => console.log(data))
          setInterval("location.reload()", 500);
        }else{
          document.getElementById("empty").innerHTML="<p class='text-danger display-7 text-center'>Falta rellenar algun campo <br> Recuerde rellenar todos los campos</p>";
        }
      },
      save(e){
        this.data = e
        this.formData.cod_materia = e.cod_materia;
        this.formData.nombre_materia = e.nombre_materia;
        this.formData.creditos = e.creditos;
        this.formData.cupos = e.cupos;
        this.formData.estado_materia = e.estado_materia;
      },
      filter(datum){
        console.log(datum+""+this.filterInput)
        return datum.nombre_materia.toLocaleLowerCase().indexOf(this.filterInput.toLocaleLowerCase()) >=0
      },
      detele(e) {
        axios.delete('https://api-1.azurewebsites.net/materia/eliminar/' + e.cod_materia, e.cod_materia)
            .then(datum => console.log(datum))
        setInterval("location.reload()",500);
      }
      
  }
}

</script>

<style scoped>

</style>