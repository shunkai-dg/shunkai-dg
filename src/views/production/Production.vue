<template>
  <div>
    <Breadcrumb />
    <div class="production_warp warp">
      <div class="production_container container">
        <div class="askatek-title"><p>Production Capacity</p></div>
        <div class="production_tab">
          <div class="production_tabs">
            <button
              v-for="(item, index) in tabsList"
              :key="index"
              :class="[
                'production_tabs_btn',
                activeIndex === index && 'production_tabs_btn_active',
              ]"
              @click="tabs(index)"
              @mouseover="mouseoverBtn(index)"
              @mouseleave="hover = false"
            >
              <img
                :src="
                  activeIndex === index || hover ? HighlightIcon : defaultIcon
                "
              />
              <span>{{ item }}</span>
            </button>
          </div>

          <div
            v-for="(block, index) in productionData"
            v-show="activeIndex === index"
            :key="index"
            class="production_center"
          >
            <div class="production_center_l">
              <ul>
                <li v-for="(text, i) in block.list" :key="i">{{ text }}</li>
              </ul>
            </div>

            <div class="production_center_r">
              <!-- 有图才渲染 swiper，避免空实例 -->
              <swiper
                v-if="block.img.length"
                :ref="'swiper' + index"
                class="swiper-banner"
                :options="swiperOptions[index]"
              >
                <swiper-slide v-for="(img, i) in block.img" :key="i">
                  <img
                    :src="normalizeUrl(img)"
                    @load="updateSwiper(index)"
                    @error="updateSwiper(index)"
                  />
                </swiper-slide>
                <div
                  class="swiper-pagination"
                  :class="'swiper-pagination-' + index"
                  slot="pagination"
                ></div>
              </swiper>

              <p v-else class="img_tip">No image</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
import { getImg } from "@/api/index";

// 原 chunk 资源映射：
// 7d81 -> static/img/6.c839cceb.png（Highlight）
// d297 -> static/img/5.2f829764.png（default）
import HighlightIcon from "@/assets/img/Production1.png";
import defaultIcon from "@/assets/img/Production2.png";

export default {
  name: "Production",
  components: { Breadcrumb, Swiper, SwiperSlide },
  data() {
    return {
      HighlightIcon,
      defaultIcon,
      hover: false,
      activeIndex: 0,
      tabsList: ["Dongguan Factory", "Thailand Factory (On-going plan) "],
      productionData: [
        {
          list: [
            "Factory size : 25000 ㎡",
            "Factory address: No.5 Puxin Road, Keyuancheng Industrial Park, Tangxia Town, Dongguan, Guangdong , China PRC. 523725",
            "Total Capacity：800K/Month (Headphones+TWS Earphones)",
          ],
          img: [],
        },
        {
          list: [
            "Factory size: 50000 ㎡ （ Ground Size ）",
            "Factory address:  Road G8 / 1, THAI-CHINESE Rayong Industrial Park, Rayong, Thailand",
            "Workers：1200 people",
            "Managerial staff: 40 people",
            "Headcount: 1240 people",
          ],
          img: [],
        },
      ],
    };
  },
  computed: {
    // 每个 tab 使用独立的分页选择器，避免多实例互相抢元素
    swiperOptions() {
      return this.productionData.map((_, i) => ({
        observer: true,
        observeParents: true,
        autoHeight: true,
        delay: 5000,
        loop: false,
        touchRatio: 1,
        pagination: { el: ".swiper-pagination-" + i, type: "fraction" },
      }));
    },
  },
  created() {
    // type 15 -> 东莞工厂；type 16 -> 泰国工厂
    this.getImgData({ n: "img", type: 15, index: 0 });
    this.getImgData({ n: "img", type: 16, index: 1 });
  },
  methods: {
    // 与 AboutAska 中一致的数据获取方式
    getImgData({ n, type, index }) {
      getImg({ type }).then((res) => {
        this.productionData[index][n] = res.data || [];
        this.$nextTick(() => this.updateSwiper(index));
      });
    },

    // 兼容后端返回 string 或对象的情况
    normalizeUrl(item) {
      if (!item) return "";
      if (typeof item === "string") return item;
      return (
        item.img_path ||
        item.img ||
        item.image ||
        item.url ||
        item.path ||
        item.src ||
        ""
      );
    },

    mouseoverBtn(index) {
      if (this.activeIndex !== index) this.hover = true;
    },
    tabs(index) {
      this.activeIndex = index;
      this.hover = false;
      this.$nextTick(() => this.updateSwiper(index));
    },

    updateSwiper(index) {
      const ref = this.$refs["swiper" + index];
      const comp = Array.isArray(ref) ? ref[0] : ref;
      if (comp && comp.swiper) comp.swiper.update();
    },
  },
};
</script>

<style lang="scss" scoped>
/* chunk-2df0ac4a.c850a862.css 中 production 部分 */
.production_warp .production_container {
  display: flex;
  justify-content: right;
  flex-direction: column;
}
.production_tab {
  margin-top: 40px;
  margin-bottom: 80px;
}
.production_tabs {
  width: 100%;
  margin-bottom: 30px;
  display: flex;

  .production_tabs_btn {
    color: #000;
    font-size: 14px;
    border-radius: 0;
    padding: 8px 10px;
    border: 1px solid #000;
    background: #fff;
    margin-right: 10px;
    display: flex;
    justify-content: center;

    img {
      width: 20px;
      height: 20px;
    }
    span {
      padding: 0 5px;
    }

    &:hover,
    &.production_tabs_btn_active {
      color: #fff;
      background: #000;
      border: 1px solid #000;
    }
  }
}
.production_center {
  display: flex;
  background: #fff;
  padding: 20px;

  .production_center_l {
    width: 66.66%;
    margin-top: 30px;

    ul {
      display: flex;
      flex-direction: column;
      text-align: left;
      list-style-type: none;

      li {
        position: relative;
        padding: 4px 4px 4px 25px;
        color: #4e4d4d;
        font-size: 15px;
        line-height: 1.5;

        &:before {
          content: "";
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background-color: #094b7c;
          border: 5px solid #d6d7d8;
          display: block;
          position: absolute;
          left: 0;
          top: 7px;
        }
      }
    }
  }

  .production_center_r {
    width: 33.33333%;
    padding: 0 15px;

    .swiper-container {
      z-index: 0;
    }

    .swiper-slide {
      width: 100% !important;
      height: auto;
      img {
        width: 100%;
        height: auto;
        display: block;
        object-fit: cover;
      }
    }

    .swiper-pagination {
      position: static;
      margin-top: 10px;
      color: #333;
    }

    .img_tip {
      color: #999;
      font-size: 14px;
      text-align: center;
      margin: 20px 0;
    }
  }
}
@media (max-width: 768px) {
  .production_warp {
    padding: 0 15px;
  }
  .production_center {
    flex-direction: column;
  }
  .production_center_l,
  .production_center_r {
    width: 100% !important;
  }
  .production_center_r {
    padding: 0 !important;
  }
}
</style>
