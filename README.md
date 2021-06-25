# nuxt-render-on-scroll

`nuxt-render-on-scroll` - A Vue/Nuxt component that allows you to lazily render components only when they are scrolled into the viewport.

Based on the idea from [vue-render-on-scroll
](https://github.com/petr-nazarov/vue-render-on-scroll) and adopted for SSR usage in Nuxt.js:
Adding `v-if="false"` to the content of the component as long as the component is not in the current viewport or while in SSR mode.

Nevertheless, it should still be usable independent of Nuxt with stock Vue.

## Install

```sh
yarn add nuxt-render-on-scroll
# OR
npm i nuxt-render-on-scroll
```

```js
import RenderOnScroll from 'nuxt-render-on-scroll'
export default {
  components: {
    RenderOnScroll,
    // ...
  },
}
```

## Simple Usage

```html
<render-on-scroll>
  <div>This content will be renderd only when it enters viewport</div>
</render-on-scroll>
```

## Advanced Usage

```html
<render-on-scroll :offset-y="100">
  <div>This content will already be rendered when scrolled 100px near it</div>
</render-on-scroll>
```

```html
<render-on-scroll height="180px" :offset-y="-40">
  <div>
    This content will only be rendered when at least 40px scrolled into the
    180px high placeholder space
  </div>
</render-on-scroll>
```

## Placeholder Support
A placeholder can also be shown before the scroll reaches the element. This will be usefull if you want to show something else while the component is rendering or if you are fetching asynchronous data from.
```html
<render-on-scroll>
  <template #placeholder>
    <div>
      This content will be rendered before scroll reaches the main element. 
    </div>
  </template>
  <div>This content will be renderd only when it enters viewport</div>
</render-on-scroll>
```


## Configuration Options

| prop    |  type  | default | comments                                                                                                                                                                                                                                                   |
| ------- | :----: | ------: | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| height  | String |      '' | CSS string for height property of the wrapping div. Useful to preserve the space while to content is not rendered yet. Can be used in combination with a negative value `offsetY` render only when scrolled into the content area, e.g., for large charts. |
| offsetY | Number |       0 | Additional amount of pixel to be added on the content's bounds. E.g. value of 100 will render the content when scrolled within 100px _near_ it.       

## Development

This project is based on [vue-sfc-rollup](https://github.com/team-innovation/vue-sfc-rollup)

### Clone this repo

```sh
git clone git@github.com:Michi-4G/nuxt-render-on-scroll.git
cd nuxt-render-on-scroll
```

### Install dependencies

```sh
npm install
```

### Run development server

```sh
npm run serve
```

### Build for production

```sh
npm run build
```
