import "core-js/stable"; // polyfill
import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import BootstrapVue, { IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import VueAwesomeSwiper from "vue-awesome-swiper";
import "swiper/css/swiper.css";
import VueLazyload from "vue-lazyload";
import { VueJsonp } from "vue-jsonp";
import preview from "vue-photo-preview";
import "vue-photo-preview/dist/skin.css";
import BaiduMap from "vue-baidu-map";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import SvgIcon from "@/components/SvgIcon/index.vue";
import "./assets/css/global.css"; // 由 dist static/css/app.b8aeecf2.css 转写
import "./assets/css/rich-content.css"; // 富文本内容渲染样式（新闻/产品/招聘详情）
import { loadCategories } from "@/utils/navData";

Vue.config.productionTip = false;

// 注册顺序与原产物 app.js 56d7 一致
Vue.use(ElementUI);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueAwesomeSwiper);
Vue.use(VueLazyload);
Vue.use(VueJsonp);


// SvgIcon 全局注册 + svg sprite（symbolId: icon-[name]）
const req = require.context("@/assets/icons/svg", false, /\.svg$/);
req.keys().forEach(req);
Vue.component("svg-icon", SvgIcon);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

// 启动时加载分类树（头部/页脚/产品中心等消费 categoryStore）
loadCategories().catch(() => {});

Vue.use(BaiduMap, {ak: "1087rYB27vvzdcVyDsiXAvKpKB3ufs0A",});
// ak 沿用产物中硬编码的 key（规格文档第五节）
// Vue.use(preview, { ak: "1087rYB27vvzdcVyDsiXAvKpKB3ufs0A" });