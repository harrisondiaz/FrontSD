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
      naming : [],
      filterInput: ''
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
    filter(datum){
      console.log(datum+""+this.filterInput)
      return datum.nombre_estudiante.toLocaleLowerCase().indexOf(this.filterInput.toLocaleLowerCase()) >=0
    }
      
  }
}

</script>

<style scoped>

</style>