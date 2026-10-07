<template>
  <div>
    <Breadcrumb />
    <!-- 1. Products development footprint -->
    <div
      v-if="stepList && stepList.length > 0"
      class="r_d_conter_development_course"
      :style="{ backgroundImage: `url(${bgDev})` }"
    >
      <div class="img1">
        <div class="r_d_conter_warp warp">
          <div class="r_d_conter_container container">
            <div class="askatek-title">
              <p>Products development footprint</p>
            </div>

            <!-- 桌面端 -->
            <div class="swiper-max">
              <div
                class="swiper-max-swiper"
                :style="{
                  transform:
                    'translate3d(' + transform.transformPage + ', 0px, 0px)',
                }"
              >
                <div
                  v-for="(item, index) in stepList"
                  :key="index"
                  class="gallery-top"
                >
                  <div class="gallery-top-conter">
                    <div class="gallery-top-conter-imgs">
                      <img ref="imgs" :src="RESOURCE_BASE_URL + item.imgs[0]" />
                    </div>
                    <div
                      class="gallery-top-title"
                      :class="[currentIndex === index && 'active']"
                    >
                      <span>{{ item.title }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="gallery-thumbs">
                <div
                  class="gallery-thumbs-conter"
                  :style="{
                    transform:
                      'translate3d(' + transform.transformPage + ', 0px, 0px)',
                  }"
                >
                  <div
                    v-for="(item, index) in stepList"
                    :key="index"
                    ref="swiperBtn"
                    class="gallery-thumbs-list"
                    :class="[currentIndex === index && 'swiper-slide-active']"
                  >
                    <div class="text">
                      <div class="text-body">
                        <div class="title">
                          <h4 class="content"><p></p></h4>
                        </div>
                        <div class="desc">
                          <h4 class="content">
                            <p>{{ item.year }}</p>
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="production-swiper-button-prev">
                  <svg-icon
                    :icon-class="currentIndex === 0 ? 'swiper2' : 'swiper1'"
                  />
                  <div
                    style="
                      position: absolute;
                      top: 0;
                      width: 100%;
                      height: 100%;
                      z-index: 9;
                    "
                    @click="clickIcon('prev')"
                  ></div>
                </div>
                <div class="production-swiper-button-next">
                  <svg-icon
                    :icon-class="
                      currentIndex === stepList.length - 1
                        ? 'swiper4'
                        : 'swiper3'
                    "
                  />
                  <div
                    style="
                      position: absolute;
                      top: 0;
                      width: 100%;
                      height: 100%;
                      z-index: 9;
                    "
                    @click="clickIcon('next')"
                  ></div>
                </div>
              </div>
            </div>

            <!-- 移动端 -->
            <div class="swiper-min">
              <div class="swiper-max-swiper">
                <div
                  v-for="(item, index) in stepList"
                  v-show="currentIndex === index"
                  :key="index"
                  class="gallery-top"
                >
                  <div class="gallery-top-conter">
                    <div class="gallery-top-conter-imgs">
                      <img ref="imgs" :src="RESOURCE_BASE_URL + item.imgs[0]" />
                    </div>
                    <div class="gallery-top-title">
                      <span>{{ item.title }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="gallery-thumbs">
                <div
                  class="gallery-thumbs-conter"
                  :style="{
                    transform:
                      'translate3d(' + transform.transformPage + ', 0px, 0px)',
                  }"
                >
                  <div
                    v-for="(item, index) in stepList"
                    :key="index"
                    ref="swiperBtnMin"
                    class="gallery-thumbs-list"
                    :class="[currentIndex === index && 'swiper-slide-active']"
                  >
                    <div class="text">
                      <div class="text-body">
                        <div class="title">
                          <h4 class="content"><p></p></h4>
                        </div>
                        <div class="desc">
                          <h4 class="content">
                            <p>{{ item.year }}</p>
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="production-swiper-button-prev">
                  <svg-icon
                    :icon-class="currentIndex === 0 ? 'swiper2' : 'swiper1'"
                  />
                  <div
                    style="
                      position: absolute;
                      top: 0;
                      width: 100%;
                      height: 100%;
                      z-index: 9;
                    "
                    @click="clickIcon('prevMin')"
                  ></div>
                </div>
                <div class="production-swiper-button-next">
                  <svg-icon
                    :icon-class="
                      currentIndex === stepList.length - 1
                        ? 'swiper4'
                        : 'swiper3'
                    "
                  />
                  <div
                    style="
                      position: absolute;
                      top: 0;
                      width: 100%;
                      height: 100%;
                      z-index: 9;
                    "
                    @click="clickIcon('nextMin')"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 2. Equipments -->
    <div v-if="equipment && equipment.length > 0" class="r_d_conter_equipment" :style="{ backgroundImage: `url(${bgEquip})` }">
      <div class="img1">
        <div class="r_d_conter_warp warp">
          <div class="r_d_conter_container container">
            <div class="askatek-title"><p>Equipments</p></div>
            <ul class="r_d_conter_equipment_list">
              <li v-for="(item, index) in equipment" :key="index">
                <div class="r_d_conter_equipment_list_item">
                  <img
                    :src="item.img_path"
                    @click="openPreviewPicture(equipment, index, 'img_path')"
                  />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- 3. Intellectual Property -->
    <div class="r_d_conter_property" :style="{ backgroundImage: `url(${bgProperty})` }">
      <div class="img1">
        <div class="warp">
          <div class="container">
            <div class="askatek-title"><p>Intellectual Property</p></div>

            <!-- 桌面端 -->
            <div class="r_d_conter_property_main">
              <div class="r_d_conter_property_tabs">
                <button
                  v-for="(item, index) in propertyData"
                  :key="index"
                  class="property_tabs_btn"
                  :class="[activeIndex === index && 'property_tabs_btn_active']"
                  @click="tabs(index)"
                >
                  {{ item.table }}
                </button>
              </div>

              <div class="r_d_conter_property_content">
                <ul class="r_d_conter_property_list">
                  <li
                    v-for="(item, index) in propertyData"
                    v-show="activeIndex === index"
                    :key="index"
                  >
                    <!-- 单层 swiper：一张证书一个 slide，触摸/鼠标拖动横向切换，无独立箭头 -->
                    <swiper :options="swiperOpen">
                      <swiper-slide
                        v-for="(img, ii) in item.list"
                        :key="ii"
                        class="r_d_conter_property_list_item"
                      >
                        <img
                          :src="img.img_path"
                          @click="openPreviewPicture(item.list, ii, 'img_path')"
                        />
                      </swiper-slide>
                    </swiper>
                  </li>
                </ul>
              </div>
            </div>

            <!-- 移动端 collapse -->
            <div class="r_d_conter_property_collapse">
              <el-collapse v-model="activeNames" @change="handleChange">
                <el-collapse-item
                  v-for="(item, index) in propertyData"
                  :key="index"
                  :title="item.table"
                  :name="index"
                >
                  <div class="r_d_conter_property_list_item">
                    <!-- 单层 swiper：一张证书一个 slide -->
                    <swiper :options="swiperOpenBanner">
                      <swiper-slide v-for="(img, ii) in item.list" :key="ii">
                        <img
                          :src="img.img_path"
                          @click="openPreviewPicture(item.list, ii, 'img_path')"
                        />
                      </swiper-slide>
                      <div class="swiper-pagination" slot="pagination"></div>
                    </swiper>
                  </div>
                </el-collapse-item>
              </el-collapse>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 4. Company Qualification -->
    <div
      v-if="qualification && qualification.length > 0"
      class="r_d_conter_qualification"
      :style="{ backgroundImage: `url(${bgQualification})` }"
    >
      <div class="img1">
        <div class="r_d_conter_warp warp">
          <div class="r_d_conter_container container">
            <div class="askatek-title"><p>Company Qualification</p></div>
            <ul class="r_d_conter_qualification_list">
              <li v-for="(item, index) in qualification" :key="index">
                <div class="r_d_conter_qualification_list_item">
                  <img
                    :src="item.img_path"
                    @click="
                      openPreviewPicture(qualification, index, 'img_path')
                    "
                  />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <ImagePreview
      v-if="pictureVisible"
      :is-visible="pictureVisible"
      :index="index"
      :k="k"
      :img-list="imgList"
      @close="close"
    />
  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb";
