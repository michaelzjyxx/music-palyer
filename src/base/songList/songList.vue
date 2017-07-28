<template>
  <div>
    <ul>
      <li v-for="song in songs" class="item">
        <div class="content">
          <h2 class="name">{{song.name}}</h2>
          <p class="desc">{{getdesc(song)}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      songs: {
        type: Array,
        default: []
      }
    },
    methods: {
      getdesc (songs) {
        return `${songs.singer}·${songs.album}`
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  @import "../../common/stylus/variable.styl"

  .item
    display: flex
    align-items: center
    box-sizing: border-box
    height: 64px
    margin-left: 20px
    .content
      flex: 1
      line-height: 20px
      overflow: hidden
      .name
        color: black
        font-size: $font-size-medium
        no-wrap()
      .desc
        margin-top: 4px
        color: #323232
        font-size: $font-size-small
        no-wrap()
</style>
