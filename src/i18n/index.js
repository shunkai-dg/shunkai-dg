/**
 * 国际化入口（vue-i18n@8）
 * ---------------------------------------------------------------
 * 支持：中文（zh-CN）/ 英文（en-US）/ 跟随系统（auto）
 * - 语言模块按目录自动装载：./lang/zh-CN/*.js、./lang/en-US/*.js
 *   每个文件一个命名空间（文件名即命名空间，如 product.js -> $t('product.xxx')）
 * - 同时联动 ElementUI 内置文案与 <html lang>
 * - 选择结果写入 localStorage；跟随系统时监听 languagechange
 */
import Vue from "vue";
import VueI18n from "vue-i18n";
import ElementLocale from "element-ui/lib/locale";
import elementZhCN from "element-ui/lib/locale/lang/zh-CN";
import elementEnUS from "element-ui/lib/locale/lang/en";
import { termStore, translateTerm } from "./terms";

Vue.use(VueI18n);

export const LOCALE_STORAGE_KEY = "aska-locale";
export const LOCALE_ZH = "zh-CN";
export const LOCALE_EN = "en-US";
export const LOCALE_AUTO = "auto";
export const SUPPORTED_LOCALES = [LOCALE_ZH, LOCALE_EN];
/** 站点原始文案为英文，缺失译文时回退英文 */
export const DEFAULT_LOCALE = LOCALE_EN;

/** 装载某语言目录下所有命名空间模块 */
function loadModules(context) {
  const messages = {};
  context.keys().forEach((key) => {
    const name = key.replace(/^\.\//, "").replace(/\.js$/, "");
    const mod = context(key);
    messages[name] = (mod && mod.default) || mod || {};
  });
  return messages;
}

const messages = {
  [LOCALE_ZH]: loadModules(require.context("./lang/zh-CN", false, /\.js$/)),
  [LOCALE_EN]: loadModules(require.context("./lang/en-US", false, /\.js$/)),
};

/** 系统语言 -> 支持的 locale（中文系一律 zh-CN，其余 en-US） */
export function detectSystemLocale() {
  const nav =
    (typeof navigator !== "undefined" &&
      ((navigator.languages && navigator.languages[0]) || navigator.language)) ||
    "";
  return /^zh/i.test(nav) ? LOCALE_ZH : LOCALE_EN;
}

export function isValidLocale(locale) {
  return SUPPORTED_LOCALES.indexOf(locale) !== -1;
}

/** 用户选择（含 auto）-> 实际 locale */
export function resolveLocale(setting) {
  if (!setting || setting === LOCALE_AUTO) return detectSystemLocale();
  return isValidLocale(setting) ? setting : DEFAULT_LOCALE;
}

/** URL 参数覆盖（?locale=zh-CN|en-US|auto），仅用于预览/分享特定语言，不写入本地偏好 */
export function getUrlLocaleOverride() {
  if (typeof window === "undefined") return null;
  const matched = /[?&]locale=(zh-CN|en-US|en|zh|auto)\b/.exec(
    window.location.search,
  );
  if (!matched) return null;
  const value = matched[1];
  if (value === "zh") return LOCALE_ZH;
  if (value === "en") return LOCALE_EN;
  return value;
}

/** 读取用户选择，非法/未设置时回落到跟随系统 */
export function readLocaleSetting() {
  try {
    const saved = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    if (saved === LOCALE_AUTO || isValidLocale(saved)) return saved;
  } catch (e) {
    /* 忽略 */
  }
  return LOCALE_AUTO;
}

export function normalizeLocaleSetting(setting) {
  return setting === LOCALE_AUTO || isValidLocale(setting) ? setting : LOCALE_AUTO;
}

const i18n = new VueI18n({
  locale: resolveLocale(readLocaleSetting()),
  fallbackLocale: DEFAULT_LOCALE,
  messages,
  silentTranslationWarn: true,
  silentFallbackWarn: true,
});

/** 同步 ElementUI 内置文案 */
function syncElementLocale(locale) {
  ElementLocale.use(locale === LOCALE_ZH ? elementZhCN : elementEnUS);
}

/**
 * 应用语言
 * @param {string} setting zh-CN | en-US | auto
 * @param {{persist?: boolean}} [options]
 * @returns {string} 实际生效的 locale
 */
export function applyLocale(setting, options) {
  const opts = options || {};
  const normalized = normalizeLocaleSetting(setting);
  const locale = resolveLocale(normalized);

  i18n.locale = locale;
  // 供分类词典等非 message 文案使用（触发已订阅组件的重渲染）
  termStore.locale = locale;
  syncElementLocale(locale);

  if (typeof document !== "undefined") {
    document.documentElement.setAttribute(
      "lang",
      locale === LOCALE_ZH ? "zh-CN" : "en",
    );
  }
  if (opts.persist !== false) {
    try {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, normalized);
    } catch (e) {
      /* 忽略 */
    }
  }
  return locale;
}

/**
 * 跟随系统时监听系统语言变化
 * @param {() => string} getSetting 返回当前用户选择
 */
export function bindSystemLocaleListener(getSetting) {
  if (typeof window === "undefined" || !window.addEventListener) return;
  window.addEventListener("languagechange", () => {
    if (normalizeLocaleSetting(getSetting && getSetting()) === LOCALE_AUTO) {
      applyLocale(LOCALE_AUTO, { persist: false });
    }
  });
}

/** 启动时调用：应用语言 + 绑定系统语言监听 */
export function initLocale() {
  const override = getUrlLocaleOverride();
  const setting = override || readLocaleSetting();
  // URL 覆盖只影响本次访问，不污染本地偏好
  applyLocale(setting, { persist: !override });
  bindSystemLocaleListener(() => override || readLocaleSetting());
  return setting;
}

/** 语言下拉只展示语言本身（中文 / English），跟随系统项跟随界面语言 */
export const LOCALE_OPTIONS = [
  { value: LOCALE_ZH, label: "中文" },
  { value: LOCALE_EN, label: "English" },
  { value: LOCALE_AUTO, labelKey: "common.lang.auto" },
];

// 术语词典注入为全局方法：模板里 {{ $tt(cat.title) }}
Vue.mixin({
  methods: {
    /** 翻译分类等非 message 术语，查不到原样返回 */
    $tt(text) {
      return translateTerm(text);
    },
    /**
     * 统一取标题：带 i18nKey 的（导航项）走 vue-i18n，
     * 其余（API 分类树）走术语词典，查不到原样回退英文。
     */
    $label(item) {
      if (!item) return "";
      if (item.i18nKey) return this.$t(item.i18nKey);
      return translateTerm(item.title);
    },
  },
});

export { translateTerm, termStore };
export default i18n;
