<template>
  <h1 class="text-center">Materias</h1>
  <table class="table table-dark">
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
      <td v-if="n.estado_materia=true">Activo</td>
      <td v-else>Deshabilitado</td>
    </tr>
    </tbody>
  </table>
</template>

<script>



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
        .then(data => (this.naming = data));
  }
}

</script>

<style scoped>

</style>