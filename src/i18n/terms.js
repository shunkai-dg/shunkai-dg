/**
 * 分类/术语词典
 * ---------------------------------------------------------------
 * 产品分类标题来自本地 JSON（英文），不在 vue-i18n 的 message 里，
 * 这里按「原文 -> 译文」做查表翻译；查不到时原样回退，保证英文站不受影响。
 *
 * termStore 是 Vue.observable：模板里 {{ $tt(text) }} 会读取 termStore.locale，
 * 因此切换语言时依赖它的组件会自动重渲染。
 *
 * 塑胶模具小工厂版：词表已按新的三大分类（化妆品外壳 / 电子产品外壳 / 其他）
 * 与对应二级分类重写，旧的音频类词条全部移除。
 */
import Vue from "vue";

export const termStore = Vue.observable({ locale: "en-US" });

/** 产品分类（category.json 中的 title / desc）与零散术语 */
const ZH_TERMS = {
  // ---- 一级分类 ----
  "Cosmetics Packaging": "化妆品外壳",
  "Electronics Packaging": "电子产品外壳",
  "Other Plastic Products": "其他塑胶产品",

  // ---- 化妆品外壳 ----
  "Makeup Brush Handles": "化妆刷柄",
  "Cosmetic Jars & Caps": "膏霜瓶与盖",
  "Powder Puffs & Trays": "粉扑与粉盘",

  // ---- 电子产品外壳 ----
  "Power Bank Housings": "充电宝外壳",
  "Charger Casings": "充电器外壳",
  "Communication Devices": "通讯电子外壳",

  // ---- 其他塑胶产品 ----
  "Jewellery Boxes": "珠宝盒",
  "Medical Device Parts": "医疗器械配件",
  "Custom Moulded Parts": "来图定制件",

  // ---- 通用术语 ----
  "Fast navigation": "快速导航",
  "Product Center": "产品中心",
  "Product-Center": "产品中心",
};

/**
 * 翻译一个术语（分类标题/描述等）
 * @param {string} text 原文
 * @returns {string}
 */
export function translateTerm(text) {
  if (!text) return text;
  if (termStore.locale === "zh-CN") {
    const hit = ZH_TERMS[text];
    if (hit) return hit;
  }
  return text;
}

export default translateTerm;
