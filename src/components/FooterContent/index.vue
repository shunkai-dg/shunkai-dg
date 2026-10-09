<template>
  <div class="askatek-footer">
    <div class="askatek-footer-container">
      <div class="askatek-footer-wrapper">
        <el-row :gutter="24">
          <el-col class="askatek-footer-wrapper-l" :span="3">
            <div class="askatek-footer-wrapper-code">
              <div class="askatek-footer-wrapper-logo">
                <img :src="logo1" alt="logo" />
              </div>
              <div class="askatek-footer-wrapper-code-qr">
                <img :src="codeqr" alt="qrcode" />
              </div>
              <div class="info">
                <el-popover
                  v-show="info.qrcode"
                  placement="top"
                  width="150"
                  trigger="click"
                >
                  <img :src="qrUrl" alt="weixin" />
                  <img slot="reference" :src="weix" alt="weixin" />
                </el-popover>
                <el-popover placement="top" width="190" trigger="click">
                  <span>{{ info.telephone }}</span>
                  <img slot="reference" :src="phone" alt="phone" />
                </el-popover>
              </div>
            </div>
          </el-col>
          <el-col class="askatek-footer-wrapper-r" :span="19">
            <div
              class="askatek-footer-wrapper-item"
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
          </el-col>
        </el-row>
      </div>
      <div class="askatek-footer-line"></div>
      <div class="askatek-footer-page">
        <div class="askatek-footer-page-l">{{ $t("footer.copyright") }}</div>
        <div class="askatek-footer-page-r">{{ $t("footer.slogan") }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  fast_navigation,
  categoryStore,
} from "@/utils/navData";
import { getSetting } from "@/api/index";
import { RESOURCE_BASE_URL } from "@/utils/resource";
import logo1 from "@/assets/img/logo1.png";
import codeqr from "@/assets/img/codeqr.png";
import weix from "@/assets/img/weix.png";
import phone from "@/assets/img/phone.png";

// 反推来源：app.js 076e/9c08/5cd2（FooterContent 模块）
export default {
  name: "FooterContent",
  data() {
    return {
      logo1,
      codeqr,
      weix,
      phone,
      info: {},
    };
  },
  created() {
    getSetting().then((res) => {
      this.info = (res && res.data) || {};
    });
  },
  computed: {
    // info.qrcode 未就绪时用 1px 透明图占位，避免向 back.askatek.cn/undefined 发请求
    qrUrl() {
      return this.info && this.info.qrcode
        ? RESOURCE_BASE_URL + this.info.qrcode
        : "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
    },
    // 页尾产品分类平铺叶子列表（保留嵌套层级），fast_navigation 取 childer
    groups() {
      const flat = (items, fallback) =>
        (items || []).map((t) => {
          const item = {
            title: t.title,
            name: t.name || t.title,
            hierarchy: t.hierarchy != null ? t.hierarchy : fallback,
          };
          if (t.path) item.path = t.path;
          if (t.childer && t.childer.length)
            item.childer = flat(t.childer, t.hierarchy);
          return item;
        });
      const productGroups = categoryStore.roots.map((g) => ({
        title: g.title,
        // 平铺该一级分类下所有二级分组的所有叶子
        childer: (g.subGroups || []).reduce(
          (arr, sg) => arr.concat(flat(sg.childer, sg.hierarchy)),
          [],
        ),
      }));
      return [
        {
          title: fast_navigation.title,
          i18nKey: fast_navigation.i18nKey,
          childer: fast_navigation.childer,
        },
      ].concat(productGroups);
    },
  },
  methods: {
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
