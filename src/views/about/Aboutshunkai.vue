<template>
  <div>
    <Breadcrumb class="breadcrumb_bg" />
    <div class="about_shunkai_warp">
      <!-- 1. 工厂简介 + 生产能力（原「生产制造」页核心内容已合并到此） -->
      <ul class="about_shunkai_list">
        <li
          v-for="(item, index) in list"
          :key="index"
          class="about_shunkai_item"
        >
          <div class="about_shunkai_item_r">
            <p class="about_shunkai_item_tip">{{ item.introduction }}</p>
            <div class="about_shunkai_item_title">
              <p>{{ item.title }}</p>
            </div>
            <p class="about_shunkai_item_desc">{{ item.desc }}</p>
            <!-- 第 2 段（生产能力）附工厂关键数据 -->
            <ul v-if="item.stats" class="about_shunkai_item_stats">
              <li v-for="(s, si) in item.stats" :key="si">
                <strong>{{ s.value }}</strong>
                <span>{{ s.label }}</span>
              </li>
            </ul>
          </div>
          <div class="about_shunkai_item_l">
            <img class="about_shunkai_item_img_max" :src="item.url" />
            <img class="about_shunkai_item_img_min" :src="item.minUrl" />
          </div>
        </li>
      </ul>

      <!-- 2. 生产设备与产能（车间实拍，点击放大） -->
      <div class="about_shunkai_equipment">
        <div class="container">
          <div class="shunkai-title">
            <p>{{ $t("about.equipment.title") }}</p>
          </div>
          <p class="about_shunkai_equipment_desc">
            {{ $t("about.equipment.desc") }}
          </p>
          <ul class="about_shunkai_company_honor_list">
            <li v-for="(item, index) in equipment" :key="index">
              <img
                :src="RESOURCE_BASE_URL + item.img_path"
                @click="openPreviewPicture(equipment, index, 'img_path')"
              />
            </li>
          </ul>
        </div>
      </div>

      <!-- 3. 资质认证（精简：营业执照 / 守合同重信用 / ISO9001 / RoHS 统一成一面资质墙） -->
      <div class="about_shunkai_certifications">
        <div class="container">
          <div class="shunkai-title">
            <p>{{ $t("about.certifications.title") }}</p>
          </div>
          <ul class="about_shunkai_company_honor_list">
            <li v-for="(item, index) in certifications" :key="index">
              <img
                :src="RESOURCE_BASE_URL + item.img_path"
                @click="openPreviewPicture(certifications, index, 'img_path')"
              />
            </li>
          </ul>
        </div>
      </div>

      <!-- 4. 服务优势 -->
      <div class="about_shunkai_service_advantage">
        <div class="img1">
          <div class="container">
            <p class="title">{{ $t("about.advantage.title") }}</p>
            <ul>
              <li>
                <div class="about_shunkai_service_advantage_t">
                  <div class="about_shunkai_service_advantage_img">
                    <img :src="advImg1" />
                  </div>
                  <p class="about_shunkai_service_advantage_title">
                    {{ $t("about.advantage.value.title") }}
                  </p>
                </div>
                <div class="about_shunkai_service_advantage_b">
                  {{ $t("about.advantage.value.desc") }}
                </div>
              </li>
              <li>
                <div class="about_shunkai_service_advantage_t">
                  <div class="about_shunkai_service_advantage_img">
                    <img :src="advImg2" />
                  </div>
                  <p class="about_shunkai_service_advantage_title">
                    {{ $t("about.advantage.experience.title") }}
                  </p>
                </div>
                <div class="about_shunkai_service_advantage_b">
                  {{ $t("about.advantage.experience.desc") }}
                </div>
              </li>
              <li>
                <div class="about_shunkai_service_advantage_t">
                  <div class="about_shunkai_service_advantage_img">
                    <img :src="advImg3" />
                  </div>
                  <p class="about_shunkai_service_advantage_title">
                    {{ $t("about.advantage.professional.title") }}
                  </p>
                </div>
                <div class="about_shunkai_service_advantage_b">
                  {{ $t("about.advantage.professional.desc") }}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- 5. 联系入口 -->
      <div class="about_shunkai_contact">
        <p class="about_shunkai_contact_title">
          {{ $t("about.contact.title") }}
        </p>
        <p class="about_shunkai_contact_desc">{{ $t("about.contact.desc") }}</p>
        <button class="about_shunkai_contact_btn" @click="jumpContact">
          {{ $t("about.contact.button") }}
        </button>
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

