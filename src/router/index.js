import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

// 避免 NavigationDuplicated 报错（原产物 app.js a18c 同款处理）
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

// 塑胶模具小工厂版路由表（5 个核心页面 + 产品详情 + 搜索列表）
// 已按改造方案砍掉：研发中心 /r-d-center、生产制造 /production、加入我们 /join-us
const routes = [
  { path: "/", name: "home", component: () => import("@/views/home/Home.vue") },
  { path: "/home", redirect: "/" },
  {
    path: "/about-shunkai",
    name: "about_shunkai",
    component: () => import("@/views/about/Aboutshunkai.vue"),
    meta: { title: "About shunkai", titleKey: "common.page.aboutshunkai" },
  },
  {
    path: "/product-center",
    name: "product_center",
    component: () => import("@/views/product/ProductCenter.vue"),
    meta: { title: "Product Center", titleKey: "common.page.productCenter" },
  },
  {
    path: "/product-center/detail",
    name: "product_center_detail",
    component: () => import("@/views/product/ProductDetail.vue"),
    meta: { title: "Product Detail", titleKey: "common.page.productDetail" },
  },
  {
    path: "/product-list",
    name: "product_list",
    component: () => import("@/views/product/ProductList.vue"),
    meta: { title: "Products", titleKey: "common.page.products" },
  },
  {
    path: "/news",
    name: "news",
    component: () => import("@/views/news/News.vue"),
    meta: { title: "News", titleKey: "common.page.news" },
  },
  {
    path: "/news/detail",
    name: "news_detail",
    component: () => import("@/views/news/Detail.vue"),
    meta: { title: "News Detail", titleKey: "common.page.newsDetail" },
  },
  {
    path: "/contact-us",
    name: "contact_us",
    component: () => import("@/views/contact/ContactUs.vue"),
    meta: { title: "Contact Us", titleKey: "common.page.contactUs" },
  },
  // 兜底：旧地址（研发中心/生产制造/加入我们/泰国工厂等）统一回首页，避免 404 空白
  { path: "/r-d-center", redirect: "/" },
  { path: "/production", redirect: "/about-shunkai" },
  { path: "/join-us", redirect: "/contact-us" },
  { path: "/join-us/details", redirect: "/contact-us" },
  { path: "*", redirect: "/" },
];

const router = new VueRouter({ mode: "hash", routes });

// 每次切路由滚回顶部，与产物一致
router.beforeEach((to, from, next) => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
  next();
});

export default router;
