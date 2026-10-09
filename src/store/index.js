import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import {
  readThemeMode,
  normalizeThemeMode,
  resolveTheme,
  setThemeMode as applyThemeMode,
  getSystemTheme,
  getUrlThemeOverride,
} from "@/utils/theme";
import {
  readLocaleSetting,
  normalizeLocaleSetting,
  applyLocale,
  resolveLocale,
  getUrlLocaleOverride,
} from "@/i18n";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    routersList: [],
    breadcrumbListDetail: null,
    // 外观：白天浅蓝 / 黑夜深蓝 / 跟随系统（持久化由 utils/theme.js 负责）
    // URL ?theme= 覆盖优先，仅本次访问生效
    themeMode: getUrlThemeOverride() || readThemeMode(),
    // 语言：zh-CN / en-US / 跟随系统（持久化由 i18n/index.js 负责）
    localeSetting: getUrlLocaleOverride() || readLocaleSetting(),
  },
  plugins: [
    createPersistedState({
      paths: ["breadcrumbListDetail"],
    }),
  ],
  getters: {
    routersList: (state) => state.routersList,
    breadcrumbListDetail: (state) => state.breadcrumbListDetail,
    /** 实际生效主题：day | night */
    resolvedTheme: (state) =>
      state.themeMode === "auto"
        ? getSystemTheme()
        : resolveTheme(state.themeMode),
    /** 实际生效语言：zh-CN | en-US */
    resolvedLocale: (state) => resolveLocale(state.localeSetting),
  },
  mutations: {
    GET_ROUTERS(state, payload) {
      state.routersList = payload;
    },
    GET_ROUTERS_BREADCRUMB(state, payload) {
      state.breadcrumbListDetail = payload;
    },
    SET_THEME_MODE(state, mode) {
      state.themeMode = normalizeThemeMode(mode);
      applyThemeMode(state.themeMode);
    },
    SET_LOCALE_SETTING(state, setting) {
      state.localeSetting = normalizeLocaleSetting(setting);
      applyLocale(state.localeSetting);
    },
  },
  actions: {
    getRouters({ commit }, payload) {
      commit("GET_ROUTERS", payload);
    },
    getBreadcrumb({ commit }, payload) {
      commit("GET_ROUTERS_BREADCRUMB", payload);
    },
    setThemeMode({ commit }, mode) {
      commit("SET_THEME_MODE", mode);
    },
    setLocaleSetting({ commit }, setting) {
      commit("SET_LOCALE_SETTING", setting);
    },
  },
  modules: {},
});
