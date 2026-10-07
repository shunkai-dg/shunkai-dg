<template>
  <div>
    <el-breadcrumb
      class="app-breadcrumb breadcrumb"
      separator-class="el-icon-arrow-right"
    >
      <transition-group name="breadcrumb">
        <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
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
    <div class="procuct_detail">
      <div>
        <div class="container">
          <div class="procuct_detail_content">
            <div class="procuct_detail_l">
              <div class="arrow-normal">
                <div ref="small" class="arrow-normal-swiper">
                  <div
                    id="small"
                    @mouseover="over"
                    @mouseout="out"
                    @mousemove="move"
                  >
                    <div id="float" />
                    <div
                      v-for="(img, index) in detailData && detailData.imgs"
                      v-show="currentIndex === index"
                      :key="index"
                      style="height: 100%"
                    >
                      <img
                        ref="imgs"
                        id="smallimg"
                        :src="RESOURCE_BASE_URL + img"
                      />
                    </div>
                  </div>
                  <div class="swiper-button-prev" @click="clickIcon('prev')">
                    <svg-icon :icon-class="currentIndex === 0 ? '2' : '1'" />
                  </div>
                  <div class="swiper-button-next" @click="clickIcon('next')">
                    <svg-icon
                      :icon-class="
                        currentIndex ===
                        (detailData.imgs && detailData.imgs.length - 1)
                          ? '4'
                          : '3'
                      "
                    />
                  </div>
                </div>
                <div slot="pagination" class="swiper-pagination">
                  <div class="arrow_prev" @click="prev">
                    <svg-icon
                      :icon-class="
                        imgHover === count ||
                        (detailData.imgs && detailData.imgs.length < count)
                          ? '2'
                          : '1'
                      "
                    />
                  </div>
                  <div class="arrow_next" @click="next">
                    <svg-icon
                      :icon-class="
                        imgHover ===
                          (detailData.imgs && detailData.imgs.length) ||
                        (detailData.imgs && detailData.imgs.length < count)
                          ? '4'
                          : '3'
                      "
                    />
                  </div>
                  <div ref="spec_items" class="spec_items">
                    <ul :style="styleSpec">
                      <li
                        v-for="(img, index) in detailData.imgs"
                        :key="index"
                        ref="my_pagination_clickable"
                        class="swiper-pagination_list my-pagination-clickable"
                      >
                        <span
                          ref="swiper_pagination_item"
                          class="swiper-pagination_item"
                        >
                          <img
                            ref="imgs"
                            :src="RESOURCE_BASE_URL + img"
                            @click="changeImg(index)"
                          />
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div ref="big" id="big">
                <img
                  ref="bigImg"
                  :style="{ left: styles.imgx + 'px', top: styles.imgY + 'px' }"
                  :src="pic"
                />
              </div>
            </div>
            <div class="procuct_detail_r">
              <el-row class="procuct_detail_r_max" :gutter="24">
                <el-col :span="2"> </el-col>
                <el-col :span="22">
                  <div class="procuct_detail_info">
                    <div class="title">{{ detailData.title }}</div>
                    <div class="sub_title">{{ detailData.sub_title }}</div>
                    <el-divider />
                    <div class="desc" v-html="detailData.descr"></div>
                    <div class="params" v-html="detailData.params"></div>
                    <button class="procuct_detail_info_btn" @click="jump">
                      contact
                    </button>
                  </div>
                </el-col>
                <el-col :span="2"> </el-col>
              </el-row>
              <el-row class="procuct_detail_r_min" :gutter="24">
                <el-col :span="24">
                  <div class="procuct_detail_info">
                    <div class="title">{{ detailData.title }}</div>
                    <div class="sub_title">{{ detailData.sub_title }}</div>
                    <el-divider />
                    <div class="desc" v-html="detailData.descr"></div>
                    <div class="params" v-html="detailData.params"></div>
                    <button class="procuct_detail_info_btn" @click="jump">
                      contact
                    </button>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import pathToRegexp from "path-to-regexp";
import { mapGetters } from "vuex";
import { getProductDetail } from "@/api/index";
import { RESOURCE_BASE_URL } from "@/utils/resource";
import { findHierarchyPath } from "@/utils/navData";
import Breadcrumb from "@/components/Breadcrumb";

