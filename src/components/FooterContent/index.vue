<template>
  <div class="shunkai-footer">
    <div class="shunkai-footer-container">
      <!-- 居中 logo + 四个圆形入口图标（点击弹出图片 / 文字内容） -->
      <span class="shunkai-footer-brand">
        <div class="shunkai-footer-logo">
          <img :src="logo1" alt="shunkai" @click="jumpHome" />
        </div>
        <div class="shunkai-footer-contact">
          <!-- 微信：点击弹出二维码 -->
          <el-popover placement="top" width="160" trigger="click">
            <div class="shunkai-footer-pop">
              <img :src="qrUrl" alt="wechat" />
              <p>{{ $t("footer.scanQrcode") }}</p>
              <span v-if="info.wechat_id">{{ info.wechat_id }}</span>
            </div>
            <button
              slot="reference"
              type="button"
              class="shunkai-footer-contact-btn"
              :aria-label="$t('footer.contactWechat')"
              :title="$t('footer.contactWechat')"
            >
              <svg-icon icon-class="wechat" />
            </button>
          </el-popover>

          <!-- Facebook：点击跳转外链 -->
          <button
            type="button"
            class="shunkai-footer-contact-btn"
            :aria-label="$t('footer.contactFacebook')"
            :title="$t('footer.contactFacebook')"
            @click="openFacebook"
          >
            <svg-icon icon-class="facebook" />
          </button>

          <!-- 视频号：点击弹出二维码 -->
          <el-popover placement="top" width="160" trigger="click">
            <div class="shunkai-footer-pop">
              <img :src="channelsQrUrl" alt="channels" />
              <p>{{ $t("footer.scanChannels") }}</p>
            </div>
            <button
              slot="reference"
              type="button"
              class="shunkai-footer-contact-btn"
              :aria-label="$t('footer.contactChannels')"
              :title="$t('footer.contactChannels')"
            >
              <svg-icon icon-class="channels" />
            </button>
          </el-popover>

          <!-- 电话：点击弹出号码文字 -->
          <el-popover placement="top" width="190" trigger="click">
            <div class="shunkai-footer-pop shunkai-footer-pop--text">
              <span>{{ info.telephone }}</span>
            </div>
            <button
              slot="reference"
              type="button"
              class="shunkai-footer-contact-btn"
              :aria-label="$t('footer.contactPhone')"
              :title="$t('footer.contactPhone')"
            >
              <svg-icon icon-class="phone-icon" />
            </button>
          </el-popover>
        </div>
      </span>

      <!-- 导航：>750px 显示分组；<=750px 换成一行快速导航 -->
      <span class="shunkai-footer-wrapper">
        <div
          class="shunkai-footer-wrapper-item"
          v-for="(g, gi) in groups"
          :key="gi"
        >
          <h4 class="content font-bold">{{ $label(g) }}</h4>
          <ul>
            <li v-for="(c, ci) in g.childer" :key="ci">
              <p @click="jump(c)">{{ $label(c) }}</p>
            </li>
          </ul>
        </div>
      </span>
      <ul class="shunkai-footer-quicknav">
        <li v-for="(n, ni) in quickNav" :key="ni">
          <span @click="jump(n)">{{ $label(n) }}</span>
        </li>
      </ul>
    </div>
    <div class="shunkai-footer-page">
      <div class="shunkai-footer-page-l">
        {{ $t("footer.copyright") }}
      </div>
      <div class="shunkai-footer-page-r">{{ $t("footer.slogan") }}</div>
    </div>
  </div>
</template>

<script>
import {
  fast_navigation,
  categoryStore,
  secondLevelGroups,
} from "@/utils/navData";
import { getSetting } from "@/api/index";
import { RESOURCE_BASE_URL } from "@/utils/resource";
import logo1 from "@/assets/img/logo1.png";

// 1px 透明 gif：设置接口未就绪 / 未配置二维码时占位，避免请求 .../undefined
const EMPTY_IMG =
  "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";

export default {
  name: "FooterContent",
  data() {
    return {
      logo1,
      info: {},
    };
  },
  created() {
    getSetting().then((res) => {
      this.info = (res && res.data) || {};
    });
  },
  computed: {
    // 微信二维码地址（未就绪时用透明图占位）
    qrUrl() {
      return this.info && this.info.qrcode
        ? RESOURCE_BASE_URL + this.info.qrcode
        : EMPTY_IMG;
    },
    // 视频号二维码地址（未配置时回退微信二维码）
    channelsQrUrl() {
      const url = this.info && (this.info.channels_qrcode || this.info.qrcode);
      return url ? RESOURCE_BASE_URL + url : EMPTY_IMG;
    },
    // >750px 的页尾导航分组：
    // 第 1 组快速导航；产品部分只保留二级分类（隐藏一级分组列，不下钻三四级）
    groups() {
      const productItems = secondLevelGroups(categoryStore.roots).reduce(
        (arr, g) => arr.concat(g.childer),
        [],
      );
      const list = [
        {
          title: fast_navigation.title,
          i18nKey: fast_navigation.i18nKey,
          childer: fast_navigation.childer,
        },
      ];
      if (productItems.length) {
        list.push({
          title: "Product Center",
          i18nKey: "footer.productCenter",
          childer: productItems,
        });
      }
      return list;
    },
    // <=750px 的快速导航条：与「快速导航」分组同一份数据
    quickNav() {
      return fast_navigation.childer;
    },
  },
  methods: {
    jumpHome() {
      this.$router.push({ name: "home" });
    },
    // Facebook 外链（未配置时不响应，避免跳到 undefined）
    openFacebook() {
      const url = this.info && this.info.facebook;
      if (url) window.open(url, "_blank", "noopener");
    },
    jump(c) {
      if (c.path) {
        this.$router.push({ path: c.path });
      } else {
        // 产品分类（二级）跳产品中心（按 hierarchy 过滤）
        this.$router.push({
          name: "product_center",
          query: { name: c.name || c.title, hierarchy: c.hierarchy },
        });
      }
    },
  },
};
</script>
<style scoped lang="scss">
.shunkai-footer-container {
  padding: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
