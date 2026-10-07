<template>
  <span
    class="text-tooltip"
    @mouseenter="visible = true"
    @mouseleave="visible = false"
  >
    <slot />
    <transition name="fade">
      <span v-show="visible && text" class="tooltip-box">{{ text }}</span>
    </transition>
  </span>
</template>

<script>
// 占位实现：溢出省略 + 悬浮完整提示待反推（app.js 170e/5e3e/27f6）后替换
export default {
  name: "TextTooltip",
  props: {
    text: { type: String, default: "" },
  },
  data() {
    return { visible: false };
  },
};
</script>

<style scoped>
.text-tooltip {
  position: relative;
  display: inline-block;
}
.tooltip-box {
  position: absolute;
  left: 0;
  top: 100%;
  z-index: 10;
  min-width: 120px;
  max-width: 320px;
  padding: 6px 10px;
  background: rgba(0, 0, 0, 0.75);
  color: #fff;
  font-size: 12px;
  border-radius: 4px;
  white-space: normal;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