import ImagePreview from "@/components/ImagePreview";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
import { getStepList, getImg } from "@/api/index";
import { RESOURCE_BASE_URL } from "@/utils/resource";

import bgDev from "@/assets/img/rd1.jpeg";
import bgEquip from "@/assets/img/rd2.jpeg";
import bgProperty from "@/assets/img/rd3.jpeg";
import bgQualification from "@/assets/img/rd4.jpeg";

const PROPERTY_TABS = [
  { table: "Global Patent", type: 21 },
  { table: "Invention Patent", type: 22 },
  { table: "Utility Model Patent", type: 23 },
];

export default {
  name: "RDCenter",
  components: { Breadcrumb, ImagePreview, Swiper, SwiperSlide },
  data() {
    return {
      RESOURCE_BASE_URL,
      bgDev,
      bgEquip,
      bgProperty,
      bgQualification,
      // 桌面端：无内置导航元素，靠触摸/鼠标拖动切换
      swiperOpen: {
        slidesPerView: "auto",
        spaceBetween: 6,
      },
      swiperOpenBanner: {
        delay: 5000,
        touchRatio: 1,
        paginationType: "fraction",
        pagination: { el: ".swiper-pagination", type: "fraction" },
      },
      activeNames: [],
      currentIndex: 0,
      transform: { transformPage: "0", transform: "0" },
      imgList: [],
      pictureVisible: false,
      index: 0,
      k: "",
      activeIndex: 0,
      stepList: [],
      propertyData: [],
      equipment: [],
      qualification: [],
    };
  },
  created() {
    this.getImgData({ n: "equipment", type: 3 });
    this.getImgData({ n: "qualification", type: 9 });
    this.getStepData();
    this.getPropertyData();
  },
  methods: {
    handleChange(val) {
      this.activeNames = val;
    },
    getStepData() {
      getStepList().then((res) => {
        this.stepList = res.data || [];
      });
    },
    getImgData({ n, type }) {
      return getImg({ type }).then((res) => {
      const data = res.data || [];
      if (n) this[n] = data;
      return data;
      });
    },
    getPropertyData() {
    Promise.all(
      PROPERTY_TABS.map(({ table, type }) =>
        this.getImgData({ type }).then((list) => ({ table, list }))
      )
    ).then((data) => {
      this.propertyData = data;
    });
  },
  tabs(index) {
    this.activeIndex = index;
  },
    clickIcon(type) {
      const len = this.stepList.length;
      const px = (refName) => {
        const el =
          this.$refs[refName] && this.$refs[refName][this.currentIndex];
        if (!el) return 0;
        const w = window.getComputedStyle(el).width;
        const p = w.indexOf("p");
        return this.currentIndex * w.substring(0, p);
      };

      if (type === "next") {
        this.currentIndex++;
        if (this.currentIndex > len - 1) this.currentIndex = len - 1;
        if (this.currentIndex < len - 3) {
          this.transform.transformPage = ~px("swiperBtn") + "px";
        }
      } else if (type === "prev") {
        if (this.currentIndex === 0) {
          this.currentIndex = 0;
          this.transform.transformPage = "0px";
        } else {
          this.currentIndex--;
        }
        if (this.currentIndex < len - 3) {
          this.transform.transformPage = ~px("swiperBtn") + "px";
        }
      } else if (type === "nextMin") {
        this.currentIndex++;
        if (this.currentIndex > len - 1) this.currentIndex = len - 1;
        if (this.currentIndex < len - 1) {
          this.transform.transformPage = ~px("swiperBtnMin") + "px";
        }
      } else if (type === "prevMin") {
        if (this.currentIndex === 0) {
          this.currentIndex = 0;
          this.transform.transformPage = "0px";
        } else {
          this.currentIndex--;
        }
        if (this.currentIndex < len - 1) {
          this.transform.transformPage = ~px("swiperBtnMin") + "px";
        }
      }
    },
    openPreviewPicture(list, index = 0, k) {
      this.pictureVisible = true;
      this.imgList = list;
      this.index = index;
      this.k = k;
      const prevent = (e) => e.preventDefault();
      document.body.style.overflow = "hidden";
      document.addEventListener("touchmove", prevent, false);
    },
    close() {
      this.pictureVisible = false;
      const prevent = (e) => e.preventDefault();
      document.body.style.overflow = "auto";
      document.removeEventListener("touchmove", prevent, true);
    },
  },
};
</script>

