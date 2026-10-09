<template>
  <div>
    <Breadcrumb class="breadcrumb_bg" />
    <div class="about_aska_warp">
      <ul class="about_aska_list">
        <li v-for="(item, index) in list" :key="index" class="about_aska_item">
          <div class="about_aska_item_r">
            <p class="about_aska_item_tip">{{ item.introduction }}</p>
            <div class="about_aska_item_title">
              <p>{{ item.title }}</p>
            </div>
            <p class="about_aska_item_desc">{{ item.desc }}</p>
          </div>
          <div class="about_aska_item_l">
            <img class="about_aska_item_img_max" :src="item.url" />
            <img class="about_aska_item_img_min" :src="item.minUrl" />
          </div>
        </li>
      </ul>

      <div class="about_aska_company_honor">
        <div class="container">
          <div class="askatek-title">
            <p>{{ $t("about.honor.title") }}</p>
          </div>
          <ul class="about_aska_company_honor_list">
            <li v-for="(item, index) in company_honor" :key="index">
              <img
                :src="item.img_path"
                @click="openPreviewPicture(company_honor, index, 'img_path')"
              />
            </li>
          </ul>
        </div>
      </div>

      <div class="about_aska_certifications">
        <div class="container">
          <div class="askatek-title">
            <p>{{ $t("about.certifications.title") }}</p>
          </div>
          <ul class="about_aska_company_honor_list">
            <li v-for="(item, index) in certifications" :key="index">
              <img
                :src="item.img_path"
                @click="openPreviewPicture(certifications, index, 'img_path')"
              />
            </li>
          </ul>
        </div>
      </div>

      <div class="about_aska_service_advantage">
        <div class="img1">
          <div class="container">
            <p class="title">{{ $t("about.advantage.title") }}</p>
            <ul>
              <li>
                <div class="about_aska_service_advantage_t">
                  <div class="about_aska_service_advantage_img">
                    <img :src="advImg1" />
                  </div>
                  <p class="about_aska_service_advantage_title">
                    {{ $t("about.advantage.value.title") }}
                  </p>
                </div>
                <div class="about_aska_service_advantage_b">
                  {{ $t("about.advantage.value.desc") }}
                </div>
              </li>
              <li>
                <div class="about_aska_service_advantage_t">
                  <div class="about_aska_service_advantage_img">
                    <img :src="advImg2" />
                  </div>
                  <p class="about_aska_service_advantage_title">
                    {{ $t("about.advantage.experience.title") }}
                  </p>
                </div>
                <div class="about_aska_service_advantage_b">
                  {{ $t("about.advantage.experience.desc") }}
                </div>
              </li>
              <li>
                <div class="about_aska_service_advantage_t">
                  <div class="about_aska_service_advantage_img">
                    <img :src="advImg3" />
                  </div>
                  <p class="about_aska_service_advantage_title">
                    {{ $t("about.advantage.professional.title") }}
                  </p>
                </div>
                <div class="about_aska_service_advantage_b">
                  {{ $t("about.advantage.professional.desc") }}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <ImagePreview
      v-if="pictureVisible"
      ref="img"
      :is-visible="pictureVisible"
      :index="activeIndex"
      :k="k"
      :img-list="imgList"
      @close="close"
    />
  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb";
import ImagePreview from "@/components/ImagePreview";
import { getImg } from "@/api/index";

// 静态图（原 chunk 资源映射）
import aboutImg1 from "@/assets/img/aboutImg1.png";
import aboutMin1 from "@/assets/img/min1.png";
import aboutImg2 from "@/assets/img/aboutImg2.png";
import aboutMin2 from "@/assets/img/min2.png";
import aboutImg3 from "@/assets/img/aboutImg3.png";
import aboutMin3 from "@/assets/img/min3.png";
import advImg1 from "@/assets/img/advImg1.png";
import advImg2 from "@/assets/img/advImg2.png";
import advImg3 from "@/assets/img/advImg3.png";

