<template>
  <nav class="navbar navbar-expand-lg bg-dark">
    <div class="container-fluid">
      <router-link to="/assigature"><img src="https://cdn-icons-png.flaticon.com/512/2645/2645163.png" alt="Logo pc"></router-link>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link dropdown-toggle text-light"  role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Materias
            </a>
            <ul class="dropdown-menu dropdown-menu-dark">
              <li><router-link to="/assignature/view"><a class="dropdown-item">Ver Listado</a></router-link></li>
              <li><hr class="dropdown-divider"></li>
              <li><router-link to="/assignature/register"><a class="dropdown-item" >Registrar</a></router-link></li>
            </ul>
          </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle text-light"  role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Inscripciones
              </a>
              <ul class="dropdown-menu dropdown-menu-dark">
                <li><router-link to="/inscription"><a class="dropdown-item">Ver Listado</a></router-link></li>
                <li><hr class="dropdown-divider"></li>
                <li><router-link to="/inscription/register"><a class="dropdown-item" >Registrar</a></router-link></li>
                </ul>
            </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle text-light"  role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Estudiantes
            </a>
            <ul class="dropdown-menu dropdown-menu-dark">
              <li><router-link to="/studient"><a class="dropdown-item" >Ver Listado</a></router-link></li>
              <li><hr class="dropdown-divider"></li>
              <li><router-link to="/studient/register"><a class="dropdown-item" >Registrar</a></router-link></li>
              </ul>
          </li>
        </ul>
        <router-link to="/"><button class="btn btn-outline-light">Cerrar Session</button></router-link>
      </div>
    </div>
  </nav>
</template>

<script setup>


</script>

<style >
img{
  width: 55px;
}
</style>