<!-- 关键：不加 scoped，因为要作用于 swiper 运行时生成的内层 DOM -->
<style lang="scss">
/* ============== 通用 ============== */
.swiper-container {
  z-index: 0;
  width: 100%;
}

/* ============== 响应式显隐 ============== */
@media (min-width: 768px) {
  .r_d_conter_property_collapse,
  .swiper-min {
    display: none;
  }
}
@media (max-width: 768px) {
  .swiper-max {
    display: none;
  }
  .r_d_conter_equipment .askatek-title,
  .r_d_conter_property .askatek-title,
  .r_d_conter_qualification .askatek-title {
    padding-left: 0 !important;
  }

  .r_d_conter_property .r_d_conter_property_main {
    display: none;
  }
  .r_d_conter_development_course,
  .r_d_conter_equipment,
  .r_d_conter_property,
  .r_d_conter_qualification {
    padding: 0 15px;
  }
  .r_d_conter_property_collapse {
    padding: 0 !important;
  }
  .r_d_conter_equipment_list,
  .r_d_conter_qualification_list {
    margin-top: 25px !important;
  }
  .r_d_conter_equipment_list li,
  .r_d_conter_qualification_list li {
    width: 50% !important;
    padding: 6px !important;
  }
  .r_d_conter_equipment_list li .r_d_conter_equipment_list_item,
  .r_d_conter_equipment_list li .r_d_conter_equipment_list_item img,
  .r_d_conter_qualification_list li .r_d_conter_equipment_list_item,
  .r_d_conter_qualification_list li .r_d_conter_equipment_list_item img {
    width: 100%;
    height: 100%;
  }
  .r_d_conter_equipment .r_d_conter_equipment_list {
    margin-bottom: 30px !important;
  }
  .r_d_conter_qualification .r_d_conter_qualification_list {
    margin-bottom: 80px !important;
  }
  .r_d_conter_development_course .swiper-slide {
    width: 100% !important;
  }
}

