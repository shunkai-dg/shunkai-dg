<template>
  <div class="askatek-head" :class="{ 'scroll-top': scrollEventTop }">
    <div class="comp-block">
      <div class="askatek-header">
        <div class="zz-col-sm-3 askatek-logo">
          <img
            class="askatek-logo"
            :src="logo"
            fluid
            alt="Responsive image"
            @click="jumpHome"
          />
        </div>
        <img
          class="askatek-logo1"
          :src="logo1"
          fluid
          alt="Responsive image"
          @click="jumpHome"
        />
        <div class="askatek-nav">
          <nav-menu
            :menus="navMenus"
            :active-menu="activeMenu"
            @select="handleSelect"
            @jump="jumpPage"
            @subnav="mousemoveNav"
            @subnav-out="mouseoutSubNav"
          />
        </div>
        <!-- 搜索：默认折叠为图标，点击展开输入框（全屏宽通用） -->
        <div
          ref="headerBtn"
          class="header-btn"
          :class="{ 'is-search-open': searchOpen }"
        >
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
              placeholder="Search"
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

      <!-- Product Center 悬浮分组面板：一级居中切换 → 二级三列 → 每列下扁平全部子项 -->
      <transition name="subNav">
        <div
          class="subNav"
          v-show="isSubNav"
          @mouseenter="mousemoveSubNav"
          @mouseleave="mouseoutSubNav"
        >
          <div class="subNav_warp">
            <!-- 顶部：两个一级分类居中并排，点击切换下方二级列表 -->
            <div class="subnav-top">
              <span
                v-for="g in topLevelGroups"
                :key="g.id"
                class="subnav-top-item"
                :class="{ active: activeTopId === g.id }"
                @click="selectTop(g)"
                >{{ g.title }}</span
              >
            </div>
            <!-- 当前一级下的二级三列，每列含二级标题 + 全部子项列表（不做切换） -->
            <div class="subnav-mid">
              <div
                class="subnav-col"
                v-for="(sg, si) in currentSubGroups"
                :key="si"
              >
                <div class="subnav-mid-item">
                  <img v-if="sg.icon" :src="sg.icon" class="subnav-mid-icon" />
                  <span class="subnav-mid-name">
                    {{ sg.title }}
                    <span v-if="sg.desc" class="subnav-mid-desc">{{
                      sg.desc
                    }}</span>
                  </span>
                </div>
                <ul class="subnav-list" style="list-style-type: none">
                  <li
                    v-for="(leaf, li) in flattenLeaves(sg)"
                    :key="li"
                    :class="{ 'is-deep': leaf.deep }"
                    @click="jumpLeaf(leaf)"
                  >
                    {{ leaf.title }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </transition>

      <!-- 移动端抽屉菜单（<750px）：导航列表 + 产品多级分类树 -->
      <transition name="shadingFade">
        <div v-if="isShading" class="shading-menu">
          <div class="shading-menu-container">
            <div class="shading-menu-login">
              <div class="shading-menu-logo">
                <img :src="logo1" alt="aska" @click="jumpHome" />
              </div>
              <div class="menu-close" @click="isShading = false">
                <i class="el-icon-close"></i>
              </div>
            </div>
            <div class="shading-center-menu">
              <ul class="shading-nav">
                <li
                  v-for="(n, i) in navMenus"
                  :key="i"
                  class="shading-nav-item"
                >
                  <!-- Product Center：产品列用列表树展示多级分类 -->
                  <template v-if="n.isSubNav">
                    <div class="shading-nav-link" @click="toggleProduct">
                      <span>{{ n.title }}</span>
                      <i
                        class="el-icon-arrow-down"
                        :class="{ 'is-open': productOpen }"
                      ></i>
                    </div>
                    <div v-show="productOpen" class="shading-nav-product">
                      <product-tree-menu
                        :nodes="productTree"
                        @select="jumpMune"
                      />
                    </div>
                  </template>
                  <!-- 带子项的导航（如 Contact Us） -->
                  <template v-else-if="n.childer && n.childer.length">
                    <div class="shading-nav-link">
                      <span class="shading-nav-name" @click="jumpNav(n)">{{
                        n.title
                      }}</span>
                      <i
                        class="el-icon-arrow-down"
                        :class="{ 'is-open': subOpen[i] }"
                        @click.stop="toggleSub(i)"
                      ></i>
                    </div>
                    <ul v-show="subOpen[i]" class="shading-nav-sub">
                      <li
                        v-for="(c, ci) in n.childer"
                        :key="ci"
                        @click="jumpNav(c)"
                      >
                        {{ c.title }}
                      </li>
                    </ul>
                  </template>
                  <div v-else class="shading-nav-link" @click="jumpNav(n)">
                    {{ n.title }}
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
import ProductTreeMenu from "@/components/ProductTreeMenu/index.vue";
import { navMenus, categoryStore } from "@/utils/navData";
import logo from "@/assets/img/logo.png";
import logo1 from "@/assets/img/logo1.png";
import listUrl from "@/assets/img/list-ul.png";

// 反推来源：app.js 71c2/6ded/2cae（HeaderContent 模块）
export default {
  name: "HeaderContent",
  components: { NavMenu, ProductTreeMenu },
  data() {
    return {
      logo,
      logo1,
      listUrl,
      navMenus,
      keyword: "",
      activeMenu: this.$route.path,
      scrollEventTop: false,
      isSubNav: false,
      subNavTimer: null,
      activeTopId: null,
      // 移动端抽屉
      isShading: false,
      productOpen: true,
      subOpen: {},
      // 搜索折叠展开
      searchOpen: false,
    };
  },
  computed: {
    // 一级分类（动态 categoryStore.roots，居中并排，点击切换）
    topLevelGroups() {
      return categoryStore.roots;
    },
    // 当前选中一级分类下的二级分组；首次打开尚未选中时回退到第一个一级分类
    currentSubGroups() {
      const groups = this.topLevelGroups;
      if (!groups.length) return [];
      const g =
        groups.find((t) => t.id === this.activeTopId) || groups[0];
      return g.subGroups || [];
    },
    // 抽屉内产品分类树：一级 → 二级 subGroups → 三级/四级 childer
    productTree() {
      return categoryStore.roots.map((g) => ({
        title: g.title,
        name: g.name,
        hierarchy: g.hierarchy,
        childer: g.subGroups,
      }));
    },
  },
  watch: {
    $route(to) {
      this.activeMenu = to.path;
    },
    // 分类树（响应式）加载完成后，若尚未选中一级分类，则默认选中第一个，
    // 展示该一级分类下的全部二/三/四级数据
    topLevelGroups(groups) {
      if (groups.length && this.activeTopId == null) {
        this.activeTopId = groups[0].id;
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
    // 抽屉导航：展开/收起产品分类树
    toggleProduct() {
      this.productOpen = !this.productOpen;
    },
    // 抽屉导航：展开/收起带子项的导航
    toggleSub(i) {
      this.$set(this.subOpen, i, !this.subOpen[i]);
    },
    // 抽屉产品树点击：跳转产品中心
    jumpMune(item) {
      this.isShading = false;
      this.$router.push({
        name: "product_center",
        query: { name: item.name || item.title, hierarchy: item.hierarchy },
      });
    },
    // 抽屉导航点击：按 name / path 跳转
    jumpNav(n) {
      this.isShading = false;
      if (n.isSubNav) {
        this.$router.push({ name: "product_center" });
      } else if (n.name) {
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
      if (n.isSubNav) {
        this.$router.push({
          name: "product_center",
          query: { name: n.name, hierarchy: n.hierarchy },
        });
      } else if (n.name) {
        this.$router.push({ name: n.name });
      }
    },
    // 切换一级分类：更新 activeTopId
    selectTop(g) {
      this.activeTopId = g.id;
    },
    // 扁平化某二级分类下全部子项（不分级别），四级项标记 deep 供缩进
    flattenLeaves(sg) {
      if (!sg || !sg.childer) return [];
      const out = [];
      const walk = (arr, fb, deep) => {
        arr.forEach((t) => {
          out.push({
            title: t.title,
            name: t.name || t.title,
            hierarchy: t.hierarchy != null ? t.hierarchy : fb,
            path: t.path,
            deep,
          });
          if (t.childer && t.childer.length) {
            walk(t.childer, t.hierarchy != null ? t.hierarchy : fb, true);
          }
        });
      };
      walk(sg.childer, sg.hierarchy, false);
      return out;
    },
    // 点击叶子项：跳转产品页
    jumpLeaf(leaf) {
      if (leaf.path) {
        this.$router.push({ path: leaf.path });
      } else {
        this.$router.push({
          name: "product_center",
          query: { name: leaf.name, hierarchy: leaf.hierarchy },
        });
      }
      this.clearSubNavTimer();
      this.isSubNav = false;
    },
    mousemoveNav(n) {
      if (n.isSubNav) {
        this.clearSubNavTimer();
        this.isSubNav = true;
      } else {
        this.hideSubNavDelayed();
      }
    },
    mousemoveSubNav() {
      this.clearSubNavTimer();
      this.isSubNav = true;
    },
    mouseoutSubNav() {
      this.hideSubNavDelayed();
    },
    // 清掉已挂起的隐藏定时器——每次把 isSubNav 置 true 前必须调用，
    // 否则陈旧的 200ms 隐藏回调会在光标仍停留在菜单/面板上时把面板关掉
    clearSubNavTimer() {
      if (this.subNavTimer) {
        clearTimeout(this.subNavTimer);
        this.subNavTimer = null;
      }
    },
    hideSubNavDelayed() {
      this.clearSubNavTimer();
      this.subNavTimer = setTimeout(() => {
        this.isSubNav = false;
        this.subNavTimer = null;
      }, 200);
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
