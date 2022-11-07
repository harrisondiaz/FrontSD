<template>
  <h1 class="text-center">Materias</h1>
  <div class="col-auto">
  <p class="form-label">Busqueda(Filtro)</p>
  <input class="form-control form-control-sm" style="width: 30%" v-model="filterInput">
  </div>
  <br>
  <table class="table table-dark table-bordered" >
    <thead>
    <tr>
      <th scope="col">Cod.Materia  </th>
      <th scope="col">Nombre Materia  </th>
      <th scope="col">Creditos  </th>
      <th scope="col">Cupos  </th>
      <th scope="col">Estado  </th>
      <th scope="col">Eliminar  </th>
    </tr>
    </thead>
    <tbody>
    <tr v-show="filter(n)"  v-for="n in naming"  :key="n.cod_materia">
      <th scope="row">{{n.cod_materia}}</th>
      <td>{{n.nombre_materia}}</td>
      <td>{{n.creditos}}</td>
      <td>{{n.cupos}}</td>
<!--      <td>{{n.estado_materia}}</td>-->
      <td v-if="n.estado_materia='true'">Activo</td>
      <td v-else>Deshabilitado</td>
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
      }

  }
}

</script>

<style scoped>

</style>