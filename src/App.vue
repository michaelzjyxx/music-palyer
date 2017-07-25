<template>
  <div id="app">
    <v-header></v-header>
    <v-tap></v-tap>
    <router-view></router-view>
  </div>
</template>

<script>
  import VHeader from './components/header/header.vue'
  import VTap from './components/tap/tap.vue'

  export default {
    name: 'app',
    components: {
      VHeader,
      VTap
    }
  }
</script>

<style>
</style>
