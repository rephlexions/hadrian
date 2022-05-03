<script setup></script>

<template>
  <nav class="navbar navbar-expand">
    <div class="container-fluid">
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent1"
        aria-controls="navbarSupportedContent1"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class=""><i style="color: white" class="bi bi-list"></i></span>
      </button>
      <a class="navbar-brand" href="/">
        <img src="../assets/hadrian-logo.png" width="110" height="18" />
      </a>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <a
              class="nav-link"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              ><i class="bi bi-bell"></i
            ></a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              ><i class="bi bi-gear"></i
            ></a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              ><i class="bi bi-person"></i
            ></a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  background-color: #01052d;
  box-shadow: 0px 1px 4px rgba(187, 187, 187, 0.25);
}

.navbar-expand .navbar-toggler {
  display: grid !important;
}

.nav-link {
  color: white !important;
}
</style>