import advImg1 from "@/assets/img/advImg1.png";
import advImg2 from "@/assets/img/advImg2.png";
import advImg3 from "@/assets/img/advImg3.png";
import { RESOURCE_BASE_URL } from "@/utils/resource";

// 车间实拍直接取 img_data 静态目录（构建时原样复制到 dist），
// 与首页工厂实力区共用同一批图片，避免继续沿用音频时代的旧配图。
const factoryImg = "img_data/factory/mould-workshop.jpg";
const factorySmall = "img_data/equipment/injection-workshop.jpg";
const capacityImg = "img_data/factory/injection-machines.jpg";
const capacitySmall = "img_data/equipment/injection-line.jpg";

export default {
  name: "Aboutshunkai",
  components: { Breadcrumb, ImagePreview },
  data() {
    return {
      imgList: [],
      pictureVisible: false,
      k: "",
      activeIndex: 0,
      // 资质墙：营业执照/守合同重信用（type 9）+ ISO9001/RoHS（type 14）
      certifications: [],
      // 生产设备实拍（type 3）
      equipment: [],
      advImg1,
      advImg2,
      advImg3,
      // 图文介绍的图片（文案见 computed.list，走 i18n）
      // 第 1 段=工厂简介，第 2 段=生产能力（原生产制造页内容）
      introImgs: [
        {
          url: RESOURCE_BASE_URL + factoryImg,
          minUrl: RESOURCE_BASE_URL + factorySmall,
          key: "factory",
          stats: false,
        },
        {
          url: RESOURCE_BASE_URL + capacityImg,
          minUrl: RESOURCE_BASE_URL + capacitySmall,
          key: "capacity",
          stats: true,
        },
      ],
    };
  },
  computed: {
    // 资源前缀常量：放在 computed 而不是 data，避免模板里出现未定义变量
    RESOURCE_BASE_URL() {
      return RESOURCE_BASE_URL;
    },
    // 图文介绍：图片取静态资源，文案取 about.intro.*（语言切换时自动更新）
    list() {
      return this.introImgs.map((image) => {
        const item = "about.intro." + image.key;
        const stats = image.stats
          ? [
              {
                value: this.$t("about.intro.capacity.stats.area.value"),
                label: this.$t("about.intro.capacity.stats.area.label"),
              },
              {
                value: this.$t("about.intro.capacity.stats.machines.value"),
                label: this.$t("about.intro.capacity.stats.machines.label"),
              },
              {
                value: this.$t("about.intro.capacity.stats.mouldLife.value"),
                label: this.$t("about.intro.capacity.stats.mouldLife.label"),
              },
            ]
          : null;
        return {
          url: image.url,
          minUrl: image.minUrl,
          stats,
          introduction: this.$t(item + ".introduction"),
          title: this.$t(item + ".title"),
          desc: this.$t(item + ".desc"),
        };
      });
    },
  },
  created() {
    this.getImgData({ n: "equipment", type: 3 });
    this.getImgData({ n: "certifications", type: 9 });
    this.getImgData({ n: "certCerts", type: 14, append: true });
  },
  methods: {
    getImgData({ n, type, append }) {
      getImg({ type }).then((res) => {
        const data = res.data || [];
        if (append) {
          this[n] = (this[n] || []).concat(data);
        } else {
          this[n] = data;
        }
      });
    },
    jumpContact() {
      this.$router.push({ name: "contact_us" });
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
 * 一、图文介绍（工厂简介 + 生产能力）
 *
 * 图片切换规则：
 *   .about_shunkai_item_img_max —— PC 端大图（默认显示）
 *   .about_shunkai_item_img_min —— 移动端小图（默认隐藏）
 *   在 768px 断点处整体互换，保证任意宽度下只有一张可见。
 * ======================================================= */
.about_shunkai_warp {
  width: 100%;
}

.about_shunkai_list {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
}

.about_shunkai_item {
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
  .about_shunkai_item_r {
    flex: 0 0 50%;
    max-width: 50%;
    padding: 0 20px 0 50px;
    box-sizing: border-box;
    text-align: left;
  }

  &:nth-of-type(even) .about_shunkai_item_r {
    padding: 0 50px 0 30px;
  }

  .about_shunkai_item_tip {
    margin-top: 100px;
    padding: 5px 0;
    font-size: 16px;
  }

  .about_shunkai_item_title {
    position: relative;
    height: 61px;
    margin-bottom: 20px;
    padding: 5px 0;
    font-size: 30px;
    font-weight: 700;
    line-height: 1;
    color: var(--text-strong);
  }

  .about_shunkai_item_title::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 60px;
    height: 2px;
    background-color: $theme-blue;
  }

  .about_shunkai_item_desc {
    padding: 5px 21px 5px 0;
    font-size: 14px;
    font-weight: 400;
    font-style: normal;
    color: var(--text-muted);
    font-family: effra, sans-serif;
  }

  /* ---------- 关键数据（仅生产能力段） ---------- */
  .about_shunkai_item_stats {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin: 18px 0 30px;
    padding: 0;
    list-style: none;

    li {
      flex: 1 1 120px;
      min-width: 0;
      padding: 12px 14px;
      background: var(--surface);
      border: 1px solid var(--border);
      border-left: 3px solid var(--accent);
      border-radius: 4px;
      box-sizing: border-box;
    }

    strong {
      display: block;
      font-size: 20px;
      line-height: 1.2;
      color: var(--accent-text);
    }

    span {
      display: block;
      margin-top: 4px;
      font-size: 12px;
      color: var(--text-muted);
    }
  }

  /* ---------- 图片区 ---------- */
  .about_shunkai_item_l {
    flex: 0 0 50%;
    max-width: 50%;
    box-sizing: border-box;
  }

  .about_shunkai_item_img_max,
  .about_shunkai_item_img_min {
    display: block;
    width: 100%;
    height: auto;
  }

  /* 默认（> 768px）：只显示 PC 大图 */
  .about_shunkai_item_img_max {
    display: block;
  }
  .about_shunkai_item_img_min {
    display: none;
  }
}

/* =========================================================
 * 二、生产设备 / 资质墙
 * ======================================================= */
.about_shunkai_equipment {
  background: var(--surface);
}

.container ul {
  justify-content: center;
  list-style-type: none;
}

.about_shunkai_equipment_desc {
  max-width: 900px;
  margin-bottom: 20px;
  color: var(--text-muted);
  font-size: 14px;
  line-height: 1.8;
}

.about_shunkai_certifications {
  background: $bg-gray;
}

.about_shunkai_certifications,
.about_shunkai_equipment {
  width: 100%;
  padding: 60px 0;

  .about_shunkai_company_honor_list {
    display: flex;
    flex: 1;
    flex-wrap: wrap;
    padding: 0;
    margin: 0;

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

/* 车间实拍横竖比例不一，统一高度裁切，避免同一行高矮不齐（资质图不裁切） */
.about_shunkai_equipment .about_shunkai_company_honor_list li img {
  height: 220px;
  object-fit: cover;
  border-radius: 4px;
}

/* =========================================================
 * 三、服务优势
 * ======================================================= */
.about_shunkai_service_advantage {
  position: relative;
  background-image: url("../../assets/img/Aboutshunkai1.jpeg");
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
    padding: 0;
    margin: 0;
    list-style: none;

    li {
      flex: 1 1 0;
      min-width: 0;
      margin: 8px;
      padding: 10px 20px;
      box-sizing: border-box;
      border-radius: 10px;
      background: var(--surface);

      .about_shunkai_service_advantage_t {
        display: flex;
        align-items: center;

        .about_shunkai_service_advantage_img {
          width: 17.2077922078%;

          img {
            width: 75%;
          }
        }

        .about_shunkai_service_advantage_title {
          font-size: 18px;
          font-weight: 700;
          line-height: 1.5;
          color: var(--text);
        }
      }

      .about_shunkai_service_advantage_b {
        padding: 5px 10px;
        text-align: left;
        color: var(--text-muted);
      }
    }
  }
}

/* =========================================================
 * 四、联系入口
 * ======================================================= */
.about_shunkai_contact {
  padding: 50px 20px;
  background: var(--bg-soft);
  text-align: center;
}

.about_shunkai_contact_title {
  font-size: 26px;
  line-height: 1.4;
  color: var(--text-strong);
  margin-bottom: 10px;
}

.about_shunkai_contact_desc {
  max-width: 720px;
  margin: 0 auto 24px;
  color: var(--text-muted);
  font-size: 14px;
  line-height: 1.9;
}

.about_shunkai_contact_btn {
  font-size: 15px;
  color: var(--btn-text);
  background: var(--btn-bg);
  border: 1px solid var(--btn-bg);
  border-radius: 4px;
  padding: 12px 40px;
  cursor: pointer;
}

.about_shunkai_contact_btn:hover {
  color: var(--text);
  background: transparent;
}

/* =========================================================
 * 五、通用标题
 * ======================================================= */
.shunkai-title {
  position: relative;
  height: 56px;
  margin-bottom: 30px;
  font-size: 30px;
  font-weight: 700;
  line-height: 56px;
  color: var(--text-strong);
  text-align: left;
}

.shunkai-title::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 60px;
  height: 2px;
  background-color: $theme-blue;
}

/* =========================================================
 * 六、移动端适配（≤ 768px）
 * ======================================================= */
@media (max-width: $bp-mobile) {
  /* ---------- 图文介绍：纵向堆叠 + 切换小图 ---------- */
  .about_shunkai_item {
    &,
    &:nth-of-type(odd),
    &:nth-of-type(even) {
      flex-direction: column;
    }

    .about_shunkai_item_r,
    &:nth-of-type(even) .about_shunkai_item_r {
      flex: 0 0 auto;
      width: 100%;
      max-width: 100%;
      padding: 0;
    }

    .about_shunkai_item_title {
      margin-bottom: 45px;
    }

    .about_shunkai_item_desc {
      margin-bottom: 25px;
    }

    .about_shunkai_item_l {
      flex: 0 0 auto;
      width: 100%;
      max-width: 100%;
    }

    /* 关键：隐藏 PC 大图，显示移动端小图 */
    .about_shunkai_item_img_max {
      display: none;
    }
    .about_shunkai_item_img_min {
      display: block;
    }
  }

  .about_shunkai_list {
    padding: 0 20px;
  }

  /* ---------- 设备 / 资质：一行两张 ---------- */
  .about_shunkai_equipment .about_shunkai_company_honor_list li,
  .about_shunkai_certifications .about_shunkai_company_honor_list li {
    flex: 0 0 50%;
    max-width: 50%;
  }

  .about_shunkai_equipment .container {
    max-width: 100% !important;
  }
  .container ul {
    justify-content: center;
    list-style-type: none;
  }

  /* ---------- 服务优势：纵向堆叠 ---------- */
  .about_shunkai_service_advantage ul {
    flex-direction: column;

    li {
      flex: 0 0 auto;
    }
  }
}
</style>