/* ============== Equipments / Qualification ============== */

.r_d_conter_equipment {
  background-position: 50%;
  background-repeat: no-repeat;
  background-attachment: inherit;
  background-size: cover;
  color: #fff;
}
/* global.css 中 .warp .container .askatek-title（特异性 0,3,0）设了 max-height/line-height 56px 和
   margin:60px 0 0，这里用更高特异性覆盖：行高改 1.2 让白色下划线紧贴文字；顶部 60px 间距由 .img1 padding 承担 */
.r_d_conter_equipment .warp .container .askatek-title {
  color: #fff !important;
  height: auto;
  max-height: none;
  line-height: 1.2;
  margin: 0 0 7px;
  padding-bottom: 0;
}
.r_d_conter_equipment .warp .container .askatek-title:after {
  background-color: #fff !important;
}

/* 区块纵向留白：标题距顶 60px，证书到底部 100px（按设计稿实测） */
.r_d_conter_equipment .img1 {
  padding: 60px 0 100px;
}

.r_d_conter_equipment
  .r_d_conter_equipment_list
  .r_d_conter_equipment_list_item,
.r_d_conter_equipment
  .r_d_conter_equipment_list
  .r_d_conter_equipment_list_item
  img {
  height: 100%;
}

/* ============== Intellectual Property 大区块 ============== */
.r_d_conter_property {
  background-position: 50%;
  background-repeat: no-repeat;
  background-attachment: inherit;
  background-size: cover;
  color: #fff;
}
/* global.css 中 .warp .container .askatek-title（特异性 0,3,0）设了 max-height/line-height 56px 和
   margin:60px 0 0，这里用更高特异性覆盖：行高改 1.2 让白色下划线紧贴文字；顶部 60px 间距由 .img1 padding 承担 */
