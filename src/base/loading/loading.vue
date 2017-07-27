<template>
  <div class="loading">
    <img src="./loading.gif" width="24" height="24">
    <p class="text">{{title}}</p>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String,
        default: '加载中……'
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"
  .loading
    width: 100%
    text-align: center
    .text
      line-height: 20px
      font-size: $font-size-small
      color: black
</style>