export default {
  components: { Breadcrumb },
  data() {
    return {
      RESOURCE_BASE_URL,
      levelList: [],
      pic: "",
      currentIndex: 0,
      prevIcon: false,
      nextIcon: true,
      base: "",
      screenWidth: "",
      styles: { top: "", left: "", imgx: "", imgy: "" },
      styleSpec: {
        width: "",
        position: "absolute",
        top: "0px",
        left: "0px",
        display: "flex",
      },
      imgHover: 5,
      count: 0,
      imgHoverIndex: 0,
      path: [],
      detailData: {},
    };
  },
  computed: {
    ...mapGetters(["routersList", "breadcrumbListDetail"]),
  },
  watch: {
    screenWidth: {
      handler() {
        this.getClientWidth();
      },
      immediate: true,
    },
  },
  created() {
    this.getBreadcrumb();
    this.getFeachList();
  },
  mounted() {
    this.getClientWidth();
    window.onresize = () => {
      this.screenWidth = document.body.clientWidth;
    };
  },
  methods: {
    getClientWidth() {
      this.screenWidth = document.body.clientWidth;
      const e = document.body.clientWidth;
      const r = document.getElementsByClassName("my-pagination-clickable");
      const n = document.getElementsByClassName("swiper-pagination_item");
      if (e <= 1512 && e > 768) {
        this.base = 94;
        this.imgHover = 5;
        this.count = 5;
        this.styleSpec.left = "0px";
        for (let i = 0; i < r.length; i++) {
          n[i].style.width = "74px";
          n[i].style.height = "56px";
        }
      } else if (e > 1513) {
        this.styleSpec.left = "0px";
        setTimeout(() => {
          this.$refs.spec_items.style.width = "600px";
          for (let i = 0; i < r.length; i++) {
            r[i].style.marginLeft = "14px";
            r[i].style.marginRight = "14px";
            n[i].style.width = "87px";
            r[i].style.height = "76px";
          }
          this.base = 109;
          this.imgHover = 5;
          this.count = 5;
        }, 200);
      } else {
        this.styleSpec.left = "0px";
        this.imgHover = 4;
        this.count = 4;
        this.base = 90;
      }
    },
    prev() {
      if (!this.detailData.imgs || !this.detailData.imgs.length) return;
      if (this.imgHover === this.count) {
        this.imgHover = this.count;
        this.imgHoverIndex = 0;
        if (this.detailData.imgs.length === this.imgHover) {
          this.styleSpec.left = "0px";
        } else {
          this.styleSpec.left = "-" + this.imgHoverIndex * this.base + "px";
        }
      } else {
        --this.imgHover;
        --this.imgHoverIndex;
        if (this.imgHover < this.count || this.imgHover === this.count) {
          this.styleSpec.left = "0px";
        } else if (this.imgHover > this.count) {
          this.styleSpec.left = "-" + this.imgHoverIndex * this.base + "px";
        }
      }
    },
    next() {
      if (!this.detailData.imgs || !this.detailData.imgs.length) return;
      if (this.imgHover === this.detailData.imgs.length) {
        this.imgHover = this.detailData.imgs.length;
        this.imgHoverIndex = 0;
      } else if (this.detailData.imgs.length > this.imgHover) {
        ++this.imgHover;
        ++this.imgHoverIndex;
        if (this.imgHover < this.count) {
          this.styleSpec.left = "0px";
        } else if (this.imgHover > this.count) {
          this.styleSpec.left = "-" + this.imgHoverIndex * this.base + "px";
        }
      }
    },
    over() {
      const t = document.getElementById("float");
      const e = document.getElementById("big");
      t.style.visibility = "visible";
      e.style.visibility = "visible";
      e.style.display = "block";
      this.pic = RESOURCE_BASE_URL + this.detailData.imgs[this.currentIndex];
    },
    out() {
      const t = document.getElementById("float");
      const e = document.getElementById("big");
      t.style.visibility = "hidden";
      e.style.display = "none";
    },
    move(e) {
      const clientHeight = this.getClientHeight();
      const r = document.getElementById("float");
      const n = document.getElementById("small");
      const i = document.getElementById("big");
      const o = i.getElementsByTagName("img")[0];
      const a = n.clientWidth - r.offsetWidth - 0;
      const s = n.clientHeight - r.offsetHeight - 0;
      const c = o.clientWidth - i.offsetWidth;
      const l = o.clientHeight - i.offsetHeight;
      let u = e.clientX - n.offsetLeft - (r.offsetWidth + 90);
      let f = e.clientY - n.offsetTop - (r.offsetHeight + 50);
      f += clientHeight;
      if (u < 0) u = 0;
      if (f < 0) f = 0;
      if (u > a) u = a;
      if (f > s) f = s;
      const d = u / a;
      const p = f / s;
      r.style.left = u + "px";
      r.style.top = f + "px";
      o.style.left = -d * c + "px";
      o.style.top = -p * l + "px";
    },
    getClientHeight() {
      let t = 0;
      if (document.documentElement && document.documentElement.scrollTop) {
        t = document.documentElement.scrollTop;
      } else if (document.body) {
        t = document.body.scrollTop;
      }
      return t;
    },
    getBreadcrumb() {
      let matched = this.$route.matched.filter(
        (item) => item.meta && item.meta.title,
      );
      const breadcrumbList = this.$route.matched.filter(
        (item) => item.meta && item.meta.title,
      );
      if (!matched.length) {
        this.levelList = breadcrumbList;
        return;
      }
      const routes = this.$router.options.routes;
      const parentPath = matched[0].path.substring(
        0,
        matched[0].path.lastIndexOf("/"),
      );
      for (let i = 0; i < routes.length; i++) {
        if (routes[i].path === parentPath) {
          matched = [routes[i]];
        }
      }
      const first = matched[0];
      if (!this.isDashboard(first)) {
        matched = [{ path: "/", meta: { title: "Home" } }].concat(matched);
      }
      // 分类链：基于 subGroups 完整树解析（组级如 TWS/hierarchy=4 也能命中）
      this.path = findHierarchyPath(this.$route.query.hierarchy).map((n) => ({
        path: "/product-center_" + n.name,
        meta: { title: n.title },
        hierarchy: n.hierarchy,
      }));
      matched = matched.filter(
        (item) =>
          item.meta && item.meta.title && item.meta.breadcrumb !== false,
      );
      matched = matched.concat(this.path);
      this.levelList = matched.concat(breadcrumbList);
    },
    isDashboard(route) {
      const name = route && route.name;
      if (!name) return false;
      return name.trim().toLocaleLowerCase() === "Home".toLocaleLowerCase();
    },
    handleLink(item) {
      const { redirect, path, meta, hierarchy } = item;
      let target = path;
      if (target.indexOf("_") !== -1) {
        target = target.substring(0, target.indexOf("_"));
      }
      if (redirect) {
        this.$router.push(redirect);
      } else if (target === "/product-center") {
        this.$router.push({
          name: "product_center",
          query: { name: meta.title, hierarchy },
        });
      } else {
        this.$router.push(this.pathCompile(target));
      }
    },
    pathCompile(path) {
      const { params } = this.$route;
      const toPath = pathToRegexp.compile(path);
      return toPath(params);
    },
    getFeachList() {
      const query = this.$route.query;
      getProductDetail({ id: query.id }).then((res) => {
        this.detailData = res.data;
      });
    },
    jump() {
      this.$router.push({ name: "contact_us" });
    },
    changeImg(index) {
      this.currentIndex = index;
    },
    clickIcon(type) {
      if (!this.detailData.imgs || !this.detailData.imgs.length) return;
      if (type === "next") {
        this.currentIndex++;
        if (this.currentIndex > this.detailData.imgs.length - 1) {
          this.currentIndex = this.detailData.imgs.length - 1;
        }
      } else if (type === "prev") {
        if (this.currentIndex === 0) {
          this.currentIndex = 0;
        } else {
          this.currentIndex--;
        }
      }
    },
  },
};
</script>