export default {
  name: "AboutAska",
  components: { Breadcrumb, ImagePreview },
  data() {
    return {
      imgList: [],
      pictureVisible: false,
      k: "",
      activeIndex: 0,
      company_honor: [],
      certifications: [],
      advImg1,
      advImg2,
      advImg3,
      // 图文介绍的图片（文案见 computed.list，走 i18n）
      introImgs: [
        { url: aboutImg1, minUrl: aboutMin1 },
        { url: aboutImg2, minUrl: aboutMin2 },
        { url: aboutImg3, minUrl: aboutMin3 },
      ],
    };
  },
  computed: {
    // 图文介绍：图片取静态资源，文案取 about.intro.item*（语言切换时自动更新）
    list() {
      return this.introImgs.map((image, index) => {
        const item = "about.intro.item" + (index + 1);
        return {
          url: image.url,
          minUrl: image.minUrl,
          introduction: this.$t(item + ".introduction"),
          title: this.$t(item + ".title"),
          desc: this.$t(item + ".desc"),
        };
      });
    },
  },
  created() {
    this.getImgData({ n: "company_honor", type: 13 });
    this.getImgData({ n: "certifications", type: 14 });
  },
  methods: {
    getImgData({ n, type }) {
      getImg({ type }).then((res) => {
        this[n] = res.data || [];
      });
    },
    openPreviewPicture(list, index = 0, k) {
      this.pictureVisible = true;
      this.imgList = list;
      this.activeIndex = index;
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

<style lang="scss" scoped>
/* =========================================================
 * 断点 / 主题变量
 * ======================================================= */
$bp-mobile: 768px;
$theme-blue: var(--accent);
$bg-gray: var(--bg);

/* =========================================================
 * 一、图文介绍
 *
 * 图片切换规则：
 *   .about_aska_item_img_max —— PC 端大图（默认显示）
 *   .about_aska_item_img_min —— 移动端小图（默认隐藏）
 *   在 768px 断点处整体互换，保证任意宽度下只有一张可见。
 * ======================================================= */
.about_aska_warp {
  width: 100%;
}

.about_aska_list {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.about_aska_item {
  display: flex;
  align-items: stretch;

  /* 奇数行：图片居左、文案居右
     （模板中文案 .r 在前、图片 .l 在后，row-reverse 把图片翻到左侧） */
  &:nth-of-type(odd) {
    background: $bg-gray;
    flex-direction: row-reverse;
  }

  /* 偶数行：文案居左、图片居右 */
  &:nth-of-type(even) {
    flex-direction: row;
  }

  /* ---------- 文案区 ---------- */
  .about_aska_item_r {
    flex: 0 0 50%;
    max-width: 50%;
    padding: 0 20px 0 50px;
    box-sizing: border-box;
    text-align: left;
  }

  &:nth-of-type(even) .about_aska_item_r {
    padding: 0 50px 0 30px;
  }

  .about_aska_item_tip {
    margin-top: 100px;
    padding: 5px 0;
    font-size: 16px;
  }

  .about_aska_item_title {
    position: relative;
    height: 61px;
    margin-bottom: 20px;
    padding: 5px 0;
    font-size: 30px;
    font-weight: 700;
    line-height: 1;

    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 60px;
      height: 2px;
      background-color: $theme-blue;
    }
  }

  .about_aska_item_desc {
    padding: 5px 21px 5px 0;
    font-size: 14px;
    font-weight: 400;
    font-style: normal;
    color: var(--text-muted);
    font-family: effra, sans-serif;
  }

  /* ---------- 图片区 ---------- */
  .about_aska_item_l {
    flex: 0 0 50%;
    max-width: 50%;
    box-sizing: border-box;
  }

  .about_aska_item_img_max,
  .about_aska_item_img_min {
    display: block;
    width: 100%;
    height: auto;
  }

  /* 默认（> 768px）：只显示 PC 大图 */
  .about_aska_item_img_max {
    display: block;
  }
  .about_aska_item_img_min {
    display: none;
  }
}

/* =========================================================
 * 二、荣誉墙 / 认证
 * ======================================================= */
.about_aska_company_honor {
  background: var(--surface);
}
.container ul {
  justify-content: center;
  list-style-type: none;
}

.about_aska_certifications {
  background: $bg-gray;
}

.about_aska_certifications,
.about_aska_company_honor {
  width: 100%;
  padding: 60px 0;

  .about_aska_company_honor_list {
    display: flex;
    flex: 1;
    flex-wrap: wrap;

    li {
      flex: 1 1 0;
      min-width: 0;
      padding: 11px;
      box-sizing: border-box;

      img {
        display: block;
        width: 100%;
        cursor: pointer;
      }

      .el-image {
        width: auto !important;
        height: auto !important;
      }
    }
  }
}

/* =========================================================
 * 三、服务优势
 * ======================================================= */
.about_aska_service_advantage {
  position: relative;
  background-image: url("../../assets/img/AboutAska1.jpeg");
  background-repeat: no-repeat;
  background-position: 50%;
  background-size: cover;

  .img1 {
    padding: 60px 0 80px;
    background: rgba(0, 0, 0, 0.85);
  }

  .title {
    margin-bottom: 30px;
    padding: 5px 0;
    font-size: 30px;
    color: #fff;
    text-align: center;
  }

  ul {
    display: flex;
    flex-wrap: wrap;

    li {
      flex: 1 1 0;
      min-width: 0;
      margin: 8px;
      padding: 10px 20px;
      box-sizing: border-box;
      border-radius: 10px;
      background: var(--surface);

      .about_aska_service_advantage_t {
        display: flex;
        align-items: center;

        .about_aska_service_advantage_img {
          width: 17.2077922078%;

          img {
            width: 75%;
          }
        }

        .about_aska_service_advantage_title {
          font-size: 18px;
          font-weight: 700;
          line-height: 1.5;
          color: var(--text);
        }
      }

      .about_aska_service_advantage_b {
        padding: 5px 10px;
        text-align: left;
        color: var(--text-muted);
      }
    }
  }
}

/* =========================================================
 * 四、通用标题
 * ======================================================= */
.askatek-title {
  position: relative;
  height: 56px;
  margin-bottom: 30px;
  font-size: 30px;
  font-weight: 700;
  line-height: 56px;
  color: var(--text-strong);
  text-align: left;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 60px;
    height: 2px;
    background-color: $theme-blue;
  }
}

/* =========================================================
 * 五、移动端适配（≤ 768px）
 * ======================================================= */
@media (max-width: $bp-mobile) {
  /* ---------- 图文介绍：纵向堆叠 + 切换小图 ---------- */
  .about_aska_item {
    &,
    &:nth-of-type(odd),
    &:nth-of-type(even) {
      flex-direction: column;
    }

    .about_aska_item_r,
    &:nth-of-type(even) .about_aska_item_r {
      flex: 0 0 auto;
      width: 100%;
      max-width: 100%;
      padding: 0;
    }

    .about_aska_item_title {
      margin-bottom: 45px;
    }

    .about_aska_item_desc {
      margin-bottom: 25px;
    }

    .about_aska_item_l {
      flex: 0 0 auto;
      width: 100%;
      max-width: 100%;
    }

    /* 关键：隐藏 PC 大图，显示移动端小图 */
    .about_aska_item_img_max {
      display: none;
    }
    .about_aska_item_img_min {
      display: block;
    }
  }

  .about_aska_list {
    padding: 0 20px;
  }

  /* ---------- 荣誉墙 / 认证：一行两张 ---------- */
  .about_aska_company_honor .about_aska_company_honor_list li,
  .about_aska_certifications .about_aska_company_honor_list li {
    flex: 0 0 50%;
    max-width: 50%;
  }

  .about_aska_company_honor .container {
    max-width: 100% !important;
  }
  .container ul {
    justify-content: center;
    list-style-type: none;
  }

  /* ---------- 服务优势：纵向堆叠 ---------- */
  .about_aska_service_advantage ul {
    flex-direction: column;

    li {
      flex: 0 0 auto;
    }
  }
}
</style>
