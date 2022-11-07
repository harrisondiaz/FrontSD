<template>
  <nav class="navbar navbar-expand-lg bg-dark">
    <div class="container-fluid">
      <router-link to="/assigature"><img src="https://cdn-icons-png.flaticon.com/512/2645/2645163.png" alt="Logo pc"></router-link>
      <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle text-light"  role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Materias
            </a>
            <ul class="dropdown-menu dropdown-menu-dark">
              <li><router-link to="/assignature/view"><a class="dropdown-item">Ver Listado</a></router-link></li>
              <li><hr class="dropdown-divider"></li>
              <li><router-link to="/assignature/register"><a class="dropdown-item" >Registrar</a></router-link></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" >Modificar</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><router-link to="/assignature/remove"><a class="dropdown-item" >Eliminar</a></router-link></li>
            </ul>
          </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle text-light"  role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Inscripciones
              </a>
              <ul class="dropdown-menu dropdown-menu-dark">
                <li><a class="dropdown-item" href="#">Ver Listado</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="#">Registrar</a></li>
                <li><hr class="dropdown-divider"></li>
              </ul>
            </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle text-light"  role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Estudiantes
            </a>
            <ul class="dropdown-menu dropdown-menu-dark">
              <li><p class="dropdown-item" href="#">Ver Listado</p></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" href="#">Registrar</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" href="#">Modificar</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" href="#">Eliminar</a></li>
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