<style scoped>
/* 来自 chunk-3740ee3e.ac2d095d.css，已去掉公共 breadcrumb 部分 */
@media (max-width: 768px) {
  .procuct_detail .procuct_detail_content {
    display: initial !important;
    margin-top: 60px !important;
  }
  .procuct_detail .procuct_detail_content .procuct_detail_l,
  .procuct_detail .procuct_detail_content .procuct_detail_r {
    width: 100% !important;
  }
  .procuct_detail
    .procuct_detail_content
    .procuct_detail_r
    .procuct_detail_r_max {
    display: none;
  }
  .procuct_detail .procuct_detail_content .procuct_detail_r .el-col {
    padding: 0 !important;
  }
  .spec_items {
    width: 358px !important;
  }
  #big {
    display: none !important;
  }
  #float {
    visibility: hidden !important;
  }
}
@media (min-width: 768px) {
  .procuct_detail .procuct_detail_r_max {
    display: block;
  }
  .procuct_detail .procuct_detail_r_min {
    display: none;
  }
  #big,
  #float {
    display: block;
  }
}
@media (min-width: 1513px) {
  .procuct_detail .container {
    max-width: 1500px !important;
  }
}
#big {
  display: none;
}
#float {
  visibility: hidden;
}
.procuct_detail .swiper-container {
  z-index: 0;
}
.procuct_detail .swiper-wrapper {
  padding: 0 56px;
}
.procuct_detail .container {
  max-width: 1200px;
}
.procuct_detail .procuct_detail_content {
  display: flex;
  margin-top: 77px;
  padding-bottom: 60px;
}
.procuct_detail .procuct_detail_content .procuct_detail_l {
  width: 45%;
  position: relative;
}
.procuct_detail .procuct_detail_content .procuct_detail_l .swiper-button-next,
.procuct_detail .procuct_detail_content .procuct_detail_l .swiper-button-prev {
  z-index: 1;
}
.procuct_detail .procuct_detail_content .procuct_detail_l .arrow-normal {
  position: relative;
}
.procuct_detail
  .procuct_detail_content
  .procuct_detail_l
  .arrow-normal
  .arrow-normal-swiper {
  position: relative;
  background: #fff;
  height: 100%;
}
.procuct_detail
  .procuct_detail_content
  .procuct_detail_l
  .arrow-normal
  .swiper-button-next:after,
