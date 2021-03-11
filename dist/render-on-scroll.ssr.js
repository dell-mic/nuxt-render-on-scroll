'use strict';Object.defineProperty(exports,'__esModule',{value:true});var vue=require('vue');var script = {
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
  data: function data() {
    return {
      render: false
    };
  },
  computed: {
    styles: function styles() {
      if (!this.render && this.height) {
        return 'height: ' + this.height;
      } else {
        return '';
      }
    }
  },
  mounted: function mounted() {
    if (this.isInViewport()) {
      this.render = true;
    } else {
      this.addListner();
    }
  },
  beforeDestroy: function beforeDestroy() {
    // console.log("beforeDestroy", this.interval);
    if (this.interval) {
      clearInterval(this.interval);
    }
  },
  methods: {
    isInViewport: function isInViewport() {
      if (!this.$el || typeof window === 'undefined') return false;
      var scroll = window.scrollY || window.pageYOffset;
      var boundsTop = this.$el.getBoundingClientRect().top + scroll;
      var viewport = {
        top: scroll,
        bottom: scroll + window.innerHeight
      };
      var bounds = {
        top: boundsTop - this.offsetY,
        bottom: boundsTop + this.$el.offsetHeight - this.offsetY
      };
      var topInViewPort = bounds.top <= viewport.bottom && bounds.top >= viewport.top;
      var bottomInViewPort = bounds.bottom >= viewport.top && bounds.bottom <= viewport.bottom;
      return topInViewPort || bottomInViewPort;
    },
    addListner: function addListner() {
      var _this = this;

      this.interval = setInterval(function () {
        // console.log(this.isInViewport());
        if (_this.isInViewport()) {
          _this.render = true;
          clearInterval(_this.interval);
          _this.interval = null;
        }
      }, 200);
    }
  }
};function render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createBlock("div", {
    style: $options.styles
  }, [$data.render ? vue.renderSlot(_ctx.$slots, "default", {
    key: 0
  }) : vue.createCommentVNode("", true)], 4);
}script.render = render;// Import vue component

var install = function installRenderOnScroll(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component('RenderOnScroll', script);
}; // Create module definition for Vue.use()


var plugin = {
  install: install
}; // To auto-install on non-es builds, when vue is found
// eslint-disable-next-line no-redeclare

/* global window, global */

{
  var GlobalVue = null;

  if (typeof window !== 'undefined') {
    GlobalVue = window.Vue;
  } else if (typeof global !== 'undefined') {
    GlobalVue = global.Vue;
  }

  if (GlobalVue) {
    GlobalVue.use(plugin);
  }
} // Inject install function into component - allows component
// to be registered via Vue.use() as well as Vue.component()


script.install = install; // Export component by default
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = component;
exports.default=script;