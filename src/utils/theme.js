/**
 * 主题「昼夜」控制
 * ---------------------------------------------------------------
 * 白天（day）  ：浅蓝 #D6E8F5 底 + 中蓝 #4A90C4 强调 + 深灰蓝 #1A2B3C 文字
 * 黑夜（night）：深蓝 #0B1A2F 底 + 亮蓝 #5AA9E6 强调 + 浅雾蓝 #E8F1F8 文字
 * 跟随系统（auto）：读取 prefers-color-scheme，系统切换时自动跟随
 *
 * 落地方式：把解析后的主题写到 <html data-theme="day|night">，
 * 具体色值由 src/assets/css/theme.css 中的 CSS 变量提供。
 * 切换时给 <html> 临时挂 .theme-transition（300ms 缓动，背景与文字同步渐变）。
 */

export const THEME_STORAGE_KEY = "aska-theme";

export const THEME_DAY = "day";
export const THEME_NIGHT = "night";
export const THEME_AUTO = "auto";

/** 三种可选模式（顺序即菜单顺序） */
export const THEME_MODES = [THEME_DAY, THEME_NIGHT, THEME_AUTO];

/** 过渡类名与时长（300ms 缓动 + 少量余量，避免提前撤掉） */
const TRANSITION_CLASS = "theme-transition";
const TRANSITION_DURATION = 400;

let transitionTimer = null;
let mediaQuery = null;
let mediaBound = false;
let currentMode = THEME_AUTO;

/** 系统当前偏好：dark -> night，其余 -> day */
export function getSystemTheme() {
  if (typeof window === "undefined" || !window.matchMedia) return THEME_DAY;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? THEME_NIGHT
    : THEME_DAY;
}

/** 模式 -> 实际生效主题 */
export function resolveTheme(mode) {
  if (!mode || mode === THEME_AUTO) return getSystemTheme();
  return mode === THEME_NIGHT ? THEME_NIGHT : THEME_DAY;
}

/** 非法值一律回落到跟随系统 */
export function normalizeThemeMode(mode) {
  return THEME_MODES.indexOf(mode) === -1 ? THEME_AUTO : mode;
}

/** URL 参数覆盖（?theme=day|night|auto），仅用于预览/分享特定主题，不写入本地偏好 */
export function getUrlThemeOverride() {
  if (typeof window === "undefined") return null;
  const matched = /[?&]theme=(day|night|auto)\b/.exec(window.location.search);
  return matched ? matched[1] : null;
}

/** 读取用户选择（localStorage），默认跟随系统 */
export function readThemeMode() {
  try {
    const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (saved && THEME_MODES.indexOf(saved) !== -1) return saved;
  } catch (e) {
    /* 隐私模式等场景忽略 */
  }
  return THEME_AUTO;
}

/** 切换期间开启全局颜色过渡（结束后移除，不影响常态 hover 手感） */
function setTransition(on) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  if (transitionTimer) {
    clearTimeout(transitionTimer);
    transitionTimer = null;
  }
  if (!on) {
    root.classList.remove(TRANSITION_CLASS);
    return;
  }
  root.classList.add(TRANSITION_CLASS);
  transitionTimer = setTimeout(() => {
    root.classList.remove(TRANSITION_CLASS);
    transitionTimer = null;
  }, TRANSITION_DURATION);
}

/**
 * 应用主题
 * @param {string} mode day | night | auto
 * @param {{animate?: boolean, persist?: boolean}} [options]
 * @returns {string} 实际生效的主题 day | night
 */
export function applyTheme(mode, options) {
  const opts = options || {};
  const nextMode = normalizeThemeMode(mode);
  const theme = resolveTheme(nextMode);

  if (typeof document === "undefined") return theme;

  const root = document.documentElement;
  const previous = root.getAttribute("data-theme");
  const changed = previous !== theme;
  // 首屏（还没有 data-theme）不做动画，避免加载时闪一下
  if (opts.animate !== false && changed && previous) setTransition(true);

  root.setAttribute("data-theme", theme);
  root.setAttribute("data-theme-mode", nextMode);
  root.style.colorScheme = theme === THEME_NIGHT ? "dark" : "light";

  currentMode = nextMode;

  if (opts.persist !== false) {
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, nextMode);
    } catch (e) {
      /* 忽略写入失败 */
    }
  }
  return theme;
}

/** 语义化入口：设置用户选择并立即生效 + 持久化 */
export function setThemeMode(mode, options) {
  return applyTheme(mode, options);
}

/** 系统主题变化监听：仅在「跟随系统」时自动跟随 */
function bindSystemThemeListener() {
  if (
    mediaBound ||
    typeof window === "undefined" ||
    !window.matchMedia
  ) {
    return;
  }
  mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const handler = () => {
    if (currentMode === THEME_AUTO) {
      applyTheme(THEME_AUTO, { persist: false });
    }
  };
  if (mediaQuery.addEventListener) {
    mediaQuery.addEventListener("change", handler);
  } else if (mediaQuery.addListener) {
    // 兼容旧内核
    mediaQuery.addListener(handler);
  }
  mediaBound = true;
}

/** 启动时调用：读取偏好、无动画应用、绑定系统监听 */
export function initTheme() {
  const override = getUrlThemeOverride();
  const mode = override || readThemeMode();
  // URL 覆盖只影响本次访问，不污染本地偏好
  applyTheme(mode, { animate: false, persist: !override });
  bindSystemThemeListener();
  return mode;
}

/** 当前生效主题（不想读 DOM 时使用） */
export function getCurrentTheme() {
  if (typeof document !== "undefined") {
    const attr = document.documentElement.getAttribute("data-theme");
    if (attr === THEME_DAY || attr === THEME_NIGHT) return attr;
  }
  return resolveTheme(currentMode);
}

export default {
  THEME_STORAGE_KEY,
  THEME_DAY,
  THEME_NIGHT,
  THEME_AUTO,
  THEME_MODES,
  getSystemTheme,
  resolveTheme,
  normalizeThemeMode,
  readThemeMode,
  applyTheme,
  setThemeMode,
  initTheme,
  getCurrentTheme,
};
