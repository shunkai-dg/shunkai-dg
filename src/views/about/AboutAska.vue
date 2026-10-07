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
          <div class="askatek-title"><p>Company wall of fame</p></div>
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
          <div class="askatek-title"><p>Company Certifications</p></div>
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
            <p class="title">Advantage</p>
            <ul>
              <li>
                <div class="about_aska_service_advantage_t">
                  <div class="about_aska_service_advantage_img">
                    <img :src="advImg1" />
                  </div>
                  <p class="about_aska_service_advantage_title">value</p>
                </div>
                <div class="about_aska_service_advantage_b">
                  Focus On Lifestyle Fashionable& High Quality Wireless
                  Bluetooth Acoustic Products
                </div>
              </li>
              <li>
                <div class="about_aska_service_advantage_t">
                  <div class="about_aska_service_advantage_img">
                    <img :src="advImg2" />
                  </div>
                  <p class="about_aska_service_advantage_title">Experience</p>
                </div>
                <div class="about_aska_service_advantage_b">
                  More Than 10 Years Experience Engineering Experts And
                  Professional Acoustics Testing Equipment Like B&K Devices For
                  The Independent Development
                </div>
              </li>
              <li>
                <div class="about_aska_service_advantage_t">
                  <div class="about_aska_service_advantage_img">
                    <img :src="advImg3" />
                  </div>
                  <p class="about_aska_service_advantage_title">Professional</p>
                </div>
                <div class="about_aska_service_advantage_b">
                  Passionate Sales Team Standby To Support Our Worldwide
                  Customers Businesses
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
      list: [
        {
          url: aboutImg1,
          minUrl: aboutMin1,
          introduction: "INTRODUCTION",
          title: "About aska design",
          desc: "Aska Electronics Co.,Ltd was established in Dongguan, GuangDong province, China which owns a production base more than 20000 square meters.Aska is known as a high-tech Company which focuses on wireless audio products development and manufacturing. The main projects are Wireless headphone & Wireless ear buds & Wireless speaker etc.",
        },
        {
          url: aboutImg2,
          minUrl: aboutMin2,
          introduction: "TO EXPLORE",
          title: "After-sales Services",
          desc: "ASKA Electronics Co., Ltd. is one of the world's leading suppliers of wireless audio products. We are committed to developing lifestyle products with the latest technology and fashion trends. Our product range includes Wireless headsets, wireless sports earplugs, Wireless / WiFi speakers and wearable devices. Our products are welcomed by customers all over the world and are mainly sold to Europe, North America, Japan and other places",
        },
        {
          url: aboutImg3,
          minUrl: aboutMin3,
          introduction: "ADVANTAGE",
          title: "Why are we special?",
          desc: "Our key competence is new product innovation and quality control. Our experienced R&D team players served for lots of A Brand projects in EMS company before, they have in-depth industrial knowledge on acoustic and RF technology.We heavily invested on talents and devices such as in-house anechoic chamber and B&K testing Lab,excellent sound performance and product reliability makes us stand out from competition.",
        },
      ],
    };
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
$theme-blue: #094b7c;
$bg-gray: #f8f8f8;

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
    color: #666;
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
  background: #fff;
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
      background: #fff;

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
          color: #333;
        }
      }

      .about_aska_service_advantage_b {
        padding: 5px 10px;
        text-align: left;
        color: rgba(64, 64, 64, 0.93);
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
  color: #000;
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
