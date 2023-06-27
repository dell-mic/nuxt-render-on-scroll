import { defineComponent, openBlock, createElementBlock, normalizeStyle, renderSlot, createCommentVNode } from 'vue';

var script = /*#__PURE__*/defineComponent({
  name: 'RenderOnScroll',
  props: {
    height: {
      type: String,
      default: ''
    },
    offsetY: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      render: false
    };
  },
  computed: {
    styles() {
      if (!this.render && this.height) {
        return 'height: ' + this.height;
      } else {
        return '';
      }
    }
  },
  mounted() {
    if (this.isInViewport()) {
      this.render = true;
    } else {
      this.addListner();
    }
  },
  beforeUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  },
  methods: {
    isInViewport() {
      if (!this.$el || typeof window === 'undefined') return false;
      const scroll = window.scrollY || window.pageYOffset;
      const boundsTop = this.$el.getBoundingClientRect().top + scroll;
      const viewport = {
        top: scroll,
        bottom: scroll + window.innerHeight
      };
      const bounds = {
        top: boundsTop - this.offsetY,
        bottom: boundsTop + this.$el.offsetHeight - this.offsetY
      };
      const topInViewPort = bounds.top <= viewport.bottom && bounds.top >= viewport.top;
      const bottomInViewPort = bounds.bottom >= viewport.top && bounds.bottom <= viewport.bottom;
      return topInViewPort || bottomInViewPort;
    },
    addListner() {
      this.interval = setInterval(() => {
        // console.log(this.isInViewport());
        if (this.isInViewport()) {
          this.render = true;
          clearInterval(this.interval);
          this.interval = null;
        }
      }, 200);
    }
  }
});

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    style: normalizeStyle(_ctx.styles)
  }, [!_ctx.render ? renderSlot(_ctx.$slots, "placeholder", {
    key: 0
  }) : createCommentVNode("", true), _ctx.render ? renderSlot(_ctx.$slots, "default", {
    key: 1
  }) : createCommentVNode("", true)], 4);
}

script.render = render;

// Import vue component

// Default export is installable instance of component.
// IIFE injects install function into component, allowing component
// to be registered via Vue.use() as well as Vue.component(),
var entry_esm = /*#__PURE__*/(() => {
  // Get component instance
  const installable = script;

  // Attach install function executed by Vue.use()
  installable.install = app => {
    app.component('RenderOnScroll', installable);
  };
  return installable;
})();

// It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = directive;

export { entry_esm as default };
