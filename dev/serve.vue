<script>
import Vue from 'vue'
import RenderOnScroll from '@/render-on-scroll.vue'

export default Vue.extend({
  name: 'ServeDev',
  components: {
    RenderOnScroll,
  },
  data: function () {
    return {
      contents: [...Array(50).keys()].map((i) => ({
        text: 'sample content #' + i,
      })),
    }
  },
})
</script>

<template>
  <div id="app">
    <render-on-scroll height="100px" v-for="item in contents" :key="item.text">
      <div class="sampleContent">
        {{ item.text }}
      </div>
    </render-on-scroll>
  </div>
</template>

<style>
.sampleContent {
  height: 100px;
  animation: fadein 3s;
  text-align: center;
  line-height: 100px;
  border-color: black;
  border-width: 1px;
  border-style: dotted;
  border-radius: 5px;
  margin: 1rem;
  font-family: sans-serif;
}

@keyframes fadein {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
