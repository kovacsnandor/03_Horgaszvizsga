
<template>
  <div class="container-fluid my-container p-0">

    <!-- head -->
    <Head />

    <!-- menu -->
    <Menu />
    
    <!-- views -->
    <RouterView />


    <!-- footer -->
  </div>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
import Head from './components/Head.vue';
import Menu from './components/Menu.vue';
export default {
    components: { Head, Menu }
}
</script>

<style>

</style>

