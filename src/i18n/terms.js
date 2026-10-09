/**
 * 分类/术语词典
 * ---------------------------------------------------------------
 * 产品分类标题来自本地 JSON（英文），不在 vue-i18n 的 message 里，
 * 这里按「原文 -> 译文」做查表翻译；查不到时原样回退，保证英文站不受影响。
 *
 * termStore 是 Vue.observable：模板里 {{ $tt(text) }} 会读取 termStore.locale，
 * 因此切换语言时依赖它的组件会自动重渲染。
 */
import Vue from "vue";

export const termStore = Vue.observable({ locale: "en-US" });

/** 产品分类（category.json 中的 title / desc） */
const ZH_TERMS = {
  "Consumer Audio": "消费类音频",
  "Industrial Audio": "工业类音频",

  Headphone: "头戴式耳机",
  TWS: "真无线耳机",
  "Conference Audio": "会议音频",

  "BT HIFI Headphones": "蓝牙高保真耳机",
  "Wireless ANC headphones": "无线主动降噪耳机",
  "Gaming Headphones": "游戏耳机",
  "USB Audio Headphones (SUPPORT TEAMS)": "USB 音频耳机（支持 Teams）",
  "FF/FB ANC headphones": "前馈/反馈式主动降噪耳机",
  "Hybrid ANC headphones": "混合式主动降噪耳机",
  "2.4G/5.8G Gaming Headphones": "2.4G/5.8G 游戏耳机",
  "BT+2.4G ULL Gaming Headphones": "蓝牙+2.4G 超低延迟游戏耳机",

  "TWS HIFI Audio": "真无线高保真音频",
  "Hybrid ANC": "混合降噪",
  "TWS Hearing Enhancement": "真无线辅听耳机",
  "Dynamic spk version": "动圈单元版本",
  "Balanced armature + Dynamic spk version": "动铁+动圈单元版本",

  "With XMOS/Advanced 6 Mics": "搭载 XMOS/高端六麦",

  "In-ear Earphones": "入耳式耳机",
  Others: "其他",
  "Communications Headphones (With Mic Rod)": "通讯耳机（带麦克风杆）",
  "Special type headphones": "特种耳机",
  "Protection Headphones （NRR & SNR）": "防护耳机（NRR & SNR）",
  "ANC & ENC Headphones （Carbon Fiber ）": "ANC & ENC 耳机（碳纤维）",
  "Helmet headphones": "头盔耳机",

  "Protection in-ear Earphone （NRR & SNR）": "防护入耳式耳机（NRR & SNR）",
  "Protection TWS Earphone（NRR & SNR）": "防护真无线耳机（NRR & SNR）",
  "ANC & ENC in-ear Earphones（With Mic Rod）":
    "ANC & ENC 入耳式耳机（带麦克风杆）",
  "In-ear Earphones with ambient sound for hunting": "狩猎用环境音入耳式耳机",

  "DECT headphones": "DECT 耳机",
  "PTT function earbuds": "PTT 对讲耳机",

  "(On-ear/Overear)": "（贴耳式/包耳式）",

  "Fast navigation": "快速导航",
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
