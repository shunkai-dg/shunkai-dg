import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    routersList: [],
    breadcrumbListDetail: null,
  },
  plugins: [
    createPersistedState({
      paths: ["breadcrumbListDetail"],
    }),
  ],
  getters: {
    routersList: (state) => state.routersList,
    breadcrumbListDetail: (state) => state.breadcrumbListDetail,
  },
  mutations: {
    GET_ROUTERS(state, payload) {
      state.routersList = payload;
    },
    GET_ROUTERS_BREADCRUMB(state, payload) {
      state.breadcrumbListDetail = payload;
    },
  },
  actions: {
    getRouters({ commit }, payload) {
      commit("GET_ROUTERS", payload);
    },
    getBreadcrumb({ commit }, payload) {
      commit("GET_ROUTERS_BREADCRUMB", payload);
    },
  },
  modules: {},
});
