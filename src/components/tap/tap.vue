<template>
  <div class="tap">
    <router-link tag="div" class="tab-item" to="/recommend">
    <span class="tab-link">推荐</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/singer">
    <span class="tab-link">歌手</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/rank">
    <span class="tab-link">排行</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/search">
    <span class="tab-link">搜索</span>
    </router-link>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'v-tap'
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  /*.tap*/
  /*.tap-item*/
  /*.tap-link*/
  /*&.route-link-active*/
  /*.tap-link*/
</style>
