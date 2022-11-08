<template>
  <h1 class="text-center">Materias</h1>
  <img src="">
  <button class="btn btn-info position-absolute top-25 end-0" @click="download">Descargar Información</button>
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
    </tr>
    </thead>
    <tbody>
    <tr  v-for="n in naming" :key="n.cod_materia">
      <th scope="row">{{n.cod_materia}}</th>
      <td>{{n.nombre_materia}}</td>
      <td>{{n.creditos}}</td>
      <td>{{n.cupos}}</td>
<!--      <td>{{n.estado_materia}}</td>-->
      <td v-if="n.estado_materia==1">Activo</td>
      <td v-else>Deshabilitado</td>
    </tr>
    </tbody>
  </table>
</template>

<script>


 import exportXlsFile from 'export-from-json'

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
      download(){
        const data = this.naming;
        const fileName = 'download';
        const exportType = exportXlsFile.types.xls
        console.log(data)
        exportXlsFile({data , fileName ,exportType})
      }
      
  }
}

</script>

<style scoped>

</style>