.r_d_conter_property .warp .container .askatek-title {
  color: #fff !important;
  height: auto;
  max-height: none;
  line-height: 1.2;
  margin: 0 0 7px;
  padding-bottom: 0;
}
.r_d_conter_property .warp .container .askatek-title:after {
  background-color: #fff !important;
}

/* 区块纵向留白：标题距顶 60px，证书到底部 100px（按设计稿实测） */
.r_d_conter_property .img1 {
  padding: 60px 0 100px;
}

/* --- 桌面端：单层 swiper，一张证书一个 slide --- */
.r_d_conter_property .r_d_conter_property_list {
  margin-bottom: 0;
}
.r_d_conter_property .r_d_conter_property_list li {
  display: block;
  width: 100%;
  padding: 0;
  overflow: hidden;
}
/* 每张证书 slide：固定 235 宽，高度随证书比例自适应（占位图 480x640 → 约 313px 高） */
.r_d_conter_property .r_d_conter_property_list .swiper-slide {
  width: 235px !important;
  height: auto;
}
.r_d_conter_property .r_d_conter_property_list .swiper-slide img {
  display: block;
  width: 100%;
  height: auto;
  object-fit: contain;
  cursor: pointer;
}
.r_d_conter_property .el-collapse-item__content {
  padding: 0;
}

/* --- 移动端 collapse --- */
.r_d_conter_property_collapse {
  padding: 0 15px;
  margin-top: 60px;
  margin-bottom: 80px;
}
/* 移动端 collapse：单层 swiper，图片保比例铺满 */
.r_d_conter_property_collapse .r_d_conter_property_list_item {
  width: 100% !important;
  padding-bottom: 20px;
}
.r_d_conter_property_collapse .r_d_conter_property_list_item .swiper-slide img {
  display: block;
  width: 100%;
  height: auto;
  object-fit: contain;
}
.r_d_conter_property_collapse .swiper-pagination {
  position: static;
  margin-top: 2px;
  color: #fff;
}
.r_d_conter_property_collapse .el-collapse {
  border: none;
}
.r_d_conter_property_collapse .el-collapse-item {
  margin-bottom: 29px;
}
.r_d_conter_property_collapse .el-collapse-item .el-collapse-item__header {
  color: #000;
  font-size: 14px;
  border-radius: 10px;
  padding: 8px 5px;
  border: 0;
  background: #fafafa;
  line-height: normal;
  height: auto;
  font-weight: 400;
}
.r_d_conter_property_collapse .el-collapse-item .is-active {
  color: #fff;
  background: #094b7c;
}
.r_d_conter_property_collapse .el-collapse-item div[role="tab"] {
  margin-bottom: 20px;
}
.r_d_conter_property_collapse .el-collapse-item__wrap {
  background: none;
  border-bottom: 0;
}

/* =============== Company Qualification 大区块 ============== */
.r_d_conter_qualification {
  background-position: 50%;
  background-repeat: no-repeat;
  background-attachment: inherit;
  background-size: cover;
  color: #fff;
}

.r_d_conter_qualification .warp .container .askatek-title {
  color: #fff !important;
  height: auto;
  max-height: none;
  line-height: 1.2;
  margin: 0 0 7px;
  padding-bottom: 0;
}

.r_d_conter_qualification .img1 {
  padding: 60px 0 100px;
}

.r_d_conter_qualification .warp .container .askatek-title:after {
  background-color: #fff !important;
}

/* ============== Products development footprint ============== */
.r_d_conter_development_course {
  background-position: 50%;
  background-repeat: no-repeat;
  background-attachment: inherit;
  background-size: cover;
  color: #fff;
}
/* global.css 中 .warp .container .askatek-title（特异性 0,3,0）设了 max-height/line-height 56px 和
   margin:60px 0 0，这里用更高特异性覆盖：行高改 1.2 让白色下划线紧贴文字；顶部 60px 间距由 .img1 padding 承担 */
