<template>
  <el-breadcrumb
    class="app-breadcrumb breadcrumb"
    separator-class="el-icon-arrow-right"
  >
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="index">
        <span
          v-if="
            item.redirect === 'noRedirect' || index === levelList.length - 1
          "
          class="no-redirect"
          >{{ item.meta.title }}</span
        >
        <a v-else class="parent" @click.prevent="handleLink(item)">{{
          item.meta.title
        }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import { findHierarchyPath } from "@/utils/navData";

export default {
  name: "Breadcrumb",
  data() {
    return {
      levelList: [],
    };
  },
  watch: {
    $route(route) {
      if (!route.path.startsWith("/redirect/")) {
        this.getBreadcrumb();
      }
    },
  },
  created() {
    this.getBreadcrumb();
  },
  methods: {
    getBreadcrumb() {
      // 1) 走 $route.matched，过滤出有 meta.title 的项
      let matched = this.$route.matched.filter(
        (item) => item.meta && item.meta.title,
      );
      if (!matched.length) return;

      // 2) 上一级补位
      const path = matched[0].path;
      const parentPath = path.substring(0, path.lastIndexOf("/"));
      const parentRoute = this.$router.options.routes.find(
        (r) => r.path === parentPath,
      );
      if (parentRoute && parentRoute.meta && parentRoute.meta.title) {
        matched = [parentRoute].concat(matched);
      }

      // 3) 非 Home 补 Home
      if (!this.isDashboard(matched[0])) {
        matched = [{ path: "/", meta: { title: "Home" } }].concat(matched);
      }

      // 4) 过滤 breadcrumb === false
      let levelList = matched.filter(
        (item) =>
          item.meta && item.meta.title && item.meta.breadcrumb !== false,
      );

      // 5) 产品中心：按 query.hierarchy 追加分类链（如 Consumer Audio > TWS）
      if (this.$route.name === "product_center") {
        const chain = findHierarchyPath(this.$route.query.hierarchy);
        levelList = levelList.concat(
          chain.map((n) => ({
            path: "/product-center",
            query: { name: n.name, hierarchy: n.hierarchy },
            meta: { title: n.title },
          })),
        );
      }
      this.levelList = levelList;

      // 6) 广播给 store（兼容原实现，本批 3 页不依赖）
      if (this.$store && typeof this.$store.dispatch === "function") {
        this.$store.dispatch("getRouters", this.levelList);
      }
    },
    isDashboard(route) {
      const name = route && route.name;
      if (!name) return false;
      return name.trim().toLowerCase() === "home";
    },
    handleLink(item) {
      const { redirect, path, query } = item;
      if (redirect) {
        this.$router.push(redirect);
        return;
      }
      this.$router.push(query ? { path, query } : path);
    },
  },
};
</script>

<style lang="scss">
/* 来自 chunk-64252843.2301d9ee.css */
.breadcrumb {
  width: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  padding: 20px 40px 20px 10px;
  background: #f8f8f8;
  justify-content: right;
  margin: 0;
  border-radius: 0;

  .no-redirect {
    color: #094b7c;
    font-size: 10px;
  }
  .parent {
    font-size: 10px;
    color: #606266;
    font-weight: 400;
    &:hover {
      color: #094b7c !important;
    }
  }
  .el-breadcrumb__item {
    line-height: 1.5;
  }
  .el-breadcrumb__separator {
    font-size: 16px;
  }
}

.breadcrumb_bg {
  background: #fff !important;
  border: 0 solid #000 !important;
}

@media (max-width: 768px) {
  .breadcrumb {
    justify-content: left !important;
    padding: 10px 20px !important;
    background: hsla(0, 0%, 74.9%, 0.56) !important;
    border-bottom: 0 !important;

    .el-breadcrumb__separator,
    .no-redirect,
    .parent {
      font-size: 14px !important;
      line-height: 1.5 !important;
    }
  }
}
</style>
