<template>
  <div id="ap">
    <v-header></v-header>
    <v-tap></v-tap>
    <keep-alive>
    <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import VHeader from './components/header/header.vue'
  import VTap from './components/tab/tab.vue'

  export default {
    name: 'app',
    components: {
      VHeader,
      VTap
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/variable.styl"
  #ap
    background-color: $color-background
</style>