.procuct_detail
  .procuct_detail_content
  .procuct_detail_l
  .arrow-normal
  .swiper-button-prev:after {
  content: "";
}
.procuct_detail
  .procuct_detail_content
  .procuct_detail_l
  .arrow-normal
  .swiper-button-next {
  right: 20px;
}
.procuct_detail
  .procuct_detail_content
  .procuct_detail_l
  .arrow-normal
  .swiper-button-prev {
  left: 30px;
}
.procuct_detail
  .procuct_detail_content
  .procuct_detail_l
  .arrow-normal
  .svg-icon {
  width: 24px;
  height: 24px;
}
.procuct_detail .procuct_detail_content .procuct_detail_l .arrow-normal .mask {
  width: 200px;
  height: 200px;
  background: rgba(255, 255, 0, 0.4);
  position: absolute;
  top: 0;
  left: 0;
  cursor: move;
}
.procuct_detail .procuct_detail_content .procuct_detail_l .arrow-normal img {
  width: 100%;
  height: auto;
  object-fit: contain;
}

#smallimg {
  display: block;
  width: 100%;
  height: 100%;
  max-height: 400px;
  object-fit: contain;   /* 此时才真正生效 */
}

.procuct_detail .procuct_detail_content .procuct_detail_l .big {
  width: 600px;
  height: 600px;
  position: absolute;
  top: 0;
  right: -124%;
  overflow: hidden;
  background: #8b4513;
  z-index: 1;
}
.procuct_detail .procuct_detail_content .procuct_detail_l .big img {
  position: absolute;
  top: 0;
  left: 0;
  width: 800px;
  height: 800px;
}
.procuct_detail .procuct_detail_content .procuct_detail_l .swiper-pagination {
  margin-top: 20px;
  position: static;
  background: #f8f8f8;
  z-index: 0;
  position: relative;
  width: 100%;
  height: 84px;
}
.procuct_detail
  .procuct_detail_content
  .procuct_detail_l
  .swiper-pagination
  .spec_items {
  width: 450px;
  height: 100%;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
}
.procuct_detail
  .procuct_detail_content
  .procuct_detail_l
  .swiper-pagination
  .arrow_prev {
  left: 0;
}
.procuct_detail
  .procuct_detail_content
  .procuct_detail_l
  .swiper-pagination
  .arrow_next {
  right: 0;
}
.procuct_detail
  .procuct_detail_content
  .procuct_detail_l
  .swiper-pagination
  .arrow_next,
