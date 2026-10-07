import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

// 避免 NavigationDuplicated 报错（原产物 app.js a18c 同款处理）
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

// 完整路由表（12 条，hash 模式）
// 除首页外的页面均为占位，待阶段 3 按 chunk 反推替换
const routes = [
  { path: "/", name: "home", component: () => import("@/views/home/Home.vue") },
  { path: "/home", redirect: "/" },
  {
    path: "/join-us",
    name: "join_us",
    component: () => import("@/views/join/JoinUs.vue"),
    meta: { title: "Join Us" },
  },
  {
    path: "/join-us/details",
    name: "join_us_details",
    component: () => import("@/views/join/JoinUsDetail.vue"),
    meta: { title: "Join Us Details" },
  },
  {
    path: "/contact-us",
    name: "contact_us",
    component: () => import("@/views/contact/ContactUs.vue"),
    meta: { title: "Contact Us" },
  },
  {
    path: "/production",
    name: "production",
    component: () => import("@/views/production/Production.vue"),
    meta: { title: "Production" },
  },
  {
    path: "/news",
    name: "news",
    component: () => import("@/views/news/News.vue"),
    meta: { title: "News" },
  },
  {
    path: "/news/detail",
    name: "news_detail",
    component: () => import("@/views/news/Detail.vue"),
    meta: { title: "News Detail" },
  },
  {
    path: "/about-aska",
    name: "about_aska",
    component: () => import("@/views/about/AboutAska.vue"),
    meta: { title: "About Aska" },
  },
  {
    path: "/r-d-center",
    name: "r_d_center",
    component: () => import("@/views/r-d/RDCenter.vue"),
    meta: { title: "R&D Center" },
  },
  {
    path: "/product-center",
    name: "product_center",
    component: () => import("@/views/product/ProductCenter.vue"),
    meta: { title: "Product Center" },
  },
  {
    path: "/product-list",
    name: "product_list",
    component: () => import("@/views/product/ProductList.vue"),
    meta: { title: "Products" },
  },
  {
    path: "/product-center/detail",
    name: "product_center_detail",
    component: () => import("@/views/product/ProductDetail.vue"),
    meta: { title: "Product Detail" },
  },
  {
    path: "/product-center?name=Consumer Audi",
    name: "Consumer_Audi",
    component: () => import("@/views/product/ProductCenter.vue"),
    meta: { title: "Consumer Audi" },
  },
  {
    path: "/product-center?name=TWS",
    name: "TWS",
    component: () => import("@/views/product/ProductCenter.vue"),
    meta: { title: "TWS" },
  },
];

const router = new VueRouter({ mode: "hash", routes });

// 每次切路由滚回顶部，与产物一致
router.beforeEach((to, from, next) => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
  next();
});

export default router;
