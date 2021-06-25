<template>
  <div :style="styles">
    <template v-if="!render">
      <slot name="placeholder" />
    </template>
    <template v-if="render">
      <slot />
    </template>
  </div>
</template>

<script>
export default {
  name: 'RenderOnScroll',
  props: {
    height: {
      type: String,
      default: '',
    },
    offsetY: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      render: false,
    }
  },
  computed: {
    styles() {
      if (!this.render && this.height) {
        return 'height: ' + this.height
      } else {
        return ''
      }
    },
  },
  mounted() {
    if (this.isInViewport()) {
      this.render = true
    } else {
      this.addListner()
    }
  },
  beforeDestroy() {
    // console.log("beforeDestroy", this.interval);
    if (this.interval) {
      clearInterval(this.interval)
    }
  },
  methods: {
    isInViewport() {
      if (!this.$el || typeof window === 'undefined') return false

      const scroll = window.scrollY || window.pageYOffset
      const boundsTop = this.$el.getBoundingClientRect().top + scroll

      const viewport = {
        top: scroll,
        bottom: scroll + window.innerHeight,
      }

      const bounds = {
        top: boundsTop - this.offsetY,
        bottom: boundsTop + this.$el.offsetHeight - this.offsetY,
      }

      const topInViewPort =
        bounds.top <= viewport.bottom && bounds.top >= viewport.top
      const bottomInViewPort =
        bounds.bottom >= viewport.top && bounds.bottom <= viewport.bottom

      return topInViewPort || bottomInViewPort
    },
    addListner() {
      this.interval = setInterval(() => {
        // console.log(this.isInViewport());
        if (this.isInViewport()) {
          this.render = true
          clearInterval(this.interval)
          this.interval = null
        }
      }, 200)
    },
  },
}
</script>

<style></style>
