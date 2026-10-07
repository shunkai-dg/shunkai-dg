<template>
  <div class="home">
    <!-- 1. 轮播 banner：reRender 开关配合 activated 强制重建 swiper -->
    <div class="swiper-banner" v-if="reRender">
      <swiper class="swiper" ref="mySwiper" :options="swiperOpenBanner">
        <swiper-slide v-for="(item, index) in dataList" :key="index">
          <img :src="item.img_path" alt="" />
        </swiper-slide>
        <div class="swiper-button-prev" slot="button-prev">
          <img :src="swiperLeft" alt="prev" />
        </div>
        <div class="swiper-button-next" slot="button-next">
          <img :src="swiperRight" alt="next" />
        </div>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
    <!-- 2. Star products 区：桌面端四列；移动端（<750px）单排横向滑动 -->
    <div class="home-container">
      <h2 class="home-container_title">{{ productsData.title }}</h2>
      <p class="home-container_desc">{{ productsData.desc }}</p>
      <ul class="loop-container">
        <li class="loop-item" v-for="item in productsData.list" :key="item.id">
          <div class="loop-item__wrapper">
            <p class="loop-item_title">{{ item.title }}</p>
            <p class="loop-item_desc">{{ item.sub_title }}</p>
            <button class="loop-item_btn" @click="jumpProductDetail(item)">
              MORE
            </button>
            <div class="product_center_l_item_img">
              <img
                class="loop-item_img"
                v-if="item.imgs && item.imgs[0]"
                :src="RESOURCE_BASE_URL + item.imgs[0]"
                alt=""
              />
            </div>
          </div>
        </li>
      </ul>
    </div>
    <!-- 3. 产品介绍区（硬编码数据，非接口） -->
    <div class="home_product">
      <div
        class="product_item"
        v-for="item in productsIntroduce"
        :key="item.id"
      >
        <div class="product_bg">
          <div
            class="product_bg_img product_bg_max_img"
            :style="{ backgroundImage: 'url(' + item.url + ')' }"
          ></div>
          <div
            class="product_bg_img product_bg_min_img"
            :style="{ backgroundImage: 'url(' + item.minUrl + ')' }"
          ></div>
          <div class="product_bg_color"></div>
        </div>
        <div class="product_wrapper">
          <div class="product_introduce">
            <p class="product_comp-content">{{ item.content }}</p>
            <p class="product_desc">{{ item.desc }}</p>
            <button class="product_button" @click="jumpProductDetail(item)">
              MORE
            </button>
          </div>
        </div>
        <div class="product_wrapper_min">
          <div class="product_introduce">
            <p class="product_comp-content">{{ item.content }}</p>
            <p class="product_desc">{{ item.desc }}</p>
            <button class="product_button" @click="jumpProductDetail(item)">
              MORE
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 反推来源：chunk-0a71ae93.0d3a92ef.js（模板结构/数据/方法名一致）
// 样式：home.css（由 chunk-0a71ae93.fcfe289d.css 剥离 data-v 属性转写）
import "./home.css";
// v4.1.1 的 ESM 导出为 PascalCase（Swiper/SwiperSlide），Vue 会自动匹配 <swiper> 标签
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import { getImg, getProductList } from "@/api/index";
import { RESOURCE_BASE_URL } from "@/utils/resource";

import swiperLeft from "@/assets/img/swiperLeft.png";
import swiperRight from "@/assets/img/swiperRight.png";
import product1 from "@/assets/img/product1.png";
import productMin1 from "@/assets/img/product-min1.png";
import product2 from "@/assets/img/product2.png";
import productMin2 from "@/assets/img/product-min2.png";

export default {
  name: "Home",
  components: { Swiper, SwiperSlide },
  data() {
    return {
      RESOURCE_BASE_URL,
      reRender: true,
      swiperLeft,
      swiperRight,
      dataList: [],
      productsData: { title: "Star products", desc: "", list: [] },
      // 硬编码产品介绍（原产物 id 17/16，url 对应 product1/2，minUrl 对应 product-min1/2）
      productsIntroduce: [
        {
          id: 17,
          cat_four: 29,
          cat_one: 1,
          cat_three: 10,
          cat_two: 3,
          url: product1,
          minUrl: productMin1,
          content: "CD sound quality for music fans",
          desc: "Hybird active noise canceling model with Ultra-high speed with aska A²NC technology",
        },
        {
          id: 16,
          cat_four: 29,
          cat_one: 1,
          cat_three: 10,
          cat_two: 3,
          url: product2,
          minUrl: productMin2,
          content: "NC07 wireless noise reduction headset",
          desc: "Extendable&rotation headband with metal frame/All day comfort using/Build iwt5h aska A²NC technology",
        },
      ],
      swiperOpenBanner: {
        loop: true,
        autoplay: {
          delay: 5000,
          stopOnLastSlide: false,
          disableOnInteraction: false,
          autoplayDisableOnInteraction: false,
        },
        pagination: { el: ".swiper-pagination", type: "fraction" },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper && this.$refs.mySwiper.swiper;
    },
  },
  created() {
    // 原产物：先 getImg 再 getProductTopList
    this.getImg({ n: "dataList", type: 1 });
    this.getProductTopList();
  },
  activated() {
    // keep-alive 下强制重建 swiper
    this.reRender = false;
    setTimeout(() => {
      this.reRender = true;
    }, 100);
  },
  methods: {
    getProductTopList() {
      getProductList({ is_top: 1 }).then((res) => {
        this.productsData.list = res.data.list;
      });
    },
    getImg({ n, type }) {
      getImg({ type: "1" }).then((res) => {
        this[n] = res.data || [];
      });
    },
    jumpProductDetail(item) {
      this.$router.push({
        name: "product_center_detail",
        query: {
          id: item.id,
          hierarchy:
            item.cat_four || item.cat_three || item.cat_two || item.cat_one,
        },
      });
    },
  },
};
</script>
