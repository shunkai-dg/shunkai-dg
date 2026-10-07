<template>
  <svg :class="svgClass" aria-hidden="true" v-on="$listeners">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
// 反推来源：app.js c00a/6a3a/04e2/2c1f
// 样式由 global.css 提供（原 scoped 样式已剥离 data-v 转写进去）
// sprite 由 main.js 的 require.context + svg-sprite-loader（symbolId: icon-[name]）生成
export default {
  name: "SvgIcon",
  props: {
    iconClass: { type: String, required: true },
    className: { type: String, default: "" },
  },
  computed: {
    iconName() {
      return `#icon-${this.iconClass}`;
    },
    svgClass() {
      return ["svg-icon", this.iconClass, this.className];
    },
  },
};
</script>
