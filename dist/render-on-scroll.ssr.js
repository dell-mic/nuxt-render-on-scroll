'use strict';var vue=require('vue');function _iterableToArrayLimit(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s,
      _e,
      _x,
      _r,
      _arr = [],
      _n = !0,
      _d = !1;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = !1;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}var script = /*#__PURE__*/vue.defineComponent({
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
  beforeUnmount: function beforeUnmount() {
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
});function render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("div", {
    style: vue.normalizeStyle(_ctx.styles)
  }, [!_ctx.render ? vue.renderSlot(_ctx.$slots, "placeholder", {
    key: 0
  }) : vue.createCommentVNode("", true), _ctx.render ? vue.renderSlot(_ctx.$slots, "default", {
    key: 1
  }) : vue.createCommentVNode("", true)], 4);
}script.render = render;// Import vue component

// Default export is installable instance of component.
// IIFE injects install function into component, allowing component
// to be registered via Vue.use() as well as Vue.component(),
var component = /*#__PURE__*/(function () {
  // Get component instance
  var installable = script;

  // Attach install function executed by Vue.use()
  installable.install = function (app) {
    app.component('RenderOnScroll', installable);
  };
  return installable;
})();

// It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = directive;
var namedExports=/*#__PURE__*/Object.freeze({__proto__:null,'default':component});// Attach named exports directly to component. IIFE/CJS will
// only expose one global var, with named exports exposed as properties of
// that global var (eg. plugin.namedExport)
Object.entries(namedExports).forEach(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
    exportName = _ref2[0],
    exported = _ref2[1];
  if (exportName !== 'default') component[exportName] = exported;
});module.exports=component;