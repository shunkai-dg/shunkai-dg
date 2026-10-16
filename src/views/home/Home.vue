<template>
  <div class="home">
    <!-- 1. 轮播 banner：工厂主视觉（图集来自 imgs.json type=1） -->
    <div class="swiper-banner" v-if="reRender">
      <swiper class="swiper" ref="mySwiper" :options="swiperOpenBanner">
        <swiper-slide v-for="(item, index) in dataList" :key="index">
          <img :src="RESOURCE_BASE_URL + item.img_path" alt="" />
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

    <!-- 2. 主打加工能力：精选产品/案例（is_top=1） -->
    <div class="home-container">
      <h2 class="home-container_title">{{ $t("home.starProducts") }}</h2>
      <p class="home-container_desc">{{ $t("home.starProductsDesc") }}</p>
      <ul class="loop-container">
        <li class="loop-item" v-for="item in productsData.list" :key="item.id">
          <div class="loop-item__wrapper">
            <div class="product_center_l_item_img">
              <p class="loop-item_title">{{ item.title }}</p>
              <p class="loop-item_desc">{{ item.sub_title }}</p>
              <img
                class="loop-item_img"
                v-if="item.imgs && item.imgs[0]"
                :src="RESOURCE_BASE_URL + item.imgs[0]"
                alt=""
              />
              <button class="loop-item_btn" @click="jumpProductDetail(item)">
                {{ $t("common.more") }}
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <!-- 3. 两段加工能力介绍（图片 + 文案，文案走 i18n） -->
    <div class="home_product">
      <div class="product_item" v-for="item in productsIntroduce" :key="item.id">
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
              {{ $t("common.more") }}
            </button>
          </div>
        </div>
        <div class="product_wrapper_min">
          <div class="product_introduce">
            <p class="product_comp-content">{{ item.content }}</p>
            <p class="product_desc">{{ item.desc }}</p>
            <button class="product_button" @click="jumpProductDetail(item)">
              {{ $t("common.more") }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 4. 工厂实力简介（车间实拍 + 关键数据） -->
    <div class="home_factory">
      <div class="home_factory_inner">
        <p class="home_factory_eyebrow">{{ $t("home.factory.eyebrow") }}</p>
        <h2 class="home_factory_title">{{ $t("home.factory.title") }}</h2>
        <p class="home_factory_desc">{{ $t("home.factory.desc") }}</p>

        <ul class="home_factory_stats">
          <li v-for="(s, i) in factoryStats" :key="i">
            <strong>{{ s.value }}</strong>
            <span>{{ s.label }}</span>
          </li>
        </ul>

        <ul class="home_factory_gallery">
          <li v-for="(img, i) in factoryImgs" :key="i">
            <img
              :src="RESOURCE_BASE_URL + img.img_path"
              :alt="$t('home.factory.title')"
            />
          </li>
        </ul>
      </div>
    </div>

    <!-- 5. 联系入口 -->
    <div class="home_contact">
      <div class="home_contact_inner">
        <h2 class="home_contact_title">{{ $t("home.contact.title") }}</h2>
        <p class="home_contact_desc">{{ $t("home.contact.desc") }}</p>
        <div class="home_contact_actions">
          <button class="home_contact_btn" @click="jumpContact">
            {{ $t("home.contact.button") }}
          </button>
          <a class="home_contact_tel" :href="'tel:' + telephone">
            <i class="el-icon-phone-outline"></i>{{ telephone }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "./home.css";
// v4.1.1 的 ESM 导出为 PascalCase（Swiper/SwiperSlide），Vue 会自动匹配 <swiper> 标签
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import { getImg, getProductList, getSetting } from "@/api/index";
import { RESOURCE_BASE_URL } from "@/utils/resource";

import swiperLeft from "@/assets/img/swiperLeft.png";
import swiperRight from "@/assets/img/swiperRight.png";
// 主打加工能力介绍配图：直接取车间实拍（img_data 为静态目录，构建时原样复制到 dist）
const factoryMain = "img_data/factory/mould-workshop.jpg";
const factorySmall = "img_data/equipment/production-line.jpg";

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
      telePhoneFallback: "+86 13712578616",
      setting: {},
      productsData: { list: [] },
      factoryImgs: [],
      // 硬编码加工能力介绍：图片与外链分类 id 常驻 data，文案走 i18n（computed productsIntroduce）
      introImgs: [
        {
          id: 101,
          cat_one: 1,
          url: RESOURCE_BASE_URL + factoryMain,
          minUrl: RESOURCE_BASE_URL + factorySmall,
          key: "cosmetics",
        },
        {
          id: 201,
          cat_one: 2,
          url: RESOURCE_BASE_URL + factorySmall,
          minUrl: RESOURCE_BASE_URL + factoryMain,
          key: "electronics",
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
    telephone() {
      return this.setting.telephone || this.telePhoneFallback;
    },
    // 加工能力介绍：文案随语言切换即时更新（图片/分类 id 保持原值）
    productsIntroduce() {
      return this.introImgs.map((item) => ({
        ...item,
        content: this.$t("home.intro." + item.key + ".content"),
        desc: this.$t("home.intro." + item.key + ".desc"),
      }));
    },
    // 工厂关键数据
    factoryStats() {
      return [
        {
          value: this.$t("home.factory.stats.area.value"),
          label: this.$t("home.factory.stats.area.label"),
        },
        {
          value: this.$t("home.factory.stats.machines.value"),
          label: this.$t("home.factory.stats.machines.label"),
        },
        {
          value: this.$t("home.factory.stats.mouldLife.value"),
          label: this.$t("home.factory.stats.mouldLife.label"),
        },
      ];
    },
  },
  created() {
    this.getImg({ n: "dataList", type: 1 });
    this.getImg({ n: "factoryImgs", type: 15 });
    this.getProductTopList();
    getSetting().then((res) => {
      this.setting = (res && res.data) || {};
    });
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
      getImg({ type: String(type) }).then((res) => {
        this[n] = res.data || [];
      });
    },
    jumpProductDetail(item) {
      this.$router.push({
        name: "product_center_detail",
        query: {
          id: item.id,
          hierarchy: item.cat_four || item.cat_three || item.cat_two || item.cat_one,
        },
      });
    },
    jumpContact() {
      this.$router.push({ name: "contact_us" });
    },
  },
};
</script>
