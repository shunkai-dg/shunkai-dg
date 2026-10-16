<template>
  <div>
    <Breadcrumb />

    <div class="procuct_detail">
      <div class="container">
        <div class="procuct_detail_content">
          <!-- 左：图库（主图带放大镜，下方缩略图可切换 / 左右翻页） -->
          <div class="procuct_detail_l">
            <div class="gallery">
              <div
                id="small"
                class="gallery_main"
                @mouseover="over"
                @mouseout="out"
                @mousemove="move"
              >
                <div id="float" />
                <img
                  id="smallimg"
                  :src="RESOURCE_BASE_URL + currentImg"
                  :alt="detailData.title"
                />
              </div>
              <!-- 放大镜预览窗（仅桌面端显示） -->
              <div id="big">
                <img
                  ref="bigImg"
                  :style="{ left: styles.imgx + 'px', top: styles.imgY + 'px' }"
                  :src="RESOURCE_BASE_URL + currentImg"
                  alt=""
                />
              </div>
            </div>

            <div v-if="imgs.length > 1" class="gallery_thumbs">
              <button
                class="gallery_arrow gallery_arrow--prev"
                :disabled="thumbStart === 0"
                @click="scrollThumb(-1)"
              >
                <i class="el-icon-arrow-left"></i>
              </button>
              <div class="gallery_thumbs_view">
                <ul
                  :style="{
                    transform: 'translateX(-' + thumbStart * (100 / thumbPerView) + '%)',
                  }"
                >
                  <li
                    v-for="(img, index) in imgs"
                    :key="index"
                    :style="{ flexBasis: 100 / thumbPerView + '%' }"
                    :class="{ 'is-active': currentIndex === index }"
                    @click="changeImg(index)"
                  >
                    <img :src="RESOURCE_BASE_URL + img" alt="" />
                  </li>
                </ul>
              </div>
              <button
                class="gallery_arrow gallery_arrow--next"
                :disabled="thumbStart + thumbPerView >= imgs.length"
                @click="scrollThumb(1)"
              >
                <i class="el-icon-arrow-right"></i>
              </button>
            </div>
          </div>

          <!-- 右：产品信息（标题 / 副标题 / 描述 / 规格参数 / 联系按钮） -->
          <div class="procuct_detail_r">
            <div class="procuct_detail_info">
              <div class="title">{{ detailData.title }}</div>
              <div class="sub_title">{{ detailData.sub_title }}</div>
              <el-divider />
              <div class="desc" v-html="detailData.descr"></div>
              <div class="params" v-html="detailData.params"></div>
              <button class="procuct_detail_info_btn" @click="jump">
                {{ $t("product.detail.contact") }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getProductDetail } from "@/api/index";
import { RESOURCE_BASE_URL } from "@/utils/resource";
import Breadcrumb from "@/components/Breadcrumb";

export default {
  components: { Breadcrumb },
  data() {
    return {
      RESOURCE_BASE_URL,
      detailData: {},
      currentIndex: 0,
      // 缩略图窗口起始下标（一屏张数见 thumbPerView）
      thumbStart: 0,
      // 窄屏一屏三张，其余四张（与下方 CSS 断点保持一致）
      thumbPerView: 4,
      styles: { imgx: "0px", imgY: "0px" },
    };
  },
  computed: {
    imgs() {
      return (this.detailData && this.detailData.imgs) || [];
    },
    currentImg() {
      return this.imgs[this.currentIndex] || "";
    },
  },
  watch: {
    // 语言切换 / 数据到位后保持下标合法
    imgs() {
      if (this.currentIndex > this.imgs.length - 1) this.currentIndex = 0;
      this.thumbStart = 0;
    },
  },
  created() {
    this.getFeachList();
    this.updateThumbPerView();
  },
  mounted() {
    window.addEventListener("resize", this.updateThumbPerView);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.updateThumbPerView);
  },
  methods: {
    // 缩略图一屏张数：与样式中的断点（≤768px 三张）保持一致
    updateThumbPerView() {
      const next = window.innerWidth <= 768 ? 3 : 4;
      if (next !== this.thumbPerView) {
        this.thumbPerView = next;
        this.thumbStart = 0;
      }
    },
    getFeachList() {
      getProductDetail({ id: this.$route.query.id }).then((res) => {
        this.detailData = res.data || {};
        this.currentIndex = 0;
        this.thumbStart = 0;
      });
    },
    jump() {
      this.$router.push({ name: "contact_us" });
    },
    changeImg(index) {
      this.currentIndex = index;
    },
    // 缩略图翻页：一屏 thumbPerView 张
    scrollThumb(step) {
      const max = Math.max(0, this.imgs.length - this.thumbPerView);
      this.thumbStart = Math.min(max, Math.max(0, this.thumbStart + step));
    },
    // ---- 放大镜：hover 显示预览窗，按鼠标位置平移大图 ----
    over() {
      if (!this.currentImg) return;
      const t = document.getElementById("float");
      const e = document.getElementById("big");
      if (!t || !e) return;
      t.style.visibility = "visible";
      e.style.visibility = "visible";
      e.style.display = "block";
    },
    out() {
      const t = document.getElementById("float");
      const e = document.getElementById("big");
      if (!t || !e) return;
      t.style.visibility = "hidden";
      e.style.visibility = "hidden";
      e.style.display = "none";
    },
    move(e) {
      const r = document.getElementById("float");
      const n = document.getElementById("small");
      const i = document.getElementById("big");
      if (!r || !n || !i) return;
      const o = i.getElementsByTagName("img")[0];
      if (!o) return;
      const a = n.clientWidth - r.offsetWidth;
      const s = n.clientHeight - r.offsetHeight;
      const c = o.clientWidth - i.offsetWidth;
      const l = o.clientHeight - i.offsetHeight;
      const rect = n.getBoundingClientRect();
      let u = e.clientX - rect.left - r.offsetWidth / 2;
      let f = e.clientY - rect.top - r.offsetHeight / 2;
      if (u < 0) u = 0;
      if (f < 0) f = 0;
      if (u > a) u = a;
      if (f > s) f = s;
      r.style.left = u + "px";
      r.style.top = f + "px";
      this.styles.imgx = -(a > 0 ? (u / a) * c : 0) + "px";
      this.styles.imgY = -(s > 0 ? (f / s) * l : 0) + "px";
    },
  },
};
</script>