.procuct_detail
  .procuct_detail_content
  .procuct_detail_l
  .swiper-pagination
  .arrow_prev {
  width: 27px;
  position: absolute;
  cursor: pointer;
  top: 50%;
  margin-top: -20px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}
.procuct_detail
  .procuct_detail_content
  .procuct_detail_l
  .swiper-pagination
  .arrow_next
  i,
.procuct_detail
  .procuct_detail_content
  .procuct_detail_l
  .swiper-pagination
  .arrow_prev
  i {
  font-size: 35px;
  font-weight: 800;
  color: rgba(0, 0, 0, 0.549);
}
.procuct_detail
  .procuct_detail_content
  .procuct_detail_l
  .swiper-pagination
  .swiper-pagination_list {
  border: 2px solid rgba(0, 0, 0, 0.1);
  margin: 0 6px;
  cursor: pointer;
}
.procuct_detail
  .procuct_detail_content
  .procuct_detail_l
  .swiper-pagination
  .my-pagination-clickable {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.procuct_detail
  .procuct_detail_content
  .procuct_detail_l
  .swiper-pagination
  .swiper-pagination_item {
  display: flex;
  justify-content: center;
  padding: 4px 10px;
  width: 74px;
  height: 56px;
}
.procuct_detail
  .procuct_detail_content
  .procuct_detail_l
  .swiper-pagination
  .swiper-pagination_item
  img {
  width: 100%;
  height: auto !important;
  object-fit: cover;
}
.procuct_detail .procuct_detail_content .procuct_detail_r {
  flex: 1;
}
.procuct_detail .procuct_detail_content .procuct_detail_r .procuct_detail_info {
  padding: 0 15px;
}
.procuct_detail
  .procuct_detail_content
  .procuct_detail_r
  .procuct_detail_info
  .title {
  text-align: left;
  color: #333;
  font-size: 29px;
  line-height: 1.5;
}
.procuct_detail
  .procuct_detail_content
  .procuct_detail_r
  .procuct_detail_info
  .sub_title {
  text-align: left;
  color: #000;
  font-size: 16px;
  line-height: 1.5;
}
.procuct_detail
  .procuct_detail_content
  .procuct_detail_r
  .procuct_detail_info
  .el-divider--horizontal {
  margin: 10px 0;
}
.procuct_detail
  .procuct_detail_content
  .procuct_detail_r
  .procuct_detail_info
  .desc {
  padding: 5px 0;
  font-size: 15px;
  text-align: left;
}
.procuct_detail
  .procuct_detail_content
  .procuct_detail_r
  .procuct_detail_info
  .params {
  margin-top: 15px;
  padding: 5px 0;
  text-align: left;
}
.procuct_detail
  .procuct_detail_content
  .procuct_detail_r
  .procuct_detail_info
  .params
  p {
  box-sizing: inherit;
  margin: 12px 0 8px;
  overflow-wrap: break-word;
  color: #333;
  font-family: Microsoft YaHei;
  font-size: 15px;
  line-height: 1.8;
  /* 文字背景色等富文本内联样式放行，由 rich-content.css 统一控制 */
  background: transparent !important;
}
.procuct_detail
  .procuct_detail_content
  .procuct_detail_r
  .procuct_detail_info
  .procuct_detail_info_btn {
  margin-top: 34px;
  font-size: 16px;
  color: #fff;
  background: #000;
  border: 1px solid #000;
  border-radius: 4px;
  padding: 8px 40px;
}
.procuct_detail
  .procuct_detail_content
  .procuct_detail_r
  .procuct_detail_info
  .procuct_detail_info_btn:hover {
  color: #333;
  background: transparent;
}
.procuct_detail .procuct_detail_content .procuct_detail_r p,
.procuct_detail .procuct_detail_content .procuct_detail_r span {
  background: transparent !important;
}
#float {
  width: 300px;
  height: 300px;
  background: rgba(213, 236, 90, 0.7);
  opacity: 0.5;
  cursor: move;
}
#big,
#float {
  position: absolute;
  border: 1px solid #ccc;
}
#big {
  top: 0;
  left: 102%;
  width: 500px;
  height: 500px;
  overflow: hidden;
  background: #fff;
  z-index: 1;
  visibility: hidden;
}
#small {
  height: 400px;
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
#big img {
  position: absolute;
  z-index: 5;
  width: 800px;
  height: 800px;
  object-fit: contain;
}
</style>
