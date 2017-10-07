<template>
  <div class="marddown-browser" style="z-index:100">
    <div v-html="content"></div>
    <link :href="mdStyle" rel="stylesheet">
  </div>
</template>

<script>
import path from 'path'

export default {
  props: ['packagePath'],
  data () {
    return {
      content: '',
      type: 'github'
    }
  },
  computed: {
    mdStyle () {
      return 'file://' + path.join(this.packagePath, 'node_modules', 'highlight.js', 'styles', this.type + '.css')
    }
  }
}
</script>

<style lang="scss" scoped>
.marddown-browser {
  position: absolute;
  right: 0;
  width: 400px;
  top: 50px;
  bottom: 25px;
  background-color: #fff;
  color: #000;
  white-space: nowrap;
  overflow: auto;
  padding: 5px;
}
</style>
