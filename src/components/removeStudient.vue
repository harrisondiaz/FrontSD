<template>
  <h1 class="text-center">Estudiantes</h1>
  <p class="form-label">Busqueda(Filtro)</p>
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
      <th scope="col">Eliminar  </th>
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
      <td v-else>Desactivo(a)</td>

      <!--      <td>{{n.estado_materia}}</td>-->
      <td v-if="n.foto!='' " ><img :src="n.foto" ></td>
      <!--<td><button class="btn" @click="detele({cod_materia: n.cod_materia})" id="btnremove"><img src="https://cdn-icons-png.flaticon.com/512/463/463612.png" style="width:30px;"></button></td>-->
      <td><button type="button" class="btn " data-bs-toggle="modal" data-bs-target="#exampleModal" @click="save(n)"><img src="https://cdn-icons-png.flaticon.com/512/463/463612.png" style="width:30px;"></button></td>
    </tr>
    </tbody>
  </table>
  <!-- Modal -->
  <div class="modal fade text-bg-dark" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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



import axios from "axios";

export default {


  // eslint-disable-next-line vue/multi-word-component-names
  name: "listed",
  data(){
    return{
      naming : [],
      data: null,
      filterInput:''
    }

  }
  ,created() {

    fetch("https://api-3-n.azurewebsites.net/estudiante/listar")
        .then((response) => response.json())
        .then(data => (this.naming = data))
        .then(console.log(this.naming));

  },methods:{
      detele() {
        console.log(this.data)
        console.log(this.data.cod_estudiante)
        console.log('https://api-3-n.azurewebsites.net/estudiante/eliminar/' + this.data.cod_estudiante)
        axios.delete('https://api-3-n.azurewebsites.net/estudiante/eliminar/' + this.data.cod_estudiante)
            .then(datum => console.log(datum))
        //setInterval("location.reload()",500);
      },
      save(e){
        this.data = e
      }, filter(datum){
      console.log(datum+""+this.filterInput)
      return datum.nombre_estudiante.toLocaleLowerCase().indexOf(this.filterInput.toLocaleLowerCase()) >=0
    }

  }
}

</script>

<style scoped>

</style>