.r_d_conter_development_course .warp .container .askatek-title {
  color: #fff !important;
  height: auto;
  max-height: none;
  line-height: 1.2;
  margin: 0 0 7px;
  padding-bottom: 0;
}
.r_d_conter_development_course .warp .container .askatek-title:after {
  background-color: #fff !important;
}

/* 区块纵向留白：标题距顶 60px，证书到底部 100px（按设计稿实测） */
.r_d_conter_development_course .img1 {
  padding: 60px 0 100px;
}

.r_d_conter_development_course .container {
  max-width: 1200px !important;
}
.r_d_conter_development_course .swiper-max {
  width: 100%;
  height: 100%;
  z-index: 1;
  overflow: hidden;
  margin-top: 30px;
}
.r_d_conter_development_course .swiper-max .swiper-max-swiper {
  width: 100%;
  height: auto;
  z-index: 1;
  display: flex;
  transition-property: transform;
  box-sizing: content-box;
}
.r_d_conter_development_course .swiper-max .gallery-top {
  width: 294px !important;
  flex-shrink: 0;
  padding: 8px;
  animation: slideInUp 1s 0.04s 1;
}
.r_d_conter_development_course .swiper-max .gallery-top .gallery-top-conter {
  height: 100%;
  box-shadow: 3px 3px 9px 2px rgba(0, 0, 0, 0.039);
  border-radius: 10px;
  display: flex;
  background: #fff;
  flex-direction: column;
  text-align: center;
  width: 100%;
}
.r_d_conter_development_course
  .swiper-max
  .gallery-top
  .gallery-top-conter
  .gallery-top-conter-imgs {
  width: 100%;
  height: 100%;
}
.r_d_conter_development_course
  .swiper-max
  .gallery-top
  .gallery-top-conter
  .gallery-top-conter-imgs
  img {
  width: 53%;
  height: auto;
  border-radius: 10px;
}
.r_d_conter_development_course
  .swiper-max
  .gallery-top
  .gallery-top-conter
  .gallery-top-title {
  padding: 20px 10px 30px;
  color: #545353;
  font-size: 14px;
  line-height: 1.5;
  position: relative;
  margin-top: 10px;
}
.r_d_conter_development_course
  .swiper-max
  .gallery-top
  .gallery-top-conter
  .gallery-top-title
  span {
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
}
.r_d_conter_development_course
  .swiper-max
  .gallery-top
  .gallery-top-conter
  .active {
  color: #00589f;
}

.r_d_conter_development_course .gallery-thumbs {
  width: 100%;
  margin-bottom: 60px;
  position: relative;
}
.r_d_conter_development_course .gallery-thumbs .gallery-thumbs-conter {
  display: flex;
}
.r_d_conter_development_course .gallery-thumbs .production-swiper-button-prev,
.r_d_conter_development_course .gallery-thumbs .production-swiper-button-next {
  position: absolute;
  top: 50%;
  z-index: 10;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--swiper-navigation-color, var(--swiper-theme-color));
  background: #f8f8f8;
}
.r_d_conter_development_course
  .gallery-thumbs
  .production-swiper-button-prev
  svg,