<style scoped>
/* =========================================================
 * 产品详情（简化版：图库 + 描述 + 参数 + 联系按钮）
 * ======================================================= */
.procuct_detail {
  padding-bottom: 80px;
  background: var(--bg);
}

.procuct_detail .container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
  box-sizing: border-box;
}

.procuct_detail_content {
  display: flex;
  align-items: flex-start;
  gap: 40px;
  margin-top: 60px;
}

/* ---------------- 左：图库 ---------------- */
.procuct_detail_l {
  width: 45%;
  position: relative;
}

.gallery {
  position: relative;
}

.gallery_main {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 400px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 6px;
  overflow: hidden;
}

#smallimg {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

#float {
  position: absolute;
  top: 0;
  left: 0;
  width: 220px;
  height: 220px;
  background: var(--accent-soft);
  border: 1px solid var(--border-strong);
  opacity: 0.6;
  cursor: crosshair;
  visibility: hidden;
  pointer-events: none;
}

#big {
  position: absolute;
  top: 0;
  left: 102%;
  width: 420px;
  height: 420px;
  overflow: hidden;
  background: var(--surface);
  border: 1px solid var(--border-strong);
  border-radius: 6px;
  z-index: 5;
  display: none;
}

#big img {
  position: absolute;
  width: 900px;
  height: 900px;
  object-fit: contain;
}

/* ---------------- 缩略图 ---------------- */
.gallery_thumbs {
  display: flex;
  align-items: center;
  margin-top: 16px;
  background: var(--bg-soft);
  border-radius: 6px;
  padding: 8px;
}

.gallery_thumbs_view {
  flex: 1;
  overflow: hidden;
}

.gallery_thumbs_view ul {
  display: flex;
  margin: 0;
  padding: 0;
  list-style: none;
  width: 100%;
  transition: transform 0.25s ease;
}

.gallery_thumbs_view li {
  flex: 0 0 25%;
  box-sizing: border-box;
  padding: 0 6px;
}

.gallery_thumbs_view li img {
  display: block;
  width: 100%;
  height: 72px;
  object-fit: contain;
  background: var(--surface);
  border: 2px solid var(--border);
  border-radius: 4px;
  cursor: pointer;
  box-sizing: border-box;
}

.gallery_thumbs_view li.is-active img {
  border-color: var(--accent);
}

.gallery_arrow {
  width: 28px;
  height: 28px;
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
  background: transparent;
  border: 0;
  cursor: pointer;
}

.gallery_arrow:disabled {
  color: var(--text-faint);
  cursor: default;
}

.gallery_arrow:hover:not(:disabled) {
  color: var(--accent-text);
}

/* ---------------- 右：产品信息 ---------------- */
.procuct_detail_r {
  flex: 1;
  min-width: 0;
}

.procuct_detail_info {
  padding: 0 5px;
}

.procuct_detail_info .title {
  text-align: left;
  color: var(--text);
  font-size: 28px;
  line-height: 1.5;
}

.procuct_detail_info .sub_title {
  text-align: left;
  color: var(--text-muted);
  font-size: 16px;
  line-height: 1.6;
}

.procuct_detail_info .el-divider--horizontal {
  margin: 14px 0;
}

.procuct_detail_info .desc {
  padding: 5px 0;
  font-size: 15px;
  line-height: 1.8;
  text-align: left;
  color: var(--text);
}

.procuct_detail_info .params {
  margin-top: 15px;
  padding: 5px 0;
  text-align: left;
  overflow-x: auto;
}

.procuct_detail_info .procuct_detail_info_btn {
  margin-top: 34px;
  font-size: 16px;
  color: var(--btn-text);
  background: var(--btn-bg);
  border: 1px solid var(--btn-bg);
  border-radius: 4px;
  padding: 10px 40px;
  cursor: pointer;
}

.procuct_detail_info .procuct_detail_info_btn:hover {
  color: var(--text);
  background: transparent;
}

/* =========================================================
 * 响应式：≤992px 单列；≤768px 关闭放大镜
 * ======================================================= */
@media (max-width: 992px) {
  .procuct_detail_content {
    flex-direction: column;
    gap: 24px;
    margin-top: 40px;
  }

  .procuct_detail_l {
    width: 100%;
  }

  .gallery_main {
    height: 320px;
  }

  #big,
  #float {
    display: none;
  }
}

@media (max-width: 768px) {
  .gallery_main {
    height: 260px;
  }

  .gallery_thumbs_view li {
    flex: 0 0 33.3333%;
  }

  .procuct_detail_info .title {
    font-size: 22px;
  }

  .procuct_detail_info .procuct_detail_info_btn {
    width: 100%;
  }
}
</style>
