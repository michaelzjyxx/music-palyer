<template>
  <div class="header">
    <div class="icon"></div>
    <!--<h1 class="text">MusicPlayer</h1>-->
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'v-header'
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"
  @import "../../common/stylus/mixin.styl"

  .header
    position: relative
    height: 44px
    text-align: center
    color: $color-theme
    font-size: 0
    .icon
      display: inline-block
      vertical-align: top
      margin-top: 12px
      width: 106px
      height: 30px
      margin-right: 9px
      bg-image: ('logo')
      background-size: 106px 30px
    .text
      display: inline-block
      vertical-align: top
      line-height: 44px
      font-size: $font-size-large-x

  //  .mine
  //  position: absolute
  //top: 0
  //right: 0
  //.iconmine
  // display: block
  //    padding: 12px
  //  font-size: 20px
  //color: $color-theme
</style>