.r_d_conter_development_course
  .gallery-thumbs
  .production-swiper-button-next
  svg {
  width: 50px;
  height: 50px;
}
.r_d_conter_development_course .gallery-thumbs .production-swiper-button-prev,
.r_d_conter_development_course .gallery-thumbs .production-swiper-button-next {
  margin-top: -34px !important;
}
.r_d_conter_development_course .gallery-thumbs .production-swiper-button-prev {
  left: 0;
}
.r_d_conter_development_course .gallery-thumbs .production-swiper-button-next {
  right: -2px;
}
.r_d_conter_development_course .gallery-thumbs .gallery-thumbs-list {
  width: 294px;
  animation: slideInUp 1s 0.03s 1;
  padding: 12px;
  margin: 0 !important;
  flex-shrink: 0;
}
.r_d_conter_development_course .gallery-thumbs .gallery-thumbs-list .text {
  display: flex;
  position: relative;
  flex-direction: column;
  overflow: hidden;
}
.r_d_conter_development_course
  .gallery-thumbs
  .gallery-thumbs-list
  .text-body
  .title {
  color: #fff;
  font-size: 18px;
  line-height: 1.5;
  text-align: center;
  position: relative;
  display: flex;
  justify-content: center;
  padding-top: 11px;
}
.r_d_conter_development_course
  .gallery-thumbs
  .gallery-thumbs-list
  .text-body
  .title
  .content {
  width: 5px;
  height: 5px;
  background-color: #333;
  border-radius: 50%;
  margin: 20px !important;
  display: inline-block;
}
.r_d_conter_development_course
  .gallery-thumbs
  .gallery-thumbs-list
  .text-body
  .title
  .content:before {
  content: "";
  width: 40%;
  height: 1px;
  background: rgba(0, 0, 0, 0.1);
  display: inline-block;
  vertical-align: middle;
  position: absolute;
  left: 0;
}
.r_d_conter_development_course
  .gallery-thumbs
  .gallery-thumbs-list
  .text-body
  .title
  .content:after {
  content: "";
  width: 40%;
  height: 1px;
  background: rgba(0, 0, 0, 0.1);
  display: inline-block;
  vertical-align: middle;
  position: absolute;
  right: 0;
}
.r_d_conter_development_course
  .gallery-thumbs
  .gallery-thumbs-list
  .text-body
  .title
  p {
  display: none;
}
.r_d_conter_development_course
  .gallery-thumbs
  .gallery-thumbs-list
  .text-body
  .desc {
  margin-top: 0;
  color: #404040;
  font-size: 14px;
  line-height: 1.5;
  text-align: center;
}
.r_d_conter_development_course
  .gallery-thumbs
  .gallery-thumbs-list
  .text-body
  .desc
  .content {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.r_d_conter_development_course
  .gallery-thumbs
  .gallery-thumbs-list
  .text-body
  .desc
  .content
  p {
  margin-top: 0;
  color: #404040;
  font-size: 14px;
  line-height: 1.5;
  text-align: center;
}
.r_d_conter_development_course
  .gallery-thumbs
  .swiper-slide-active
  .text-body
  .title {
  padding: 0;
}
.r_d_conter_development_course
  .gallery-thumbs
  .swiper-slide-active
  .title:before {
  content: "";
  width: 1px;
  height: 51px;
  background: rgba(0, 0, 0, 0.1);
  display: inline-block;
  position: absolute;
  left: 50%;
  top: -45px;
}
.r_d_conter_development_course
  .gallery-thumbs
  .swiper-slide-active
  .title
  .content {
  width: 5px;
  height: 5px;
  border: 2px solid #094b7c;
  padding: 9px;
  background-color: #094b7c !important;
  border-radius: 50%;
}

.r_d_conter_development_course .swiper-min {
  width: 100%;
  height: 100%;
  z-index: 1;
  overflow: hidden;
}
.r_d_conter_development_course .swiper-min .gallery-thumbs {
  margin-bottom: 48px;
}
.r_d_conter_development_course .swiper-min .swiper-max-swiper {
  width: 100%;
  height: auto;
  z-index: 1;
  display: flex;
  transition-property: transform;
  box-sizing: content-box;
}
.r_d_conter_development_course .swiper-min .swiper-max-swiper .gallery-top {
  flex-shrink: 0;
  width: 100%;
  min-height: 300px;
  margin-top: 40px;
}
.r_d_conter_development_course
  .swiper-min
  .swiper-max-swiper
  .gallery-top
  .gallery-top-conter {
  display: flex;
  height: 100%;
  flex-direction: column;
  background: #fff;
  box-shadow: 3px 3px 9px 2px rgba(0, 0, 0, 0.039);
  border-radius: 10px;
  text-align: center;
}
.r_d_conter_development_course
  .swiper-min
  .swiper-max-swiper
  .gallery-top
  .gallery-top-conter
  .gallery-top-conter-imgs {
  display: flex;
  justify-content: center;
}
.r_d_conter_development_course
  .swiper-min
  .swiper-max-swiper
  .gallery-top
  .gallery-top-conter
  .gallery-top-conter-imgs
  img {
  width: 58%;
  border-radius: 10px;
}
.r_d_conter_development_course
  .swiper-min
  .swiper-max-swiper
  .gallery-top
  .gallery-top-conter
  .gallery-top-title {
  padding: 20px 10px 15px;
  color: #00589f;
  font-size: 14px;
  line-height: 1.5;
}

/* ============== 三个区块通用：标题 / 容器 / hover ============== */
.r_d_conter_equipment .askatek-title,
.r_d_conter_property .askatek-title,
.r_d_conter_qualification .askatek-title {
  padding-left: 9px;
  padding-bottom: 5px;
}
.r_d_conter_equipment .container,
.r_d_conter_property .container,
.r_d_conter_qualification .container {
  max-width: 1200px !important;
  padding: 0 !important;
}
.r_d_conter_equipment .r_d_conter_equipment_list img:hover,
.r_d_conter_property .r_d_conter_equipment_list img:hover,
.r_d_conter_qualification .r_d_conter_equipment_list img:hover {
  transform: scale(1.1);
}
/* 注意：.r_d_conter_property .r_d_conter_property_list 的底部留白由 .img1 padding-bottom 统一处理 */
.r_d_conter_equipment .r_d_conter_property_list,
.r_d_conter_qualification .r_d_conter_property_list {
  margin-bottom: 60px;
}

.r_d_conter_equipment .r_d_conter_equipment_list,
.r_d_conter_equipment .r_d_conter_qualification_list,
.r_d_conter_property .r_d_conter_equipment_list,
.r_d_conter_property .r_d_conter_qualification_list,
.r_d_conter_qualification .r_d_conter_equipment_list,
.r_d_conter_qualification .r_d_conter_qualification_list {
  margin-top: 30px;
  margin-bottom: 60px;
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  overflow: hidden;
}
.r_d_conter_equipment .r_d_conter_equipment_list li,
.r_d_conter_equipment .r_d_conter_qualification_list li,
.r_d_conter_property .r_d_conter_equipment_list li,
.r_d_conter_property .r_d_conter_qualification_list li,
.r_d_conter_qualification .r_d_conter_equipment_list li,
.r_d_conter_qualification .r_d_conter_qualification_list li {
  padding: 9px 9px 20px;
  width: 25%;
  box-sizing: border-box;
  overflow: hidden;
}
.r_d_conter_equipment .r_d_conter_equipment_list li img,
.r_d_conter_equipment .r_d_conter_qualification_list li img,
.r_d_conter_property .r_d_conter_equipment_list li img,
.r_d_conter_property .r_d_conter_qualification_list li img,
.r_d_conter_qualification .r_d_conter_equipment_list li img,
.r_d_conter_qualification .r_d_conter_qualification_list li img {
  width: 100%;
  cursor: pointer;
  transition: all 0.3s ease;
}
.r_d_conter_equipment .r_d_conter_property_tabs,
.r_d_conter_property .r_d_conter_property_tabs,
.r_d_conter_qualification .r_d_conter_property_tabs {
  margin-bottom: 55px;
  margin-top: 5px;
}
.r_d_conter_equipment .property_tabs_btn,
.r_d_conter_property .property_tabs_btn,
.r_d_conter_qualification .property_tabs_btn {
  /* 设计稿实测：按钮高约 38px、圆角 8px */
  margin-right: 24px;
  color: #999;
  font-size: 14px;
  border-radius: 8px;
  padding: 9px 22px;
  border: 1px solid #fafafa;
  background: #fafafa;
  line-height: 1.2;
  display: inline-block;
}
.r_d_conter_equipment .property_tabs_btn:hover,
.r_d_conter_equipment .property_tabs_btn_active,
.r_d_conter_property .property_tabs_btn:hover,
.r_d_conter_property .property_tabs_btn_active,
.r_d_conter_qualification .property_tabs_btn:hover,
.r_d_conter_qualification .property_tabs_btn_active {
  color: #fff;
  background: #094b7c;
  border: 1px solid #094b7c;
}

@keyframes slideInUp {
  from {
    transform: translate3d(0, 100%, 0);
    visibility: visible;
  }
  to {
    transform: translate3d(0, 0, 0);
  }
}
</style>
