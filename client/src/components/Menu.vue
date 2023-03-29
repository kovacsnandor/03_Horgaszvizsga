<template>
  <nav class="navbar navbar-expand-md w3-theme-l3">
    <div class="container-fluid">
      <RouterLink class="navbar-brand" to="/">Navbar</RouterLink>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink class="nav-link active" aria-current="page" to="/">Home</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/about">About</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/counter1">Counter 1</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/counter2">Counter 2</RouterLink>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Halak
            </a>
            <ul class="dropdown-menu">
              <li><RouterLink class="dropdown-item" to="/halkartyak">Hal kártyák</RouterLink></li>
              <li><RouterLink class="dropdown-item" to="/haltablazat">Hal táblázat</RouterLink></li>
              <li><hr class="dropdown-divider" /></li>
              <li><RouterLink class="dropdown-item" to="/halkonyv">Hal könyv</RouterLink></li>
            </ul>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled">Disabled</a>
          </li>
        </ul>
        <form class="d-flex" role="search">
          <input
            class="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            v-model="storeKeres.keresoszo"
          />
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useKeresStore } from "@/stores/keres";
const storeKeres = useKeresStore();
</script>

<style>
</style>