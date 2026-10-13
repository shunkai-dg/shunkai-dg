/**
 * 本地数据的中英文切换（products / news / jobs / steps）
 * ---------------------------------------------------------------
 * 数据源：src/api/data/*.json。英文是基准文案（原字段保持原样不动），
 * 中文以 _zh 后缀并排存放：title_zh / sub_title_zh / descr_zh / params_zh /
 * content_zh / department_zh / position_zh …
 * 某个中文字段缺失（没写或为空串）时按「字段」回退英文，因此漏译不会出现空白，
 * 英文站也不受任何影响。category.json 不在这里处理：分类标题走
 * src/i18n/terms.js 的词表 + $tt/$label，已经是响应式的。
 *
 * 「切换语言时数据自动响应」是怎么实现的：
 *   1. 每条记录产出一个 Vue.observable 视图对象（页面模板读到的就是它），
 *      同时把该记录的中英文取值登记进 registry；
 *   2. 监听 termStore.locale（applyLocale 会同时改 i18n.locale 与 termStore.locale，
 *      见 src/i18n/index.js），语言一变就地改写视图对象上的文案字段；
 *   3. 视图对象是响应式的，所以已渲染的列表、详情页会立刻重渲染 ——
 *      不需要重新请求接口，也不需要改动任何页面组件。
 *
 * 只翻译 _zh 涉及的文案字段：id、imgs、cat_* 分类 id、sort/top、日期、year、
 * quantity 等原样保留，数组顺序与条数也不变（JoinUsDetail 等按索引取数据）。
 */
import Vue from "vue";
import { termStore } from "@/i18n/terms";

import products from "./data/products.json";
import news from "./data/news.json";
import jobs from "./data/jobs.json";
import steps from "./data/steps.json";

/** 中文字段后缀 */
const ZH_SUFFIX = "_zh";

/** 各数据集需要随语言切换的文案字段（中文对应「字段 + _zh」） */
const PRODUCT_FIELDS = ["title", "sub_title", "descr", "params"];
const NEWS_FIELDS = ["title", "descr", "content"];
const JOB_FIELDS = ["department", "position", "descr"];
const STEP_FIELDS = ["title"];

/** 已产出的数据视图，形如 { view, fields, en, zh } */
const registry = [];

function isZhLocale(locale) {
  return /^zh/i.test(String(locale || ""));
}

/** 取中文字段：未配置或空串时回退英文 */
function zhValueOf(record, field) {
  const zh = record[field + ZH_SUFFIX];
  return zh == null || zh === "" ? record[field] : zh;
}

/** 拆出一条记录的中英文取值，并生成不含 _zh 原字段的视图骨架 */
function createEntry(record, fields) {
  const view = {};
  Object.keys(record).forEach((key) => {
    // 中文原字段只给数据层用，不外泄给页面
    if (key.slice(-ZH_SUFFIX.length) !== ZH_SUFFIX) view[key] = record[key];
  });

  const en = {};
  const zh = {};
  fields.forEach((field) => {
    en[field] = record[field];
    zh[field] = zhValueOf(record, field);
  });

  return { view, fields, en, zh };
}

/**
 * 按语言就地刷新所有数据视图
 * 视图字段是响应式的，改写即触发用到它们的组件重渲染。
 * @param {string} locale zh-CN | en-US
 */
export function applyDataLocale(locale) {
  const zh = isZhLocale(locale);
  registry.forEach((entry) => {
    const source = zh ? entry.zh : entry.en;
    entry.fields.forEach((field) => {
      if (entry.view[field] !== source[field])
        entry.view[field] = source[field];
    });
  });
}

/** 把一组记录变成「随语言切换」的响应式数据，顺序与条数保持不变 */
function localize(records, fields) {
  return (records || []).map((record) => {
    const entry = createEntry(record, fields);
    registry.push(entry);
    return Vue.observable(entry.view);
  });
}

export const localizedProducts = localize(products.products, PRODUCT_FIELDS);
export const localizedNews = localize(news.news, NEWS_FIELDS);
export const localizedJobs = localize(jobs.jobs, JOB_FIELDS);
export const localizedSteps = localize(steps.steps, STEP_FIELDS);

// 按当前语言初始化（initLocale() 之前调用时先按 termStore 默认值英文渲染）
applyDataLocale(termStore.locale);

// 语言切换 -> 刷新全部数据视图
// 独立实例只做订阅，不挂载 DOM，随应用常驻
new Vue({
  computed: {
    dataLocale() {
      return termStore.locale;
    },
  },
  watch: {
    dataLocale(locale) {
      applyDataLocale(locale);
    },
  },
});
