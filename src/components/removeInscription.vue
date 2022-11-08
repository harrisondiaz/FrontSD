<template>
  <h1 class="text-center">Inscripciones</h1>
  <p class="form-label">Busqueda(Filtro)</p>
  <button class="btn btn-info position-absolute top-25 end-0" @click="download">Descargar Información</button>
  <input class="form-control form-control-sm" style="width: 30%" v-model="filterInput">
  <br>
  <br>
  <table class="table table-dark table-bordered" >
    <thead>
    <tr>
      <th scope="col">Cod.estudiante  </th>
      <th scope="col">Nombre del estudiante  </th>
      <th scope="col"> Cod. materia  </th>
      <th scope="col"> Nombre de la materia  </th>
      <th scope="col">Fecha de  la inscripción  </th>
      <th scope="col">Eliminar  </th>
    </tr>
    </thead>
    <tbody>
    <tr v-show="filter(n)" v-for="n in naming" :key="n.id_estudiante">
      <th scope="row">{{n.id_estudiante}}</th>
      <th scope="row">{{n.nombre_estudiante}}</th>
      <td>{{n.id_materia}}</td>
      <td>{{n.nombre_materia}}</td>
      <td>{{n.fecha_inscripcion}}</td>
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
          <p class="text-center">¿Desea eliminar esta inscripción?</p>
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



import axios from "axios";

export default {


  // eslint-disable-next-line vue/multi-word-component-names
  name: "listed",
  data(){
    return{
      naming : [],
      data: null,
      filterInput: ''
    }

  }
  ,created() {
    console.log('Aqui entro')
    fetch("https://api-2.azurewebsites.net/inscripcion/listar")
        .then((response) => response.json())
        .then(data => (this.naming = data))
        .then(console.log(this.naming));



  },methods:{
      detele(e) {
        axios.delete('https://api-2.azurewebsites.net/inscripcion/eliminar/' + e.id_estudiante+'/'+e.id_materia)
            .then(datum => console.log(datum))
        setInterval("location.reload()",500);
      },
      save(e){
        this.data = e
      },filter(datum){
      console.log(datum+""+this.filterInput)
      return datum.nombre_estudiante.toLocaleLowerCase().indexOf(this.filterInput.toLocaleLowerCase()) >=0
    }

  }
}

</script>

<style scoped>

</style>