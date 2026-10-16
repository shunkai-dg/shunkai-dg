<template>
  <div class="shunkai-head" :class="{ 'scroll-top': scrollEventTop }">
    <div class="comp-block">
      <div class="shunkai-header">
        <div class="zz-col-sm-3 shunkai-logo">
          <img
            class="shunkai-logo"
            :src="logo"
            fluid
            alt="Responsive image"
            @click="jumpHome"
          />
        </div>
        <img
          class="shunkai-logo1"
          :src="logo1"
          fluid
          alt="Responsive image"
          @click="jumpHome"
        />
        <div class="shunkai-nav">
          <nav-menu
            :menus="navMenus"
            :active-menu="activeMenu"
            @select="handleSelect"
            @jump="jumpPage"
          />
        </div>
        <!-- 搜索 + 外观/语言切换：默认折叠为图标，点击展开输入框（全屏宽通用） -->
        <div
          ref="headerBtn"
          class="header-btn"
          :class="{ 'is-search-open': searchOpen }"
        >
          <preference-switch class="header-pref-bar" variant="bar" />
          <i
            class="el-icon-search header-search-toggle"
            @click="toggleSearch"
          ></i>
          <div class="header-search-box">
            <el-input
              ref="searchInput"
              v-model="keyword"
              class="header-btn-icon"
              size="small"
              :placeholder="$t('header.searchPlaceholder')"
              @keyup.enter.native="search"
            >
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="search"
              ></el-button>
            </el-input>
          </div>
        </div>
        <div class="list-ul">
          <img :src="listUrl" alt="menu" @click="isShading = true" />
        </div>
      </div>

      <!-- 移动端抽屉菜单（<750px）：导航列表 + 产品三大分类标签 -->
      <transition name="shadingFade">
        <div v-if="isShading" class="shading-menu">
          <div class="shading-menu-container">
            <div class="shading-menu-login">
              <div class="shading-menu-logo">
                <img :src="logo1" alt="shunkai" @click="jumpHome" />
              </div>
              <div class="menu-close" @click="isShading = false">
                <i class="el-icon-close"></i>
              </div>
            </div>
            <div class="shading-center-menu">
              <!-- 移动端：外观（昼夜）与语言切换 -->
              <preference-switch variant="drawer" />
              <ul class="shading-nav">
                <li
                  v-for="(n, i) in navMenus"
                  :key="i"
                  class="shading-nav-item"
                >
                  <!-- Product Center：抽屉内直接列出三大分类，点击进入分类列表 -->
                  <template v-if="n.name === 'product_center'">
                    <div class="shading-nav-link" @click="toggleProduct">
                      <span>{{ $label(n) }}</span>
                      <i
                        class="el-icon-arrow-down"
                        :class="{ 'is-open': productOpen }"
                      ></i>
                    </div>
                    <ul v-show="productOpen" class="shading-nav-sub">
                      <li
                        v-for="c in productCategories"
                        :key="c.id"
                        @click="jumpCategory(c)"
                      >
                        {{ $tt(c.title) }}
                      </li>
                    </ul>
                  </template>
                  <div v-else class="shading-nav-link" @click="jumpNav(n)">
                    {{ $label(n) }}
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import NavMenu from "@/components/NavMenu/index.vue";
import PreferenceSwitch from "@/components/PreferenceSwitch/index.vue";
import scrollLock from "@/utils/scrollLock";
import { navMenus, categoryStore } from "@/utils/navData";
import logo from "@/assets/img/logo.png";
import logo1 from "@/assets/img/logo1.png";
import listUrl from "@/assets/img/list-ul.png";

export default {
  name: "HeaderContent",
  components: { NavMenu, PreferenceSwitch },
  mixins: [scrollLock],
  data() {
    return {
      logo,
      logo1,
      listUrl,
      navMenus,
      keyword: "",
      activeMenu: this.$route.path,
      scrollEventTop: false,
      // 移动端抽屉
      isShading: false,
      productOpen: true,
      // 搜索折叠展开
      searchOpen: false,
    };
  },
  computed: {
    // 产品三大分类（化妆品外壳 / 电子产品外壳 / 其他），来自 categoryStore
    productCategories() {
      return categoryStore.roots;
    },
  },
  watch: {
    $route(to) {
      this.activeMenu = to.path;
    },
    // 抽屉开合 → 锁定/解除背景页面滚动（见 mixins/scrollLock）
    isShading(open) {
      if (open) {
        this.lockScroll();
      } else {
        this.unlockScroll();
      }
    },
  },
  mounted() {
    window.addEventListener("scroll", this.scrollEvent);
    window.addEventListener("resize", this.resizeEvent);
    document.addEventListener("click", this.onDocumentClick);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.scrollEvent);
    window.removeEventListener("resize", this.resizeEvent);
    document.removeEventListener("click", this.onDocumentClick);
    // 抽屉开着时组件被销毁（如切路由）也要解锁，否则页面永久不能滚动
    this.unlockScroll();
  },
  methods: {
    // 进入桌面导航（>768px）时自动收起移动端抽屉
    resizeEvent() {
      if (window.innerWidth > 768 && this.isShading) {
        this.isShading = false;
      }
    },
    // 点击搜索区域外收起搜索框
    onDocumentClick(e) {
      const el = this.$refs.headerBtn;
      if (this.searchOpen && el && !el.contains(e.target)) {
        this.searchOpen = false;
      }
    },
    // 搜索框：点击图标展开/收起，展开后自动聚焦
    toggleSearch() {
      this.searchOpen = !this.searchOpen;
      if (this.searchOpen) {
        this.$nextTick(() => {
          const input = this.$refs.searchInput;
          if (input && input.focus) input.focus();
        });
      }
    },
    // 抽屉导航：展开/收起产品分类
    toggleProduct() {
      this.productOpen = !this.productOpen;
    },
    // 抽屉内点击产品分类：跳产品中心并选中该标签
    jumpCategory(c) {
      this.isShading = false;
      this.$router.push({
        name: "product_center",
        query: { name: c.name || c.title, hierarchy: c.hierarchy },
      });
    },
    // 抽屉导航点击：按 name / path 跳转
    jumpNav(n) {
      this.isShading = false;
      if (n.name) {
        this.$router.push({ name: n.name });
      } else if (n.path) {
        this.$router.push({ path: n.path });
      }
    },
    scrollEvent() {
      const top = document.documentElement.scrollTop || document.body.scrollTop;
      this.scrollEventTop = top > 1;
    },
    jumpHome() {
      this.isShading = false;
      this.$router.push({ name: "home" });
    },
    handleSelect(path) {
      this.$router.push({ path });
    },
    jumpPage(n) {
      if (n.name) {
        this.$router.push({ name: n.name });
      } else if (n.path) {
        this.$router.push({ path: n.path });
      }
    },
    search() {
      this.searchOpen = false;
      this.$router.push({ name: "product_list", query: { k: this.keyword } });
    },
  },
};
</script>

<style scoped>
.list-ul img {
  width: 28px;
  cursor: pointer;
}
.header-btn >>> .el-input__inner {
  border: 0;
}
</style>
