<template>
  <div id="app">
    <headerContent />
    <router-view :key="$route.path" />
    <footerContent />
    <div v-if="showBtn" class="page-component__scroll">
      <i class="el-icon-caret-top"></i>
      <div
        style="
          position: absolute;
          top: 0;
          width: 100%;
          height: 100%;
          z-index: 9;
        "
        @click="backTop"
      ></div>
    </div>
  </div>
</template>

<script>
import headerContent from "@/components/HeaderContent";
import footerContent from "@/components/FooterContent";
export default {
  provide() {
    return { reload: this.reload };
  },
  components: { headerContent, footerContent },
  data() {
    return {
      isRouterAlive: true,
      showBtn: false,
    };
  },
  mounted() {
    window.addEventListener("scroll", this.showbtn, true);
  },
  methods: {
    showbtn() {
      const top =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      this.scrollTop = top;
      this.showBtn = top > 900;
    },
    backTop() {
      document.documentElement.scrollTop = 0;
    },
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => {
        this.isRouterAlive = true;
      });
    },
  },
};
</script>
<style lang="scss">
@use "./assets/css/header.scss";
</style>
