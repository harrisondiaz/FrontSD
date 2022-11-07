<template>
  <h1 class="text-center">Materias</h1>

  <table class="table table-dark table-bordered" >
    <thead>
    <tr>
      <th scope="col">Cod.Materia  </th>
      <th scope="col">Nombre Materia  </th>
      <th scope="col">Creditos  </th>
      <th scope="col">Cupos  </th>
      <th scope="col">Estado  </th>
    </tr>
    </thead>
    <tbody>
    <tr  v-for="n in naming" :key="n.cod_materia">
      <th scope="row">{{n.cod_materia}}</th>
      <td>{{n.nombre_materia}}</td>
      <td>{{n.creditos}}</td>
      <td>{{n.cupos}}</td>
<!--      <td>{{n.estado_materia}}</td>-->
      <td v-if="n.estado_materia='true'">Activo</td>
      <td v-else>Deshabilitado</td>
      <td><button class="btn" @click="detele({cod_materia: n.cod_materia})"><img src="https://cdn-icons-png.flaticon.com/512/463/463612.png" style="width:30px;"></button></td>
    </tr>
    </tbody>
  </table>
</template>

<script>



import axios from "axios";

export default {


  // eslint-disable-next-line vue/multi-word-component-names
  name: "listed",
  data(){
    return{
      naming : []
    }

  }
  ,created() {

    fetch("https://api-1.azurewebsites.net/materia/listar")
        .then((response) => response.json())
        .then(data => (this.naming = data))
        .then(console.log(this.naming));

  },methods:{
      detele(e){
          axios.delete('https://api-1.azurewebsites.net/materia/eliminar/'+e.cod_materia,e.cod_materia)
              .then(datum=>console.log(datum))
      }
  }
}

</script>

<style scoped>

</style>