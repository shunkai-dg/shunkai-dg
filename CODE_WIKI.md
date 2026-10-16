# shunkai-dg 项目 CODE WIKI

> 本文档为 shunkai-dg 官网前端（Vue 2 反推重建版）的完整工程 Wiki，严格分为 **技术文档** 与 **产品文档** 两大独立模块。
> 技术模块面向开发人员（函数定义 / 参数 / 返回值 / 调用示例 / 依赖 / 异常），产品模块面向产品与运营人员（站点结构 / 页面内容 / 功能清单 / 交互 / 视觉 / 用户流程）。

| 项 | 值 |
| --- | --- |
| 项目名称 | shunkai-dg（shunkai 官网 · Vue 2 前端） |
| 代码仓库 | `d:\ZZH\aska\github\shunkai-dg` |
| 技术栈 | Vue 2.7 + vue-cli 4 + Vuex 3 + vue-router 3 + vue-i18n 8 + ElementUI 2 + BootstrapVue |
| 运行模式 | 纯前端 SPA，数据由本地 JSON 模拟，无需后端即可运行 |
| 路由模式 | hash（`mode: "hash"`） |
| 文档版本 | v2.0（塑胶模具小工厂版改造后，对应当前代码库） |
| 文档语言 | 中文（附英文键名原文） |

---

## 目录索引

### 第一部分 · 技术文档（TECH）

| 章节 | 标题 | 定位 |
| --- | --- | --- |
| [T1](#t1-项目概览) | 项目概览（技术栈 / 工程配置 / 目录结构 / 启动流程） | 全局 |
| [T2](#t2-核心模块) | 核心模块（路由 / 状态 / 国际化 / 数据 API / 工具库） | 基础设施 |
| [T3](#t3-通用组件函数说明) | 通用组件函数说明（9 个组件） | 组件层 |
| [T4](#t4-视图页面函数说明) | 视图页面函数说明（12 个页面） | 页面层 |
| [T5](#t5-本地数据模型) | 本地数据模型（JSON Schema） | 数据层 |
| [T6](#t6-异常处理与工程约定) | 异常处理与工程约定 | 规约 |
| [T7](#t7-构建部署与质量) | 构建、部署与质量 | 工程化 |

### 第二部分 · 产品文档（PRODUCT）

| 章节 | 标题 | 定位 |
| --- | --- | --- |
| [P1](#p1-产品概述) | 产品概述（定位 / 目标用户 / 核心价值） | 概述 |
| [P2](#p2-站点信息架构) | 站点信息架构（站点地图 / 路由对照） | 结构 |
| [P3](#p3-全局模块内容与交互) | 全局模块内容与交互（头部 / 导航 / 页脚 / 搜索 / 面包屑） | 全局 |
| [P4](#p4-页面内容说明书) | 页面内容说明书（逐页面内容清单） | 页面 |
| [P5](#p5-功能模块展示清单) | 功能模块展示清单 | 功能 |
| [P6](#p6-交互逻辑说明) | 交互逻辑说明 | 交互 |
| [P7](#p7-视觉展示效果规范) | 视觉展示效果规范（主题令牌 / 响应式 / 组件样式） | 视觉 |
| [P8](#p8-用户使用流程说明) | 用户使用流程说明 | 流程 |
| [P9](#p9-多语言内容清单) | 多语言内容清单 | 国际化 |

### 第三部分 · 附录（APPENDIX）

| 章节 | 标题 |
| --- | --- |
| [A1](#a1-可扩展更新节点) | 可扩展更新节点（文档维护锚点） |
| [A2](#a2-已知偏差与占位实现) | 已知偏差与占位实现 |
| [A3](#a3-变更记录) | 变更记录 |

---

# 第一部分 · 技术文档（TECH）

## T1 项目概览

### T1.1 技术栈与依赖

**运行时依赖**（`package.json` → `dependencies`）：

| 包 | 版本 | 用途 |
| --- | --- | --- |
| `vue` | ^2.7.16 | 框架内核（含 `Vue.observable` 响应式能力） |
| `vue-router` | ^3.6.5 | 路由（hash 模式） |
| `vuex` | ^3.6.2 | 状态管理 |
| `vuex-persistedstate` | ^4.1.0 | `breadcrumbListDetail` 持久化 |
| `vue-i18n` | ^8.28.2 | 国际化（zh-CN / en-US / auto） |
| `element-ui` | ^2.15.14 | 基础 UI（表单、分页、菜单、弹层、图片预览源） |
| `bootstrap-vue` + `bootstrap` | ^2.23.1 / ^4.6.2 | 布局与栅格 |
| `vue-awesome-swiper` + `swiper` | ^4.1.1 / ^5.4.5 | 轮播（首页 banner、生产、研发、证书） |
| `vue-baidu-map` | ^0.21.22 | 联系我们页地图（AK 见 `main.js`） |
| `axios` | ^0.27.2 | 原始 HTTP 客户端（`request.js`，当前未启用） |
| `js-cookie` | ^3.0.5 | Token 存取（`utils/auth.js`） |
| `path-to-regexp` | ^1.8.0 | 动态路径编译（产品详情面包屑） |
| `vue-lazyload` | ^1.3.3 | 图片懒加载（已注册） |
| `vue-jsonp` | ^2.0.0 | JSONP（已注册） |
| `vue-photo-preview` | ^1.1.3 | 图片预览（已注册，实际预览走 `ImagePreview` 组件） |

**开发依赖**：`@vue/cli-service` ^4.5.19、`sass` ^1.77.8、`sass-loader` ^10.5.2、`svg-sprite-loader` ^6.0.11、`cross-env`、`vue-template-compiler`。

**npm scripts**：

```bash
npm run serve    # 开发服务器，默认 8080；经 cross-env 注入 NODE_OPTIONS=--openssl-legacy-provider
npm run build    # 生产构建，产物 dist/
npm run format   # prettier 格式化 src/**/*.{js,ts,jsx,tsx,vue,json,css,scss,md}
```

### T1.2 工程配置

**`vue.config.js`**（[vue.config.js](file:///d:/ZZH/aska/github/shunkai-dg/vue.config.js)）

- `publicPath: '/'`、`productionSourceMap: false`、`css.extract: true`。
- `devServer`：端口 `8080`；`before(app)` 用 express 把 `src/assets/img_data` 静态托管到 `/img_data`；`proxy['/api']` 默认指向 `http://127.0.0.1:8080/`（注释中保留线上 `https://www.shunkai-dg.cn`，仅当切回真实接口时才需要，当前本地 API 不走 proxy）。
- `chainWebpack`：
  1. 从默认 `svg` 规则中排除 `src/assets/icons/svg`；
  2. 新增 `icons` 规则，用 `svg-sprite-loader` 处理上述目录，`symbolId: 'icon-[name]'`；
  3. 在 `copy` 插件中追加：构建时把 `src/assets/img_data` 复制到产物 `dist/img_data`，供 `RESOURCE_BASE_URL` 拼接访问。

**环境变量**：`.env.development` 与 `.env.production` 均仅含 `VUE_APP_BASE_API=''`（同域，无前缀）。

**`babel.config.js`**：`@vue/cli-plugin-babel` 预设。

**CI/CD**：[gh-pages.yml](file:///d:/ZZH/aska/github/shunkai-dg/.github/workflows/gh-pages.yml) — push 到 `main` 分支后，Node 20 环境 `npm ci` → `npm run build` → 上传 `dist` 为 Pages 产物 → `deploy-pages` 部署到 GitHub Pages。

### T1.3 目录结构

```
public/                    HTML 模板（主题/语言首屏前置脚本 + Pageclip 脚本）
src/
  App.vue                  根组件（header / router-view / footer / 返回顶部）
  main.js                  应用入口（插件注册、主题与语言初始化、分类加载）
  api/
    index.js               本地 API 服务（10 个导出函数，见 T2.4）
    localizedData.js       产品/资讯/职位/流程 的中英文响应式切换
    request.js             原始 axios 实例（保留回退，未启用）
    data/                  本地 JSON 数据（见 T5）
  assets/
    css/                   global.css / header.scss / rich-content.css / theme.css
    icons/svg/             svg sprite 图标
    img/ img_data/         静态图片与占位图（构建时复制到 dist/img_data）
  components/              9 个通用组件（见 T3）
  i18n/
    index.js               VueI18n 实例、语言解析/持久化、ElementUI 同步、全局 $tt/$label
    terms.js               分类/术语词典（英文分类名 → 中文）
    lang/{zh-CN,en-US}/*.js 各命名空间文案（文件名即命名空间）
  router/index.js          路由表（13 条 path 定义）
  store/index.js           Vuex（主题/语言/面包屑）
  utils/
    theme.js               昼夜主题控制
    navData.js             分类树构建、导航数据、hierarchy 路径解析
    resource.js            资源前缀 RESOURCE_BASE_URL
    auth.js                Token（Cookie）读写
    scrollLock.js          浮层滚动锁 mixin
  views/                   12 个页面组件（见 T4）
```

### T1.4 应用启动流程

入口 [main.js](file:///d:/ZZH/aska/github/shunkai-dg/src/main.js) 的执行顺序（严格）：

1. `import "core-js/stable"`（polyfill）。
2. 引入 ElementUI / BootstrapVue / Swiper / Lazyload / Jsonp 及其样式。
3. `Vue.config.productionTip = false`。
4. `initTheme()`（[utils/theme.js](file:///d:/ZZH/aska/github/shunkai-dg/src/utils/theme.js)）——**挂载前**应用主题，避免首屏闪烁。
5. `Vue.use(ElementUI)` → `BootstrapVue` → `IconsPlugin` → `VueAwesomeSwiper` → `VueLazyload` → `VueJsonp`。
6. `initLocale()`（[i18n/index.js](file:///d:/ZZH/aska/github/shunkai-dg/src/i18n/index.js)）——须在 ElementUI 之后，以便同步其内置文案。
7. `require.context('@/assets/icons/svg')` 全量加载 svg，`Vue.component('svg-icon', SvgIcon)`。
8. `new Vue({ i18n, router, store, render }).$mount('#app')`。
9. `loadCategories().catch(() => {})`——启动时异步加载分类树（头部 / 页脚 / 产品中心消费 `categoryStore`）。
10. `Vue.use(BaiduMap, { ak: 'iHQGprnI0bwcatMOA7R0Pk6FvcUG1ASy' })`。

根组件 [App.vue](file:///d:/ZZH/aska/github/shunkai-dg/src/App.vue)：渲染 `headerContent` → `<router-view :key="$route.path">` → `footerContent`，并提供 `provide: { reload }` 供新闻详情页注入使用；滚动超过 900px 显示返回顶部按钮。

> **注意**：`<router-view :key="$route.path">` 使每次路径变化都重建页面组件（不依赖 keep-alive）；`Home.vue` 中的 `activated()` 保留为反推自原产物的兼容逻辑，当前无 `keep-alive` 包裹，不会触发。

---

## T2 核心模块

### T2.1 路由 `src/router/index.js`

文件：[router/index.js](file:///d:/ZZH/aska/github/shunkai-dg/src/router/index.js)

**全局行为**

- 覆写 `VueRouter.prototype.push`，对 `NavigationDuplicated` 统一 `.catch(err => err)`，避免重复导航报错。
- `new VueRouter({ mode: "hash", routes })`。
- `router.beforeEach((to, from, next) => { document.body.scrollTop = 0; document.documentElement.scrollTop = 0; next(); })`：每次切路由滚回顶部。

**路由表（塑胶模具小工厂版，改造后共 14 条定义）**

| # | path | name | 组件 | meta.titleKey |
| --- | --- | --- | --- | --- |
| 1 | `/` | `home` | `views/home/Home.vue` | — |
| 2 | `/home` | — | redirect → `/` | — |
| 3 | `/about-shunkai` | `about_shunkai` | `views/about/Aboutshunkai.vue` | `common.page.aboutshunkai` |
| 4 | `/product-center` | `product_center` | `views/product/ProductCenter.vue` | `common.page.productCenter` |
| 5 | `/product-center/detail` | `product_center_detail` | `views/product/ProductDetail.vue` | `common.page.productDetail` |
| 6 | `/product-list` | `product_list` | `views/product/ProductList.vue` | `common.page.products` |
| 7 | `/news` | `news` | `views/news/News.vue` | `common.page.news` |
| 8 | `/news/detail` | `news_detail` | `views/news/Detail.vue` | `common.page.newsDetail` |
| 9 | `/contact-us` | `contact_us` | `views/contact/ContactUs.vue` | `common.page.contactUs` |
| 10 | `/r-d-center` | — | redirect → `/`（旧地址兜底） | — |
| 11 | `/production` | — | redirect → `/about-shunkai`（内容已并入关于页） | — |
| 12 | `/join-us` | — | redirect → `/contact-us` | — |
| 13 | `/join-us/details` | — | redirect → `/contact-us` | — |
| 14 | `*` | — | redirect → `/`（未匹配兜底） | — |

**改造后移除的页面**（2026 塑胶模具小工厂版）：

- 研发中心 `/r-d-center`：小工厂无独立研发展示需求，路由与组件停用。
- 生产制造 `/production`：设备与产能内容合并进「关于我们」，原页面停用。
- 加入我们 `/join-us`：本来就没启用，直接删代码。
- 产品多级分类树：产品中心改为顶部一级分类标签切换，不再使用 `/product-center?name=...` 形式的伪路由。

> 停用页面在 `src/views/{r-d,production,join,placeholder}` 与 `src/components/ProductTreeMenu` 中保留为空壳文件（含停用说明），可安全整目录删除。

**依赖**：`vue`、`vue-router`、各页面组件（懒加载 `() => import(...)`）、`i18n` 文案键（`meta.titleKey`）。

### T2.2 状态管理 `src/store/index.js`

文件：[store/index.js](file:///d:/ZZH/aska/github/shunkai-dg/src/store/index.js)

**state**

| 字段 | 类型 | 初值 | 说明 |
| --- | --- | --- | --- |
| `routersList` | `Array` | `[]` | 面包屑层级列表（由 Breadcrumb 广播） |
| `breadcrumbListDetail` | `Array\|null` | `null` | 产品详情页面包屑（持久化） |
| `themeMode` | `string` | `getUrlThemeOverride() \|\| readThemeMode()` | `day` / `night` / `auto` |
| `localeSetting` | `string` | `getUrlLocaleOverride() \|\| readLocaleSetting()` | `zh-CN` / `en-US` / `auto` |

**plugins**：`createPersistedState({ paths: ["breadcrumbListDetail"] })`——仅持久化 `breadcrumbListDetail`。

**getters**

- `routersList(state)` → `Array`
- `breadcrumbListDetail(state)` → `Array|null`
- `resolvedTheme(state)` → `"day" | "night"`：`themeMode === "auto" ? getSystemTheme() : resolveTheme(themeMode)`（依赖 `utils/theme.js`）
- `resolvedLocale(state)` → `"zh-CN" | "en-US"`：`resolveLocale(localeSetting)`（依赖 `i18n/index.js`）

**mutations**

| mutation | payload | 行为 |
| --- | --- | --- |
| `GET_ROUTERS(state, payload)` | 层级数组 | 赋值 `state.routersList` |
| `GET_ROUTERS_BREADCRUMB(state, payload)` | 面包屑数组 | 赋值 `state.breadcrumbListDetail` |
| `SET_THEME_MODE(state, mode)` | 模式串 | `normalizeThemeMode` 后赋值，并调用 `applyThemeMode` 落盘 |
| `SET_LOCALE_SETTING(state, setting)` | 语言设置 | `normalizeLocaleSetting` 后赋值，并调用 `applyLocale` 落盘 |

**actions**：`getRouters`、`getBreadcrumb`、`setThemeMode`、`setLocaleSetting`（均为 commit 对应 mutation 的薄封装）。

**modules**：`{}`（当前无子模块）。

**调用示例**

```js
// 切换主题（PreferenceSwitch 组件内）
this.$store.dispatch("setThemeMode", "night");
// 读取实际生效主题
const theme = this.$store.getters.resolvedTheme; // "day" | "night"
```

### T2.3 国际化 `src/i18n/`

#### T2.3.1 `i18n/index.js`

文件：[i18n/index.js](file:///d:/ZZH/aska/github/shunkai-dg/src/i18n/index.js)

**导出常量**

| 常量 | 值 | 说明 |
| --- | --- | --- |
| `LOCALE_STORAGE_KEY` | `"shunkai-locale"` | localStorage 键 |
| `LOCALE_ZH` / `LOCALE_EN` / `LOCALE_AUTO` | `"zh-CN"` / `"en-US"` / `"auto"` | 语言标识 |
| `SUPPORTED_LOCALES` | `["zh-CN", "en-US"]` | 受支持语言 |
| `DEFAULT_LOCALE` | `"en-US"` | 回退语言（原文即英文） |
| `LOCALE_OPTIONS` | `[{value,label}...]` | 下拉选项（auto 用 `labelKey: "common.lang.auto"`） |
| `i18n`（default） | VueI18n 实例 | `locale` / `fallbackLocale` / `messages` / `silentTranslationWarn` / `silentFallbackWarn` |

**核心函数**

| 函数 | 参数 | 返回 | 说明 |
| --- | --- | --- | --- |
| `loadModules(context)`（内部） | `require.context` | `{[ns]: messages}` | 用文件名（去 `./` 与 `.js`）作为命名空间装载 |
| `detectSystemLocale()` | — | `"zh-CN"\|"en-US"` | `navigator.languages[0]` / `navigator.language` 以 `^zh` 判定 |
| `isValidLocale(locale)` | `string` | `boolean` | 是否在 `SUPPORTED_LOCALES` |
| `resolveLocale(setting)` | `"zh-CN"\|"en-US"\|"auto"` | `locale` | auto → `detectSystemLocale()`；非法 → `DEFAULT_LOCALE` |
| `getUrlLocaleOverride()` | — | `locale\|null` | 解析 `?locale=zh-CN\|en-US\|en\|zh\|auto`（`zh→zh-CN`，`en→en-US`） |
| `readLocaleSetting()` | — | `setting` | 读 localStorage，非法/缺失回退 `"auto"`（try/catch 吞异常） |
| `normalizeLocaleSetting(setting)` | `any` | `setting` | 合法值原样，否则 `"auto"` |
| `syncElementLocale(locale)`（内部） | `locale` | — | `ElementLocale.use(zhCN\|en)` |
| `applyLocale(setting, options?)` | `setting`, `{persist?:boolean}` | `locale` | 同步设置 `i18n.locale`、`termStore.locale`、ElementUI 文案、`<html lang>`；`persist !== false` 时写 localStorage |
| `bindSystemLocaleListener(getSetting)` | `()=>string` | — | 监听 window `languagechange`，仅当当前设置为 auto 时重新解析 |
| `initLocale()` | — | `setting` | 启动用：URL 覆盖优先，`applyLocale(persist: !override)` 并绑定系统监听 |

**全局 mixin（`Vue.mixin`）** 提供两个模板方法：

| 方法 | 参数 | 返回 | 说明 |
| --- | --- | --- | --- |
| `$tt(text)` | 术语原文 | 译文/原文 | 调用 `translateTerm(text)` |
| `$label(item)` | 导航项/分类项 | 文案 | `item.i18nKey` → `this.$t`；否则 `translateTerm(item.title)` |

**依赖**：`vue`、`vue-i18n`、`element-ui/lib/locale`、`terms.js`。
**异常处理**：localStorage 读写全部 try/catch 静默；翻译缺失由 `silentTranslationWarn` / `silentFallbackWarn` 静默并回退英文。

**调用示例**

```js
import { applyLocale } from "@/i18n";
applyLocale("zh-CN");            // 切换中文并持久化
applyLocale("en-US", { persist: false }); // 仅本次生效，不落盘
```

#### T2.3.2 `i18n/terms.js`

文件：[terms.js](file:///d:/ZZH/aska/github/shunkai-dg/src/i18n/terms.js)

| 导出 | 类型 | 说明 |
| --- | --- | --- |
| `termStore` | `Vue.observable({ locale: "en-US" })` | 响应式语言指示器；`applyLocale` 会同步写入，订阅它的组件随语言重渲染 |
| `translateTerm(text)` | `string → string` | 空值原样返回；`termStore.locale === "zh-CN"` 时查 `ZH_TERMS` 命中返回中文，否则原样回退 |
| `ZH_TERMS`（内部） | `{[en]: zh}` | 分类标题 / 描述 / 导航术语词典（约 40 条） |
| default | `translateTerm` | — |

**依赖**：`vue`。`category.json` 不进入 i18n message，分类标题统一走本词典 + `$tt/$label`。

### T2.4 数据与 API 层

#### T2.4.1 `api/index.js` —— 本地数据服务（当前生效）

文件：[api/index.js](file:///d:/ZZH/aska/github/shunkai-dg/src/api/index.js)

**约定**：所有函数返回 `Promise<{ data: ... }>`（统一响应壳 `ok(data)`）；调用方 `.then(res => res.data)`。分页结构统一为 `{ list: [...], total: number }`。

**内部辅助**

| 函数 | 参数 | 返回 | 说明 |
| --- | --- | --- | --- |
| `ok(data)` | `any` | `Promise<{data}>` | 包装响应壳 |
| `paginate(list, params)` | `list`, `{page?,limit?}` | `{list,total}` | `page` 默认 1、`limit` 默认 10；`start=(page-1)*limit` 后 `slice` |

**导出函数（10 个）**

| 函数 | 入参 | 返回 `data` | 行为 / 依赖 |
| --- | --- | --- | --- |
| `seoList(params = {})` | `{page?,limit?}` | `{list,total}` | 职位列表，数据源 `localizedJobs` |
| `getImg(data = {})` | `{type}` | `Array` | 按 `type` 取 `imgs.json` 图片；类型见 T5.3；缺失返回 `[]` |
| `getInfoList(params = {})` | `{page?,limit?}` | `{list,total}` | 资讯列表；先按 `top` 降序、`sort` 升序排序再分页（`Number(b.top)-Number(a.top)`，`sort` 升序） |
| `getInfoView(data = {})` | `{id}` | 单条资讯 | 按 `String(id)` 精确匹配 `localizedNews`；未命中回退 `localizedNews[0] || {}` |
| `setInfoContact(data)` | `{name,mobile,email,content}` | `{code:40000,message}` | 联系表单写入 Pageclip（见下） |
| `getProductList(params = {})` | `{keyword?,cat_id?,is_top?,page?,limit?}` | `{list,total}` | 过滤 + 分页（见下） |
| `getProductDetail(data = {})` | `{id}` | 单个产品 | 按 `String(id)` 匹配 `localizedProducts`；未命中回退 `[0] || {}` |
| `getStepList(params = {})` | — | `Array` | 研发历程，数据源 `localizedSteps`（不分页） |
| `getSetting(data = {})` | — | `Object` | 站点设置（`setting.json`） |
| `getCategory(params = {})` | — | `Array` | 分类平铺数组（`category.json` 的 `category` 字段） |

**`getProductList` 过滤规则（顺序执行）**

1. `keyword`：`params.keyword` trim + 小写；匹配 `title` 或 `sub_title` 包含。未命中即空列表。
2. `cat_id`：`Number(params.cat_id)` 为真值时，命中 `cat_one|cat_two|cat_three|cat_four` 任一。
3. `is_top`：`=== 1` 取 `is_top === 1` 的推荐产品；`=== 0` 取前 4 条；其他值不过滤。
4. 最后 `paginate`。

**`setInfoContact` 异常与降级**

- 常量：`PAGECLIP_SITE_KEY = "e3vqonw5pA6peER9ooUZEEwQtG9SYGjC"`、`PAGECLIP_FORM_NAME = "Contact"`、`PAGECLIP_ENDPOINT = https://send.pageclip.co/{key}/Contact`。
- 主路径：若 `window.Pageclip.send` 可用，调 `pageclip.send(key, form, payload, cb)`；`cb(error)` 存在则 `reject(new Error(...))`，否则 `resolve({code:40000,message:"success"})`。
- 兜底路径：脚本未加载时以 `URLSearchParams` 做 `fetch(PAGECLIP_ENDPOINT, {method:'POST', headers:{Accept:'application/json'}, body})`；`!res.ok` 抛 `Error("Pageclip request failed: <status>")`；成功返回 `{code:40000,...}`。
- 依赖：`localizedData.js`、`data/imgs.json`、`data/setting.json`、`data/category.json`、全局 `window.Pageclip`。

**调用示例**

```js
import { getProductList, setInfoContact } from "@/api/index";

getProductList({ is_top: 1 }).then(res => console.log(res.data.list, res.data.total));
getProductList({ keyword: "anc", cat_id: 10, page: 1, limit: 6 });

setInfoContact({ name: "A", mobile: "137", email: "", content: "hi" })
  .then(r => r.code === 40000 && console.log("ok"))
  .catch(e => console.error(e));
```

#### T2.4.2 `api/localizedData.js` —— 数据中英文切换

文件：[localizedData.js](file:///d:/ZZH/aska/github/shunkai-dg/src/api/localizedData.js)

**思路**：英文为基准字段；中文以 `_zh` 后缀并排。每条记录产出一个 `Vue.observable` 视图对象（页面读到的即它），并在 `termStore.locale` 变化时就地改写文案字段 → 已渲染列表/详情自动重渲染。

**字段映射**

| 数据集 | 随语言切换的字段 | 常量 |
| --- | --- | --- |
| products | `title / sub_title / descr / params` | `PRODUCT_FIELDS` |
| news | `title / descr / content` | `NEWS_FIELDS` |
| jobs | `department / position / descr` | `JOB_FIELDS` |
| steps | `title` | `STEP_FIELDS` |

**函数**

| 函数 | 参数 | 返回 | 说明 |
| --- | --- | --- | --- |
| `isZhLocale(locale)`（内部） | `locale` | `boolean` | `/^zh/i` 判定 |
| `zhValueOf(record, field)`（内部） | 记录, 字段 | `string` | `record[field+"_zh"]` 为 `null/""` 时回退英文 |
| `createEntry(record, fields)`（内部） | 记录, 字段集 | `{view, fields, en, zh}` | `view` 剔除所有 `_zh` 键；`en/zh` 存两份取值 |
| `applyDataLocale(locale)`（**导出**） | `locale` | — | 遍历 `registry`，按语言就地刷新所有视图字段（不等值才赋值） |
| `localize(records, fields)`（内部） | 记录集, 字段集 | `Array<observable>` | 生成视图 + 登记 registry |

**导出数据**：`localizedProducts`、`localizedNews`、`localizedJobs`、`localizedSteps`。
**初始化**：模块加载时 `applyDataLocale(termStore.locale)`；另建一个不挂载 DOM 的 `new Vue` 实例，`watch termStore.locale` 触发刷新。

**依赖**：`vue`、`@/i18n/terms`、四个 JSON。
**异常处理**：`_zh` 缺失按字段回退英文，杜绝空白；数组顺序与条数不变（`JoinUsDetail` 等按索引取数）。

#### T2.4.3 `api/request.js` —— 原始 axios 实现（回退参考，未启用）

文件：[request.js](file:///d:/ZZH/aska/github/shunkai-dg/src/api/request.js)

- `axios.create({ baseURL: process.env.VUE_APP_BASE_API, withCredentials: true, timeout: 30000 })`。
- 请求拦截：`getToken()` 有值时写 `config.headers.Authorization = token`；固定 `config.headers.platform = "pc"`（注释标记 `TODO: 以实际抓包值为准`）；错误 `Promise.reject(error)`。
- 响应拦截：返回 `response.data`；当 `res` 为字符串且存在 `response.request.responseText` 时尝试 `JSON.parse`，失败回退原字符串；错误 `Promise.reject(error)`。
- 依赖：`axios`、`utils/auth`。当前接入 API 均为本地 `index.js`，本文件仅作回退。

### T2.5 工具库 `src/utils/`

#### T2.5.1 `utils/theme.js`

文件：[theme.js](file:///d:/ZZH/aska/github/shunkai-dg/src/utils/theme.js)

**常量**：`THEME_STORAGE_KEY="shunkai-theme"`、`THEME_DAY="day"`、`THEME_NIGHT="night"`、`THEME_AUTO="auto"`、`THEME_MODES=[day,night,auto]`；内部 `TRANSITION_CLASS="theme-transition"`、`TRANSITION_DURATION=400`。

| 函数 | 参数 | 返回 | 说明 |
| --- | --- | --- | --- |
| `getSystemTheme()` | — | `"day"\|"night"` | `matchMedia('(prefers-color-scheme: dark)')` → night，否则 day；无 `matchMedia` 回退 day |
| `resolveTheme(mode)` | `mode` | `"day"\|"night"` | 空/auto → `getSystemTheme()`；night → night；其余 day |
| `normalizeThemeMode(mode)` | `any` | `mode` | 非 `THEME_MODES` 值一律回 `auto` |
| `getUrlThemeOverride()` | — | `"day"\|"night"\|"auto"\|null` | 解析 `?theme=` |
| `readThemeMode()` | — | `mode` | 读 localStorage，合法才返回，否则 `auto`（try/catch 吞异常） |
| `setTransition(on)`（内部） | `boolean` | — | 加/移除过渡类，400ms 后自动移除（`clearTimeout` 防抖） |
| `applyTheme(mode, options?)` | `mode`, `{animate?,persist?}` | 生效主题 | 归一化 → 解析 → 写 `<html data-theme>` / `data-theme-mode` / `style.colorScheme`；`animate !== false` 且已存在主题且变化时开过渡；`persist !== false` 写 localStorage |
| `setThemeMode(mode, options?)` | 同上 | 主题 | `applyTheme` 的语义化别名 |
| `bindSystemThemeListener()`（内部） | — | — | 监听 `prefers-color-scheme`，仅在 `currentMode === auto` 时无动画跟随 |
| `initTheme()` | — | `mode` | 启动用：URL 覆盖优先，`applyTheme(mode, {animate:false, persist:!override})` + 绑定系统监听 |
| `getCurrentTheme()` | — | `"day"\|"night"` | 优先读 DOM `data-theme`，否则由 `currentMode` 解析 |
| default export | 对象 | — | 聚合上述全部 | 

**异常处理**：`document`/`window` 未定义时安全返回；localStorage 读写 try/catch 静默。

#### T2.5.2 `utils/navData.js`

文件：[navData.js](file:///d:/ZZH/aska/github/shunkai-dg/src/utils/navData.js)

**导出数据**

| 导出 | 类型 | 说明 |
| --- | --- | --- |
| `fast_navigation` | `Object` | 页脚「快速导航」定义：`{title:"Fast navigation", i18nKey:"footer.fastNavigation", childer:[...]}`；childer 含 Home / About shunkai / Product-Center(`isSubNav`) / R&D Center / News / Production / Contact Us（Join Us 被注释） |
| `navMenus` | `Array` | `fast_navigation.childer`，头部导航渲染源；`isNav:true` 的项不在顶部菜单渲染 |
| `categoryStore` | `Vue.observable({loaded:false, roots:[]})` | 动态分类树状态；`loaded` 变化被 Breadcrumb/ProductDetail watch |
| `secondLevelGroups(roots)` | 函数 | 见下 |

**内部数据**：`icons`（6 张一级/二级图标 `require`）、`GROUP_ICONS`（两行图标数组，按位置赋给二级分组）、`_loading`（加载 Promise 单例）。

| 函数 | 参数 | 返回 | 说明 |
| --- | --- | --- | --- |
| `secondLevelGroups(roots)` | 一级根数组 | `[{title,name,childer:[{title,name,hierarchy}]}]` | 只取各一级的二级分组（`subGroups`），过滤空分组 |
| `buildCategoryTree(list)` | 平铺分类数组 | 一级 `roots` | 以 `id` 建索引 → 按 `_parent` 挂接 → `sort` 升序递归 → 一级 `subGroups = childer`，按位置补 `icon`，Headphone 补 `desc="(On-ear/Overear)"`；节点字段：`id/title/name/hierarchy/childer/desc?/path?` |
| `flatChildren(items, fallback)`（内部） | 节点集, 回退 hierarchy | 扁平列表 | 保留嵌套，用于页脚平铺（当前主要由 `secondLevelGroups` 承担） |
| `loadCategories()` | — | `Promise<roots>` | 单例加载：已加载直接 resolve；并发复用 `_loading`；失败时 `_loading = null` 允许重试并 `throw` |
| `findHierarchyPath(hierarchy)` | `hierarchy` | `[{title,name,hierarchy}...]` | 在 `categoryStore.roots`（一级→`subGroups`→`childer`）中查找路径链；空/0 或未命中返回 `[]` |

**`buildCategoryTree` 节点结构**

```js
{ id, title, name, hierarchy: Number(id), childer: [], _sort, _parent, desc?, path?,
  // 一级额外：subGroups（= childer）
  // 二级额外：icon（按位置取自 GROUP_ICONS），Headphone 若无 desc 则补 "(On-ear/Overear)" }
```

**依赖**：`vue`、`@/api`（`getCategory`）、`@/assets/img/navData*.png`。

#### T2.5.3 其余工具

| 文件 | 导出 | 说明 |
| --- | --- | --- |
| [resource.js](file:///d:/ZZH/aska/github/shunkai-dg/src/utils/resource.js) | `RESOURCE_BASE_URL` | 值为 `window.location.search`；产品图/二维码等相对静态路径的前缀（改资源域名只需改这一处） |
| [auth.js](file:///d:/ZZH/aska/github/shunkai-dg/src/utils/auth.js) | `getToken()` / `setToken(token)` / `removeToken()` | 基于 `js-cookie`，键名 `"Authorization"` |
| [scrollLock.js](file:///d:/ZZH/aska/github/shunkai-dg/src/utils/scrollLock.js) | default（mixin） | 浮层滚动锁，见下 |

**`scrollLock` mixin**

| 成员 | 类型 | 说明 |
| --- | --- | --- |
| `data.scrollLockY` | `Number` | 锁定前滚动位置，`-1` 表示未锁定 |
| `beforeDestroy()` | 钩子 | 自动 `unlockScroll()`（组件销毁时兜底解锁） |
| `lockScroll()` | 方法 | 已锁则返回；记录 `scrollLockY`，写 CSS 变量 `--scroll-lock-y`、加 `is-scroll-locked` 类、`window.scrollTo(0,0)`，监听 `popstate`/`hashchange` |
| `unlockScroll()` | 方法 | 已解锁则返回；移除类与变量、解绑监听、`window.scrollTo(0, y)` 还原 |
| `syncScrollLockY()` | 方法 | 锁定期间前进/后退时同步记录真实滚动位置 |

**用法**：

```js
import scrollLock from "@/utils/scrollLock";
export default {
  mixins: [scrollLock],
  watch: { isOpen(v) { v ? this.lockScroll() : this.unlockScroll(); } },
};
```

---

## T3 通用组件函数说明

组件目录 `src/components/`，9 个组件。约定：组件内文案优先 `$t`（vue-i18n）/ `$tt`（术语词典）/ `$label`（导航项）。

### T3.1 HeaderContent（`components/HeaderContent/index.vue`）

文件：[HeaderContent/index.vue](file:///d:/ZZH/aska/github/shunkai-dg/src/components/HeaderContent/index.vue)

**功能**：站点头部。桌面导航、产品中心悬浮分组面板、移动端抽屉菜单（含产品分类树）、搜索框折叠展开、外观/语言切换入口。

**依赖**：`NavMenu`、`ProductTreeMenu`、`PreferenceSwitch` 子组件；`scrollLock` mixin；`navData` 的 `navMenus` / `categoryStore`；静态图 `logo.png` / `logo1.png` / `list-ul.png`。

**props**：无。

**data**：`logo/logo1/listUrl/navMenus/keyword/activeMenu(=this.$route.path)/scrollEventTop/isSubNav/subNavTimer/activeTopId/isShading/productOpen/subOpen/searchOpen`。

**computed**

| 名称 | 返回 | 说明 |
| --- | --- | --- |
| `topLevelGroups` | `categoryStore.roots` | 悬浮面板顶部一级分类 |
| `currentSubGroups` | `Array` | `activeTopId` 对应一级的 `subGroups`，未选中回退第一个 |
| `productTree` | `Array` | 抽屉树：一级 → `subGroups` → `childer` |

**watch**：`$route`（更新 `activeMenu`）；`topLevelGroups`（首次载入默认选中第一个）；`isShading`（开→`lockScroll()`，关→`unlockScroll()`）。

**生命周期**：`mounted` 绑定 `scroll`/`resize`/`document.click`；`beforeDestroy` 解绑并 `unlockScroll()`。

**methods**

| 方法 | 参数 | 行为 |
| --- | --- | --- |
| `resizeEvent()` | — | 宽度 > 768 时自动收起抽屉 |
| `onDocumentClick(e)` | 事件 | 点击搜索区域外收起搜索框 |
| `toggleSearch()` | — | 展开/收起搜索并聚焦输入 |
| `toggleProduct()` | — | 抽屉产品树展开/收起 |
| `toggleSub(i)` | 索引 | `$set` 抽屉子项展开态 |
| `jumpMune(item)` | 分类项 | 跳 `product_center`（`query: {name, hierarchy}`），先关抽屉 |
| `jumpNav(n)` | 导航项 | `isSubNav`→product_center；有 `name`→按 name；有 `path`→按 path；先关抽屉 |
| `scrollEvent()` | — | `scrollEventTop = top > 1` |
| `jumpHome()` | — | 回首页 |
| `handleSelect(path)` | 路径 | `NavMenu` select 事件 |
| `jumpPage(n)` | 导航项 | 悬浮面板/导航跳转（product_center 带 name/hierarchy） |
| `selectTop(g)` | 一级分类 | 切换 `activeTopId` |
| `flattenLeaves(sg)` | 二级分组 | 扁平化其下全部子项（四级标 `deep`）供列表渲染 |
| `jumpLeaf(leaf)` | 叶子项 | 有 `path` 走 path，否则 product_center（带 hierarchy） |
| `mousemoveNav(n)` | 导航项 | `isSubNav` → 显示面板；否则延时隐藏 |
| `mousemoveSubNav()` / `mouseoutSubNav()` | — | 面板进出，取消/挂起延时 |
| `clearSubNavTimer()` | — | 清除挂起的隐藏定时器（防陈旧回调误关面板） |
| `hideSubNavDelayed()` | — | 200ms 后隐藏面板 |
| `search()` | — | 收起搜索并跳 `product_list`（`query:{k: keyword}`） |

### T3.2 NavMenu（`components/NavMenu/index.vue`）

文件：[NavMenu/index.vue](file:///d:/ZZH/aska/github/shunkai-dg/src/components/NavMenu/index.vue)

**功能**：基于 `el-menu` 的桌面导航。有 `childer` 渲染 `el-submenu`；`isSubNav` 项 hover 触发 `subnav` 事件；`isNav:true` 项不渲染。

**props**

| prop | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `menus` | `Array` | `[]` | 导航项 |
| `activeMenu` | `String` | `"/"` | `el-menu` `default-active` |

**events**：`select(path)`（`el-menu` 选中）、`jump(n)`（子菜单标题点击）、`subnav(n)` / `subnav-out`（产品项 hover）。

### T3.3 FooterContent（`components/FooterContent/index.vue`）

文件：[FooterContent/index.vue](file:///d:/ZZH/aska/github/shunkai-dg/src/components/FooterContent/index.vue)

**功能**：页脚。品牌 logo、4 个圆形入口（微信二维码 / Facebook 外链 / 视频号二维码 / 电话）、导航分组（>750px）、快速导航条（≤750px）、版权与口号。

**依赖**：`navData`（`fast_navigation` / `categoryStore` / `secondLevelGroups`）、`api.getSetting`、`utils/resource`、`logo1.png`、`svg-icon`（wechat/facebook/channels/phone-icon）、`EMPTY_IMG`（1px 透明 gif 占位）。

**computed**

| 名称 | 返回 | 说明 |
| --- | --- | --- |
| `qrUrl` | 微信二维码地址 | `info.qrcode` 存在则 `RESOURCE_BASE_URL + qrcode`，否则 `EMPTY_IMG` |
| `channelsQrUrl` | 视频号二维码 | `channels_qrcode || qrcode`，否则 `EMPTY_IMG` |
| `groups` | 页脚分组 | 第 1 组「快速导航」，第 2 组「产品中心」= 各一级的二级分组扁平合并 |
| `quickNav` | `fast_navigation.childer` | 移动端快速导航条 |

**生命周期**：`created` → `getSetting().then(res => this.info = res.data || {})`。

**methods**

| 方法 | 参数 | 行为 |
| --- | --- | --- |
| `jumpHome()` | — | 回首页 |
| `openFacebook()` | — | `info.facebook` 有值才 `window.open(url, "_blank", "noopener")` |
| `jump(c)` | 导航/分类项 | 有 `path` 走 path，否则 product_center（带 name/hierarchy） |

**异常处理**：接口未就绪 / 未配置二维码用透明图占位，避免请求 `.../undefined`；Facebook 未配置时不响应。

### T3.4 ProductTreeMenu（`components/ProductTreeMenu/index.vue`）

文件：[ProductTreeMenu/index.vue](file:///d:/ZZH/aska/github/shunkai-dg/src/components/ProductTreeMenu/index.vue)

**功能**：递归产品分类树（手风琴）。任意层级；有子级整行点击展开/收起，叶子项点击触发 `select`。

**props**

| prop | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `nodes` | `Array` | `[]` | 当前层节点 |
| `level` | `Number` | `0` | 层级（决定缩进 `level*14+12`px） |
| `activeHierarchy` | `Number\|String` | `null` | 高亮匹配的 hierarchy |

**data**：`open: {}`（各索引展开态）。

**methods**：`hasChildren(n)`（有 `childer` 且非空）、`isActive(n)`（`Number` 比较 hierarchy）、`toggle(i)`（`$set open`）、`goProduct(n)`（`$emit("select", n)`）。

**events**：`select(node)`；子级递归透传。

### T3.5 Breadcrumb（`components/Breadcrumb/index.vue`）

文件：[Breadcrumb/index.vue](file:///d:/ZZH/aska/github/shunkai-dg/src/components/Breadcrumb/index.vue)

**功能**：通用面包屑。基于 `$route.matched` 生成层级，产品中心追加分类链，广播给 store。

**data**：`levelList: []`。

**watch**：`$route`（非 `/redirect/` 前缀时重建）；`"categoryStore.loaded"`（分类树就绪后重建）。

**methods**

| 方法 | 参数 | 返回 | 说明 |
| --- | --- | --- | --- |
| `breadcrumbLabel(item)` | 层级项 | `String` | `meta.titleKey`→`$t`；`meta.i18n && meta.title`→`$t`；否则 `$tt(meta.title)` |
| `getBreadcrumb()` | — | — | ① 过滤含 `meta.title` 的 matched；② 父级路径补位；③ 非 Home 补 Home；④ 过滤 `breadcrumb === false`；⑤ `product_center` 时按 `query.hierarchy` 用 `findHierarchyPath` 追加分类链；⑥ `dispatch("getRouters", levelList)` |
| `isDashboard(route)` | 路由 | `boolean` | `name` 小写等于 `home` |
| `handleLink(item)` | 层级项 | — | `redirect` 优先，否则 `push(path 或 {path,query})` |

**依赖**：`navData` 的 `findHierarchyPath` / `categoryStore`。

### T3.6 ImagePreview（`components/ImagePreview/index.vue`）

文件：[ImagePreview/index.vue](file:///d:/ZZH/aska/github/shunkai-dg/src/components/ImagePreview/index.vue)

**功能**：基于 ElementUI `image-viewer` 源码的图片预览浮层。用于关于页荣誉/资质、研发页设备/专利图。

**props**

| prop | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `imgList` | `Array` | `[]` | 数据源（对象数组） |
| `index` | `Number` | `0` | 初始索引 |
| `isVisible` | `Boolean` | `false` | 显隐 |
| `k` | `String` | `""` | 从每项取图片路径的字段名（如 `"img_path"`） |

**data**：`{url, data}`。**watch**：`index` → 切 `url`。**created**：把 `imgList` 各项的 `[k]` 抽成 `data`，`url = data[index]`。**methods**：`close()` → `$emit("close")`。

### T3.7 PreferenceSwitch（`components/PreferenceSwitch/index.vue`）

文件：[PreferenceSwitch/index.vue](file:///d:/ZZH/aska/github/shunkai-dg/src/components/PreferenceSwitch/index.vue)

**功能**：外观（昼夜）与语言切换控件，`bar`（导航栏）/`drawer`（移动端抽屉）两种变体。

**props**：`variant: String = "bar"`（`bar | drawer`）。

**computed**

| 名称 | 返回 | 说明 |
| --- | --- | --- |
| `localeSetting` | `String` | `normalizeLocaleSetting($store.state.localeSetting)` |
| `themeSetting` | `String` | `$store.state.themeMode \|\| "auto"` |
| `activeLocale` | `String` | 设置 auto 时用 `detectSystemLocale()` |
| `localeLabel` | `String` | 中文/English；auto 追加 ` · 跟随系统` |
| `resolvedTheme` | `"day"\|"night"` | `$store.getters.resolvedTheme` |
| `themeIcon` | `String` | night→`el-icon-moon`，否则 `el-icon-sunny` |
| `themeModeLabel` | `String` | 当前模式文案 |

**data**：`localeOptions = LOCALE_OPTIONS`、`themeOptions = THEME_OPTIONS`、`LOCALE_AUTO`。

**methods**：`localeOptionLabel(opt)`（auto 用 `$t("common.lang.auto")`，否则 `opt.label`）、`handleLocale(setting)`（与当前相同则忽略，否则 `dispatch("setLocaleSetting", setting)`）、`handleTheme(mode)`（同上，`setThemeMode`）。

**依赖**：`@/i18n` 的常量与函数、Vuex。

### T3.8 SvgIcon（`components/SvgIcon/index.vue`）

文件：[SvgIcon/index.vue](file:///d:/ZZH/aska/github/shunkai-dg/src/components/SvgIcon/index.vue)

**props**：`iconClass: String（必填）`、`className: String = ""`。
**computed**：`iconName` = `#icon-${iconClass}`（对应 sprite `symbolId: icon-[name]`）、`svgClass` = `["svg-icon", iconClass, className]`。
**样式**：由 `global.css` 提供。图标源见 `src/assets/icons/svg/`（含 wechat/facebook/channels/phone-icon/swiper1-4/1-4 等）。

### T3.9 TextTooltip（`components/TextTooltip/index.vue`）

文件：[TextTooltip/index.vue](file:///d:/ZZH/aska/github/shunkai-dg/src/components/TextTooltip/index.vue)

**props**：`text: String = ""`。**data**：`visible: false`。**行为**：`mouseenter`/`mouseleave` 控制 `visible`，悬浮展示 `text`。当前为占位实现（待反推原产物后替换）。

---

## T4 视图页面函数说明

页面目录 `src/views/`。以下按路由/文件列出生命周期、data、computed 与 methods 的签名与行为。

### T4.1 Home（`views/home/Home.vue`）

文件：[Home.vue](file:///d:/ZZH/aska/github/shunkai-dg/src/views/home/Home.vue) · 样式 `views/home/home.css`

**data**：`RESOURCE_BASE_URL`、`reRender`、`swiperLeft/Right`、`dataList`、`productsData:{desc,list}`、`introImgs`（2 条硬编码：`{id,cat_*,url,minUrl,key}`）、`swiperOpenBanner`（loop + autoplay 5000ms + fraction 分页 + 左右按钮）。

**computed**：`swiper`（`$refs.mySwiper.swiper`）、`productsIntroduce`（`introImgs` 映射 `$t("home.intro."+key+".content/desc")`）。

**生命周期**：`created` → `getImg({n:"dataList",type:1})` + `getProductTopList()`；`activated` → 强制重建 swiper（当前无 keep-alive，不触发）。

**methods**

| 方法 | 参数 | 行为 |
| --- | --- | --- |
| `getProductTopList()` | — | `getProductList({is_top:1})` → `productsData.list` |
| `getImg({n, type})` | — | `getImg({type:"1"})` → `this[n]`（此处固定 type 为首页 banner） |
| `jumpProductDetail(item)` | 产品或 intro 项 | 跳 `product_center_detail`，`query:{id, hierarchy: cat_four\|\|cat_three\|\|cat_two\|\|cat_one}` |

### T4.2 Aboutshunkai（`views/about/Aboutshunkai.vue`）

文件：[Aboutshunkai.vue](file:///d:/ZZH/aska/github/shunkai-dg/src/views/about/Aboutshunkai.vue)

**组件**：`Breadcrumb`、`ImagePreview`。
**data**：`imgList/pictureVisible/k/activeIndex`、`company_honor`、`certifications`、`advImg1-3`、`introImgs`（3 条静态图）。
**computed**：`list`（`introImgs` 映射 `$t("about.intro.item{N}.introduction/title/desc")`）。
**生命周期**：`created` → `getImgData({n:"company_honor",type:13})` + `getImgData({n:"certifications",type:14})`。

| 方法 | 参数 | 行为 |
| --- | --- | --- |
| `getImgData({n,type})` | — | `getImg({type})` → `this[n]` |
| `openPreviewPicture(list, index=0, k)` | 列表, 索引, 字段 | 开预览，锁 `body.overflow=hidden`，挂 `touchmove` prevent |
| `close()` | — | 关预览，恢复 `overflow=auto`，移除 prevent 监听 |

### T4.3 ContactUs（`views/contact/ContactUs.vue`）

文件：[ContactUs.vue](file:///d:/ZZH/aska/github/shunkai-dg/src/views/contact/ContactUs.vue)

**data**：`center/mapZoom/markerPoint`（默认坐标 `lng:114.111399, lat:22.827118`）、`show`、`submitting`、`ruleForm:{name,email,mobile,content}`。
**computed**：`rules`（校验规则，随语言重建；含 `validateMobile` 正则 `/^[\d+\-\s()]{6,20}$/`、`validateEmail` 非必填正则 `/^[\w.+-]+@[\w-]+(\.[\w-]+)+$/`；`name` 2–50；`content` 5–500）、`tabs`（3 条联系方式卡）、`tabs1`（次要卡）。

| 方法 | 参数 | 返回 | 行为 |
| --- | --- | --- | --- |
| `showAlert(message, type="info", title?)` | 文案, 类型, 标题 | `Promise` | `$alert` 居中反馈，禁止点遮罩/ESC/关关闭按钮关闭 |
| `submitForm()` | — | — | 防重入 → `validate` → 不通过告警；通过则 `setInfoContact(ruleForm)`；`code===40000` 重置表单 + 成功弹窗；否则失败/网络弹窗；`finally` 复位 `submitting` |
| `locationSuccess(...)` | — | — | 空实现（定位成功占位） |
| `handler({BMap,map})` | — | — | 设置中心坐标/缩放（当前未被模板调用） |
| `infoWindowClose()` / `infoWindowOpen()` | — | — | 控制信息窗 `show` |

**依赖**：`Breadcrumb`、`api.setInfoContact`、`vue-baidu-map`（`baidu-map/bm-geolocation/bm-marker/bm-info-window/bm-navigation`）、`el-form` 校验。

### T4.4 Production（`views/production/Production.vue`）

文件：[Production.vue](file:///d:/ZZH/aska/github/shunkai-dg/src/views/production/Production.vue)

**data**：`HighlightIcon`、`defaultIcon`、`hover`、`activeIndex`、`productionData:[{img:[]},{img:[]}]`。
**computed**：`tabsList`（工厂页签文案，仅东莞）、`productionLists`（各工厂明细文案数组，模板按 index 取）、`swiperOptions`（每个 tab 独立分页选择器 `.swiper-pagination-{i}`，`observer/observeParents/autoHeight`）。
**生命周期**：`created` → `getImgData({type:15,index:0})` + `getImgData({type:16,index:1})`。

| 方法 | 参数 | 行为 |
| --- | --- | --- |
| `getImgData({n,type,index})` | — | `getImg` → `productionData[index][n]`，`$nextTick` 更新 swiper |
| `normalizeUrl(item)` | 图片项 | 字符串直接返回，否则按 `img_path\|img\|image\|url\|path\|src` 取值 |
| `mouseoverBtn(index)` | 索引 | 非当前项时 `hover = true` |
| `tabs(index)` | 索引 | 切 tab，复位 hover，`$nextTick` 更新 swiper |
| `updateSwiper(index)` | 索引 | 取 `$refs['swiper'+index]`（数组取首项）`comp.swiper.update()` |

### T4.5 RDCenter（`views/r-d/RDCenter.vue`）

文件：[RDCenter.vue](file:///d:/ZZH/aska/github/shunkai-dg/src/views/r-d/RDCenter.vue)

**data**：`RESOURCE_BASE_URL`、四张背景图、`swiperOpen`（桌面单层）、`swiperOpenBanner`（移动 collapse 内）、`activeNames`、`currentIndex`、`transform:{transformPage}`、`imgList/pictureVisible/index/k`、`activeIndex`、`stepList`、`propertyData`、`equipment`、`qualification`。
**常量**：`PROPERTY_TABS = [{key:"globalPatent",type:21},{key:"inventionPatent",type:22},{key:"utilityModelPatent",type:23}]`。
**生命周期**：`created` → `getImgData(equipment,type=3)`、`getImgData(qualification,type=9)`、`getStepData()`、`getPropertyData()`。

| 方法 | 参数 | 行为 |
| --- | --- | --- |
| `handleChange(val)` | collapse 值 | 同步 `activeNames` |
| `getStepData()` | — | `getStepList()` → `stepList` |
| `getImgData({n,type})` | — | `getImg` → `this[n]`（返回 data） |
| `getPropertyData()` | — | `Promise.all` 并发取三类专利图 → `propertyData` |
| `tabs(index)` | 索引 | 切知识产权页签 |
| `clickIcon(type)` | `"next"\|"prev"\|"nextMin"\|"prevMin"` | 计算 `currentIndex` 与 `transform.transformPage`（位移 = `~px(ref)`，`px` 按元素实际宽度 × 索引）；越界钳制 |
| `openPreviewPicture(list,index=0,k)` / `close()` | — | 同上（锁滚动 / 恢复） |

### T4.6 News（`views/news/News.vue`）

文件：[News.vue](file:///d:/ZZH/aska/github/shunkai-dg/src/views/news/News.vue)

**data**：`page:1`、`limit:3`、`total:0`、`dataList:[]`。
**生命周期**：`created` → `getInfoList()`。
**methods**：`getInfoList()`（`getInfoList({page,limit})` → `dataList`/`total`）、`handleCurrentChange(page)`（翻页）、`jump(item)`（跳 `news_detail`，`query:{id}`）。
**依赖**：`Breadcrumb`、`api.getInfoList`、`el-pagination`。

### T4.7 News Detail（`views/news/Detail.vue`）

文件：[Detail.vue](file:///d:/ZZH/aska/github/shunkai-dg/src/views/news/Detail.vue)

**inject**：`reload`（来自 App.vue）。
**data**：`previous/next/dateView/getInfoDetail/dataList/index`。
**生命周期**：`created` → `getInfoView()` + `getInfoList()`。
**methods**

| 方法 | 参数 | 行为 |
| --- | --- | --- |
| `getInfoView()` | — | `getInfoView({id: $route.query.id})` → `getInfoDetail` |
| `getInfoList()` | — | `getInfoList({page:1,limit:15})`；按当前 `id` 在列表定位，设定 `previous/next/dateView` |
| `jump(type)` | `"next"\|"previous"` | 取对应 id 推路由并 `location.reload()` |
| `jumpGo()` | — | 返回新闻列表 |

**注**：`jump` 用 `location.reload()` 强制刷新（见 [A2](#a2-已知偏差与占位实现)）。

### T4.8 ProductCenter（`views/product/ProductCenter.vue`）

文件：[ProductCenter.vue](file:///d:/ZZH/aska/github/shunkai-dg/src/views/product/ProductCenter.vue)

**组件**：`Breadcrumb`、`ProductTreeMenu`。
**data**：`RESOURCE_BASE_URL`、`list/page:1/limit:6/total:0`。
**computed**：`routersList`（mapGetters）、`productTree`（`categoryStore.roots` → 一级 + `subGroups`）。
**watch**：`$route`（回到本页时 `page=1` 并重新拉列表）。
**生命周期**：`created` → `getFeachList()`；`beforeDestroy` → `dispatch("getBreadcrumb", routersList)`。

| 方法 | 参数 | 行为 |
| --- | --- | --- |
| `getFeachList(extra)` | 附加参数 | `getProductList({page,limit,cat_id: query.hierarchy\|\|0, ...extra})` → `list/total` |
| `handleCurrentChange(page)` | 页码 | 翻页 |
| `jumpMune(item)` | 分类项 | 跳 `product_center`（本页切换分类，带 hierarchy） |
| `jump(item)` | 产品 | 跳 `product_center_detail`（带 id + hierarchy + page + limit） |

### T4.9 ProductList（`views/product/ProductList.vue`）

文件：[ProductList.vue](file:///d:/ZZH/aska/github/shunkai-dg/src/views/product/ProductList.vue)

**data**：`RESOURCE_BASE_URL`、`list`。
**watch**：`$route`（`immediate`，有 `query.k` 时按关键词取数）。
**生命周期**：`created` → `getFeachList($route.query.k)`。
**methods**：`getFeachList(keyword)`（`getProductList({keyword})` → `list`）、`jumpProductDetail(item)`（跳详情，带 hierarchy）。

### T4.10 ProductDetail（`views/product/ProductDetail.vue`）

文件：[ProductDetail.vue](file:///d:/ZZH/aska/github/shunkai-dg/src/views/product/ProductDetail.vue)

**功能**：产品详情，含图片放大镜（`#float` / `#big`）与缩略图分页。
**data**：`RESOURCE_BASE_URL`、`levelList`、`pic`、`currentIndex`、`styles`、`styleSpec`（缩略图列表位移）、`imgHover`、`count`、`imgHoverIndex`、`path`、`detailData`。
**computed**：`routersList`、`breadcrumbListDetail`（mapGetters）。
**watch**：`screenWidth`（`immediate` → `getClientWidth`）、`"categoryStore.loaded"`（重建面包屑）。
**生命周期**：`created` → `getBreadcrumb()` + `getFeachList()`；`mounted` → `getClientWidth()` + `window.onresize`。

| 方法 | 参数 | 行为 |
| --- | --- | --- |
| `getClientWidth()` | — | 按宽度分档（≤768 / 769–1512 / >1513）设置缩略图尺寸、`base/count/imgHover` |
| `prev()` / `next()` | — | 缩略图列表位移（`styleSpec.left`） |
| `over()` / `out()` | — | 显示/隐藏放大镜（`#float`、`#big`） |
| `move(e)` | 鼠标事件 | 计算放大镜与放大图偏移（含边界钳制） |
| `getClientHeight()` | — | 当前滚动高度 |
| `getBreadcrumb()` | — | 组装 `levelList`（matched + Home + `findHierarchyPath` 分类链 + `breadcrumbListDetail`） |
| `isDashboard(route)` | 路由 | name 小写等于 `home` |
| `breadcrumbTitle(item)` | 层级项 | `meta.i18n`→`$t`；`meta.titleKey`→`$t`；否则 `$tt` |
| `handleLink(item)` | 层级项 | 跳转（`_` 截断、product-center 特判） |
| `pathCompile(path)` | 路径 | `pathToRegexp.compile`（依赖 `path-to-regexp`） |
| `getFeachList()` | — | `getProductDetail({id})` → `detailData` |
| `jump()` | — | 跳 `contact_us` |
| `changeImg(index)` | 索引 | 切换主图 |
| `clickIcon(type)` | `"next"\|"prev"` | 主图索引切换（越界钳制） |

### T4.11 JoinUs（`views/join/JoinUs.vue`）— 路由未启用

文件：[JoinUs.vue](file:///d:/ZZH/aska/github/shunkai-dg/src/views/join/JoinUs.vue)

**data**：`tableData`。**computed**：`tableHeaders`（部门/职位/招聘人数/职位详情）。**created** → `getList()`。
**methods**：`getList()`（`seoList({page:1,limit:15})` → `tableData`）、`jump(item)`（跳 `join_us_details`，`query:{id}` + `params` 透传）。

### T4.12 JoinUsDetail（`views/join/JoinUsDetail.vue`）— 路由未启用

文件：[JoinUsDetail.vue](file:///d:/ZZH/aska/github/shunkai-dg/src/views/join/JoinUsDetail.vue)

**data**：`detailData`。**created** → 若 `$route.params` 非空则直接取用，再 `getList()`。
**methods**：`getList()`（`seoList({page:1,limit:15})`，`detailData = res.data.list[Number($route.query.id)]`，按索引取数）、`jump()`（返回 `join_us`）。

### T4.13 Placeholder（`views/placeholder/Placeholder.vue`）

文件：[Placeholder.vue](file:///d:/ZZH/aska/github/shunkai-dg/src/views/placeholder/Placeholder.vue)
极简占位页：显示 `$route.name` 与 `$t("placeholder.message")`。当前路由表未挂载。

---

## T5 本地数据模型

数据文件位于 `src/api/data/`，均由 `api/index.js` 读取并（除 `category`/`imgs`/`setting` 外）经 `localizedData.js` 做中英文切换。

### T5.1 `products.json`

```jsonc
// { "products": [ Product ] }
{
  "id": 1,                    // number 主键
  "is_top": 1,                // 1=明星产品(推荐)，0=普通
  "title": "…",               // string 产品名（英文基准）
  "title_zh": "…",            // string 中文，可缺省 → 回退英文
  "sub_title": "…",           // string 副标题
  "sub_title_zh": "…",
  "cat_one": 1, "cat_two": 3, "cat_three": 9, "cat_four": 0,  // 分类链 id（0=无）
  "imgs": ["img_data/products/p1.jpg", …],   // string[] 相对路径
  "descr": "<p>…</p>",        // string 富文本描述
  "descr_zh": "…",
  "params": "<table>…</table>",  // string 富文本参数表
  "params_zh": "…"
}
```

**消费**：首页明星产品（`is_top:1`）、产品中心/列表（关键词、`cat_id`）、产品详情。

### T5.2 `news.json`

```jsonc
// { "news": [ News ] }
{
  "id": 1, "top": 1,          // top>0 置顶
  "title": "…", "title_zh": "…",
  "descr": "…", "descr_zh": "…",          // 列表摘要
  "cover": "img_data/news/n1.svg",         // 列表封面
  "push_at_str": "2026-09-15",             // 发布日期字符串（与语言无关，不翻译）
  "content": "<h2>…</h2>", "content_zh": "…"  // 详情富文本
}
```

**消费**：新闻列表（排序 + 分页）、新闻详情（`v-html`）、上一篇/下一篇。

### T5.3 `imgs.json` / `setting.json` / `category.json`

**`imgs.json`**：`{ [type]: [{ img_path }] }`。`type` 取值：

| type | 归属 | 消费页面 |
| --- | --- | --- |
| `"1"` / `1` | banner 轮播 | 首页 |
| `3` | 研发设备 equipment | 研发中心 |
| `9` | 公司资质 qualification | 研发中心 |
| `13` | 公司荣誉 honor | 关于 shunkai |
| `14` | 资质认证 certification | 关于 shunkai |
| `15` | 东莞工厂 factory | 生产制造 |
| `16` | 泰国工厂 factory | 生产制造（当前仅 1 个 tab） |
| `21/22/23` | 全球/发明/实用新型专利 | 研发中心知识产权 |

**`setting.json`**：`{ qrcode, channels_qrcode, facebook, wechat_id, telephone }`，消费于页脚。

**`category.json`**：`{ "category": [{ id, title, parent_id, sort, desc?, path? }] }`，平铺分类；由 `buildCategoryTree` 构树。示例根：`Consumer Audio(1)`、`Industrial Audio(2)`。

### T5.4 `jobs.json` / `steps.json`

- `jobs.json`：`{ jobs: [{ id, department, department_zh, position, position_zh, quantity, descr, descr_zh }] }`。
- `steps.json`：`{ steps: [{ title, title_zh, year, imgs: [] }] }`。

---

## T6 异常处理与工程约定

### T6.1 异常处理清单

| 场景 | 处理方式 | 位置 |
| --- | --- | --- |
| 重复路由导航 | 覆写 `push` 统一 `.catch(err => err)` | `router/index.js` |
| localStorage 读写失败（隐私模式） | try/catch 静默 | `theme.js` / `i18n` |
| `document` / `window` 不可用（SSR 式守卫） | 提前 return 安全值 | `theme.js` |
| 翻译缺失 | `fallbackLocale: en-US` + silent warn；`_zh` 缺失按字段回退英文 | `i18n` / `localizedData.js` |
| 分类接口失败 | `loadCategories().catch(() => {})`（main.js）；`_loading=null` 允许重试 | `main.js` / `navData.js` |
| 图片未配置（二维码 / Facebook） | 透明 gif 占位 / 不响应点击 | `FooterContent` |
| 富文本容器空数据 | 详情接口未命中回退首条 `|| {}` | `api/index.js` |
| 联系表单提交失败 | `.catch` 网络异常弹窗 + 失败弹窗 + `finally` 复位 | `ContactUs.vue` |
| 表单重复提交 | `if (this.submitting) return` | `ContactUs.vue` |
| Pageclip 脚本被拦截 | fetch 兜底（无预检） | `api/index.js` |
| swiper 空实例 | `v-if="block.img.length"` 仅在有图时渲染 + `updateSwiper` 容错 | `Production.vue` / `RDCenter.vue` |
| 抽屉打开时组件销毁 | `beforeDestroy → unlockScroll()` | `scrollLock.js` |
| 悬浮面板陈旧定时器误关 | `clearSubNavTimer()` 前置清理 | `HeaderContent` |
| axios 超时 / 错误 | `timeout: 30000` + `Promise.reject(error)` | `request.js` |

### T6.2 工程约定

1. **响应壳统一**：本地 API 一律 `{ data }`，调用方取 `res.data`。
2. **分包策略**：所有页面路由懒加载；分类树/组件按需加载。
3. **样式令牌化**：页面色值一律走 `theme.css` 的 CSS 变量（`var(--*)`），不硬编码颜色（`rich-content.css` 允许富文本内联样式）。
4. **样式引入顺序**：`global.css` → `rich-content.css` → `theme.css`（**theme.css 必须最后**以覆盖既有色值）。
5. **文案来源三级**：`$t`（i18n message）> `$label`（导航项）> `$tt`（术语词典，回退英文）。
6. **`meta.titleKey`**：所有路由标题存 i18n key，由面包屑渲染期解析，保证语言切换响应。
7. **响应式数据约定**：涉及语言的 JSON 数据必须以 `Vue.observable` 视图对象呈现（由 `localizedData.js` 统一保障）。

---

## T7 构建、部署与质量

### T7.1 构建

```bash
npm install
npm run serve     # 开发（8080，占用则顺延；图片前缀随端口变化需同步改 RESOURCE_BASE_URL）
npm run build     # 生产构建 → dist/
```

**产物要点**：`css.extract: true` 抽离样式；`productionSourceMap: false`；`src/assets/img_data` 复制到 `dist/img_data`；svg sprite 生成 `icon-[name]`。

### T7.2 部署

GitHub Actions（[gh-pages.yml](file:///d:/ZZH/aska/github/shunkai-dg/.github/workflows/gh-pages.yml)）在 `main` 分支 push 时自动构建并发布到 GitHub Pages。hash 路由 + `publicPath: '/'` 适配 Pages 子路径场景（页面 hash 内导航不触发服务端路径解析）。

### T7.3 已知质量依赖

- 无单元测试 / E2E 测试脚本（`package.json` 未配置 `test`）。
- 代码格式化：`npm run format`（prettier）。
- 主题对比度：README 声明两套主题均通过 WCAG AA（提供 `--accent-text` 变体）。

---

# 第二部分 · 产品文档（PRODUCT）

## P1 产品概述

**产品名称**：shunkai 官网（shunkai-dg）
**产品定位**：无线音频 / 工业音频产品制造商的企业官网（展示型 B2B 站点），承担品牌展示、产品目录、研发与制造实力背书、新闻发布与商机获取（询盘表单）职能。
**目标用户**：海外与国内采购商、渠道商、行业客户（消费类音频 / 工业类音频）、求职者、媒体与合作伙伴。
**核心价值**：

- 完整呈现产品谱系（消费类音频 + 工业类音频，多级分类）。
- 以研发中心（历程 / 设备 / 知识产权 / 资质）与生产制造（工厂）建立技术与产能信任。
- 通过 `联系我们` 表单（Pageclip）直接收集销售线索。
- 全站支持 **中文 / English / 跟随系统** 与 **浅色 / 深色 / 跟随系统** 双外观。

**站点副标题（口号）**：`common.brand.slogan` = “您无线产品的正确选择 / Your right choice for wireless products”；页脚口号 `footer.slogan` = “您的塑胶模具正确选择”。

---

## P2 站点信息架构

### P2.1 站点地图

> v2.0（塑胶模具小工厂版）已按改造方案清场：研发中心、生产制造、加入我们三个页面移除，
> 生产制造内容合并进「关于我们」；产品中心由多级分类树改为顶部一级分类标签切换。

```
shunkai 塑胶模具官网（SPA · hash 路由）
├── 首页 /                     （home）
│     ├─ Banner 轮播（工厂主视觉，imgs type=1）
│     ├─ 我们做什么（精选产品/案例，is_top=1）
│     ├─ 两段加工能力介绍（化妆品包装 / 电子产品外壳）
│     ├─ 工厂实力（车间实拍 + 面积/机台/模具寿命数据）
│     └─ 联系入口（跳转联系我们 + 电话）
├── 关于顺凯 /about-shunkai     （about_shunkai）
│     ├─ 工厂简介
│     ├─ 生产设备与产能（原「生产制造」页内容合并于此，含关键数据）
│     ├─ 生产设备（车间实拍，点击放大）
│     ├─ 资质认证（精简为统一资质墙：营业执照/守合同重信用/ISO9001/RoHS）
│     ├─ 服务优势（实在 / 经验 / 响应）
│     └─ 联系入口
├── 产品中心 /product-center    （product_center）
│     ├─ 顶部一级分类标签：化妆品外壳 / 电子产品外壳 / 其他塑胶产品
│     ├─ 产品卡片列表（分页，每页 6 条）
│     └─ 产品详情 /product-center/detail（product_center_detail：图库+描述+参数+联系按钮）
├── 搜索结果 /product-list      （product_list，由头部搜索进入）
├── 新闻中心 /news              （news）
│     └─ 新闻详情 /news/detail  （news_detail）
└── 联系我们 /contact-us        （contact_us：地图 + 询盘表单）

【旧地址兜底重定向】/r-d-center → / ，/production → /about-shunkai ，/join-us(/details) → /contact-us ，未匹配 → /
```

### P2.2 路由 ↔ 页面 ↔ 标题对照

| 页面 | 路由 name | 标题（中文 / 英文） | 面包屑锚点 |
| --- | --- | --- | --- |
| 首页 | `home` | 首页 / Home | 首页 |
| 关于 shunkai | `about_shunkai` | 关于 shunkai | 首页 › 关于 shunkai |
| 产品中心 | `product_center` | 产品中心 / Product Center | 首页 › 产品中心 › 分类链 |
| 产品详情 | `product_center_detail` | 产品详情 / Product Detail | 首页 › 产品中心 › 分类链 › 详情 |
| 产品列表 | `product_list` | 产品 / Products | —（搜索结果页） |
| 研发中心 | `r_d_center` | 研发中心 / R&D Center | 首页 › 研发中心 |
| 生产制造 | `production` | 生产制造 / Production | 首页 › 生产制造 |
| 新闻中心 | `news` | 新闻中心 / News | 首页 › 新闻中心 |
| 新闻详情 | `news_detail` | 新闻详情 / News Detail | 首页 › 新闻中心 › 详情 |
| 联系我们 | `contact_us` | 联系我们 / Contact Us | 首页 › 联系我们 |

---

## P3 全局模块内容与交互

### P3.1 头部（HeaderContent）

**展示内容**

- 左侧品牌 Logo（点击回首页）。
- 中部主导航：About shunkai、Product-Center（悬浮产品面板）、R&D Center、News、Production、Contact Us。
  - `Home` 与（保留的）`Join Us` 标记 `isNav:true`，**不在顶部菜单渲染**（与原产物一致）。
- 右侧操作区：外观与语言切换（折叠为图标）、搜索图标（点击展开输入框，回车 / 按钮搜索）、移动端菜单按钮。

**产品中心悬浮面板**（hover 触发）

- 顶部：两个一级分类（消费类音频 / 工业类音频）居中并排，点击切换。
- 中部：当前一级的二级分组三列；每列含二级图标 + 名称（Headphone 带 `(On-ear/Overear)` 描述）+ 该二级下全部子项扁平列表（四级项缩进标记）。

**移动端抽屉**（`<750px` / 767px 断点）

- Logo + 关闭按钮。
- 外观与语言切换（`variant="drawer"`）。
- 导航列表；`Product Center` 展开为多级产品分类树（`ProductTreeMenu`）；带子项导航（如 Contact Us）可展开。

**交互细节**

- 滚动超过 1px 头部进入 `scroll-top` 固定态。
- 悬浮面板 200ms 延时隐藏，鼠标进入面板可取消隐藏。
- 点击页面其它区域收起搜索框；窗口宽度 > 768px 自动收起抽屉。
- 抽屉打开时锁定背景滚动（`scrollLock`），关闭/切路由/销毁时解锁。

### P3.2 导航菜单（NavMenu）

基于 Element `el-menu` 横向模式。有子项渲染为 `el-submenu`（如 Contact Us）；`Product Center` 项 hover 触发悬浮面板；`isNav` 项不渲染。

### P3.3 页脚（FooterContent）

**展示内容**

- 品牌：居中 Logo（点击回首页）+ 4 个圆形入口：微信（弹二维码）、Facebook（外链）、视频号/彩页（弹二维码）、电话（弹号码）。
- 导航分组（>750px）：
  - 第 1 组「快速导航」：Home / About shunkai / Product-Center / R&D Center / News / Production / Contact Us。
  - 第 2 组「产品中心」：各一级分类的**二级分类**平铺（不下钻三、四级）。
- 移动端（≤750px）：一行快速导航条。
- 版权行：`© 2026 shunkai Inc .All rights reserved` + 页脚口号。

**数据来源**：`setting.json`（二维码/Facebook/电话）+ `category.json`（产品分组）。

### P3.4 面包屑（Breadcrumb）

**规则**：首页为根，逐级展开；产品相关页面按 `query.hierarchy` 追加分类链（如 首页 › 产品中心 › 消费类音频 › Headphone）；末级不可点击。产品详情页使用独立的 `breadcrumbTitle` 逻辑（支持 `meta.i18n` 根文案）。

### P3.5 搜索

- 入口：头部搜索图标 → 展开输入框。
- 行为：回车或点击按钮，跳 `product_list?k=<关键词>`，匹配产品 `title` / `sub_title`。

### P3.6 外观与语言切换（PreferenceSwitch）

- 语言下拉：中文 / English / 跟随系统（`auto`）。auto 时触发器显示“实际语言 · 跟随系统”。
- 主题下拉：浅色（太阳）/ 深色（月亮）/ 跟随系统。图标随**实际生效主题**切换（太阳 / 月亮双态）；auto 模式追加“A”角标。
- 状态持久化到 localStorage（`shunkai-theme` / `shunkai-locale`），并同步 `<html data-theme>` / `<html lang>` / ElementUI 内置文案。

---

## P4 页面内容说明书

### P4.1 首页（`/`）

| 区块 | 内容 | 数据来源 |
| --- | --- | --- |
| Banner 轮播 | 全宽轮播，自动播放 5s、循环、左右按钮 + 分数分页 | `imgs[1]` |
| 明星产品 | 标题「明星产品」+ 副文案 + 产品卡（标题/副标题/图/了解更多按钮），桌面 4 列、移动端横滑 | `getProductList({is_top:1})` |
| 产品介绍区 | 2 段硬编码产品介绍：CD 级音质（cdSound）、NC07 无线降噪耳机（nc07），各含大/小两套背景 + 文案 + 了解更多 | 静态图 + `home.intro.*` 文案 |

**联动**：点击产品卡/介绍按钮 → 产品详情（带 `id` 与分类 `hierarchy`）。

### P4.2 关于 shunkai（`/about-shunkai`）

| 区块 | 内容 | 数据来源 |
| --- | --- | --- |
| 图文介绍（3 段） | 公司简介 / 探索更多 / 核心优势；奇偶行左右图文交替 | 静态图 + `about.intro.item1-3` |
| 公司荣誉墙 | 图片网格（点击放大预览） | `imgs[13]` |
| 公司资质认证 | 图片网格（点击放大预览） | `imgs[14]` |
| 服务优势 | 深色背景 + 3 卡：价值 / 经验 / 专业 | 静态图 + `about.advantage.*` |

### P4.3 产品中心（`/product-center`）

| 区块 | 内容 | 数据来源 |
| --- | --- | --- |
| 左侧产品列表 | 产品卡（标题、副标题、图、了解更多）+ 分页（默认 6 条/页） | `getProductList({cat_id: query.hierarchy})` |
| 右侧分类树 | 多级分类树（手风琴），当前分类高亮 | `categoryStore.roots` |

**联动**：点击分类树叶子 → 切换本页分类（更新 `hierarchy`）；点击产品卡 → 详情页（带 `id/hierarchy/page/limit`）。移动端隐藏右侧树，产品卡两列。

### P4.4 产品详情（`/product-center/detail`）

| 区块 | 内容 |
| --- | --- |
| 左侧图库 | 主图 + 缩略图分页条 + 悬浮放大镜（桌面）；移动端隐藏放大镜 |
| 右侧信息 | 产品名、副标题、分割线、描述（富文本）、参数（富文本表格）、「联系我们」按钮 |

**数据来源**：`getProductDetail({id})`。

### P4.5 产品列表 / 搜索结果（`/product-list`）

- 顶部标题「搜索结果」（`product.list.searchResult`）。
- 产品卡网格（4 列 / 移动端 2 列），整卡可点击进详情。
- 数据来源：`getProductList({keyword})`。

### P4.6 研发中心（`/r-d-center`）

| 区块 | 内容 | 数据来源 |
| --- | --- | --- |
| 产品研发历程 | 时间轴（年份 + 标题 + 图），桌面横向滑动 + 左右箭头，移动端逐条 | `getStepList()` |
| 研发设备 | 图片网格，点击放大预览 | `imgs[3]` |
| 知识产权 | 页签：全球专利 / 发明专利 / 实用新型专利；每类证书 swiper（桌面滑动条 / 移动端折叠面板） | `imgs[21/22/23]` |
| 公司资质 | 图片网格，点击放大预览 | `imgs[9]` |

### P4.7 生产制造（`/production`）

- 标题「生产能力」。
- 工厂页签（当前仅「东莞工厂」；泰国工厂文案已注释）。
- 左列：工厂明细文案要点列表；右列：工厂图片 swiper（无图显示「暂无图片」）。
- 数据来源：`imgs[15]`（东莞）/ `imgs[16]`（泰国，暂用）。

### P4.8 新闻中心（`/news`）

- 新闻条目：封面图 + 「新闻」标签 + 标题 + 摘要 + 了解更多按钮。
- 分页：默认 3 条/页，`getInfoList` 排序规则（置顶优先、`sort` 升序）。
- 数据来源：`getInfoList({page,limit})`。

### P4.9 新闻详情（`/news/detail`）

- 标题 + 发布日期。
- 正文富文本（`v-html`）。
- 上一篇 / 下一篇（无则显示「暂无数据」）+ 返回列表。
- 数据来源：`getInfoView({id})` + `getInfoList({page:1,limit:15})`。

### P4.10 联系我们（`/contact-us`）

| 区块 | 内容 |
| --- | --- |
| 联系方式卡 | 公司地址（中国）：东莞塘厦莲湖西路7号；电话：+86 13712578616；邮箱：sales@shunkai-dg.cn |
| 地图 | 百度地图，默认坐标 `114.111399, 22.827118`，含定位控件、标记与信息窗（品牌名 / 电话 / 地址） |
| 询盘表单 | 姓名（必填，2–50）、手机号（必填，6–20，仅允许数字与 `+ - 空格 ( )`）、邮箱（选填，格式校验）、留言（必填，5–500，4–8 行）；提交后成功/失败居中弹窗 |

### P4.11 加入我们（保留，路由未启用）

- 职位列表（部门 / 职位 / 招聘人数 / 职位详情）与职位详情页组件与文案均已就绪，路由被注释，当前不可访问。

---

## P5 功能模块展示清单

| 模块 | 功能点 | 所在位置 |
| --- | --- | --- |
| 全局导航 | 顶部菜单 / 子菜单 / 悬浮产品面板 / 移动端抽屉 | HeaderContent、NavMenu |
| 产品分类树 | 多级手风琴、当前分类高亮、抽屉与产品中心复用 | ProductTreeMenu |
| 产品检索 | 关键词搜索（标题/副标题） | HeaderContent → ProductList |
| 产品目录 | 明星产品、分类筛选、分页、推荐（前 4 条 / is_top） | Home、ProductCenter、ProductList |
| 产品详情 | 图库（缩略图 + 放大镜）、富文本描述与参数、询盘跳转 | ProductDetail |
| 图片预览 | 荣誉 / 资质 / 设备 / 专利图放大 | ImagePreview |
| 内容展示 | 关于页图文介绍与优势、研发时间轴、生产页签、新闻列表与详情 | 各页面 |
| 询盘表单 | 校验、提交（Pageclip）、结果弹窗 | ContactUs |
| 地图 | 百度地图 + 定位 + 信息窗 | ContactUs |
| 外观切换 | 浅色 / 深色 / 跟随系统 | PreferenceSwitch + theme |
| 语言切换 | 中文 / English / 跟随系统 | PreferenceSwitch + i18n |
| 面包屑 | 逐级导航、分类链、产品详情专用逻辑 | Breadcrumb |
| 返回顶部 | 滚动 > 900px 出现，点击回顶 | App.vue |
| 页脚联系入口 | 微信/视频号二维码、Facebook、电话 | FooterContent |
| 滚动锁 | 抽屉/弹层打开时锁背景 | scrollLock mixin |

**占位/未启用**：`TextTooltip`（占位）、`JoinUs`/`JoinUsDetail`（路由注释）、`Placeholder`（未挂载）、产品详情 `handler`（空实现）。

---

## P6 交互逻辑说明

### P6.1 导航与跳转

- 顶部菜单项点击 → `router.push`（`name` 优先于 `path`）。
- `Product-Center` hover 展开发面板；离开 200ms 后收起；移入面板取消收起。
- 分类树叶子点击 → 统一 `product_center`，携带 `query: { name, hierarchy }`；`ProductCenter` 内 `$route` watch 监听并重新拉列表（SPA 无刷新，保留树展开状态）。
- Logo / 首页按钮 → 回 `/`。
- 面包屑父级可点击回退，末级不可点击。

### P6.2 搜索

点击搜索图标展开输入框 → 回车或点按钮 → `product_list?k=关键词`；点击框外收起。

### P6.3 图片预览 / 放大镜

- 网格图点击 → `ImagePreview` 全屏预览，同时 `document.body.style.overflow = "hidden"` 并挂 `touchmove` 拦截（防移动端拖动）。
- 关闭时恢复 `overflow = "auto"` 并移除监听。
- 产品详情桌面端用 `#float`（放大框）+ `#big`（放大图）实现放大镜，随鼠标移动并做边界钳制；移动端隐藏。

### P6.4 表单提交（联系我们）

1. 点击提交 → 防重复（`submitting`）。
2. `el-form` 校验；不通过 → 居中告警弹窗「信息不完整」。
3. 通过 → 提交 Pageclip；`code === 40000` → 重置表单 + 成功弹窗；否则失败弹窗；异常 → 网络异常弹窗。
4. 弹窗均为居中、需点击「确定」关闭。

### P6.5 主题切换动画

切换瞬间给 `<html>` 加 `.theme-transition`，背景与文字 300ms 同步渐变，400ms 后移除（不影响常态 hover）。首屏加载不做动画（避免闪烁）。

### P6.6 语言切换

切换即同时更新：vue-i18n message、术语词典（`termStore`）、本地 JSON 数据视图（`localizedData`）、ElementUI 内置文案、`<html lang>`；无需刷新页面。

### P6.7 移动端适配

- 断点：`768px` 为主（部分页面 750px 页脚切换、576/1199/1512px 内容适配）。
- 抽屉菜单、单列/两列网格、隐藏放大镜与右侧分类树、页脚切换为快速导航条。

---

## P7 视觉展示效果规范

### P7.1 主题令牌（`src/assets/css/theme.css` 为唯一色值来源）

**白模式（day）关键令牌**

| 令牌 | 值 | 用途 |
| --- | --- | --- |
| `--bg` | `#f4f6f8` | 页面背景 |
| `--bg-soft` | `#e8edf2` | 页脚 / 次级区块 |
| `--surface` / `--surface-2` / `--surface-3` | `#ffffff` / `#f0f3f6` / `#e6ebf0` | 卡片 / 表头输入框 / 悬停 |
| `--text` / `--text-strong` / `--text-muted` / `--text-faint` | `#0b0d10` / `#000000` / `#4a5560` / `#7a858f` | 正文层级 |
| `--accent` / `--accent-strong` / `--accent-text` | `#0a5bd6` / `#0847a8` / `#0a5bd6` | 工业蓝强调 |
| `--accent-orange` | `#ff6b1a` | 安全橙（关键数据 / 询盘） |
| `--btn-bg` / `--btn-text` | `#0a5bd6` / `#ffffff` | 填充按钮 |
| `--border` / `--border-strong` | `#d6dee6` / `#b6bec6` | 边框 |

**黑模式（night）关键令牌**

| 令牌 | 值 |
| --- | --- |
| `--bg` | `#0b0d10` |
| `--bg-soft` / `--surface` | `#12161b` |
| `--surface-2` / `--surface-3` | `#1a2027` / `#232b34` |
| `--text` / `--text-strong` | `#f2f5f7` / `#ffffff` |
| `--accent` / `--accent-strong` / `--accent-text` | `#3b82f6` / `#60a5fa` / `#60a5fa` |
| `--btn-bg` / `--btn-text` | `#3b82f6` / `#0b0d10` |
| `--border` / `--border-strong` | `#2a333d` / `#3a4550` |
| `--logo-filter` | `brightness(0) invert(1) opacity(0.92)` |

**页脚**：`--footer-bg: #07090b` / `--footer-text: #a7b0b8`（两模式一致，固定深色）。

### P7.2 品牌视觉元素

- 主色：工业蓝（day `#0a5bd6` / night `#3b82f6`）；强调点缀：安全橙。
- 标题样式 `.shunkai-title`：左对齐大号标题 + 底部 60×2 蓝色下划线（研发/资质等深色区块为白色下划线）。
- 图文介绍：奇偶行左右交替（`nth-of-type(odd)` 图形在左、偶行在右）；PC 用大图、移动端切小图。
- 卡片：`--surface-2` 底 + 圆角 / 阴影；悬停图标 `transform: scale(1.1)`（研发设备/资质）。
- 按钮：主按钮填充 `--btn-bg` + `--btn-text`；次要按钮描边 `--btn-bg`、透明底。

### P7.3 响应式规范

| 断点 | 规则 |
| --- | --- |
| `≤576px` | 产品卡图片高 80px |
| `≤768px` | 单/双列堆叠；隐藏右侧分类树、放大镜；产品中心底距 140px；分页/分栏折叠 |
| `769–1512px` | 缩略图 74×56、base 94、count 5 |
| `>1513px` | 容器 max-width 1500px；缩略图 87×76、base 109 |
| 页脚 | `>750px` 分组展示，`≤750px` 快速导航条 |

### P7.4 富文本渲染规范（`rich-content.css`）

适用于新闻详情 `.new_detail_center`、产品详情 `.desc / .params`、招聘详情 `.join-detail-wrapper-text`。支持字号、加粗、下划线、斜体、删除线、文字颜色、背景色、表格、有序/无序列表、图片、视频、代码块、引用块、链接；正文 16px / 行高 1.8。

---

## P8 用户使用流程说明

### P8.1 采购商 / 访客主流程

```
进入首页
 → 浏览 Banner 与明星产品
 → 顶部导航进入「产品中心」或 hover「Product-Center」悬浮面板选分类
 → 分类树选择目标分类 → 浏览产品卡片（可翻页）
 → 打开产品详情（查看描述 / 参数 / 图库放大镜）
 → 点击「联系我们」→ 填写询盘表单 → 提交成功
```

### P8.2 直达搜索流程

```
首页/任意页 → 点击头部搜索图标 → 输入关键词 → 回车
 → 产品列表页（搜索结果）→ 打开产品详情 → 询盘
```

### P8.3 品牌与实力了解流程

```
首页 → 关于 shunkai（图文介绍 / 荣誉 / 认证 / 服务优势）
     → 研发中心（历程 / 设备 / 知识产权 / 资质）
     → 生产制造（东莞工厂）
     → 新闻中心 → 新闻详情 → 返回列表
```

### P8.4 求职流程（保留，当前不可达）

```
（路由启用后）加入我们 → 职位列表 → 职位详情 → 返回
```

### P8.5 外观 / 语言流程

```
任意页 → 头部右侧（或移动端抽屉）切换图标
 → 选择 语言（中文 / English / 跟随系统）
 → 选择 主题（浅色 / 深色 / 跟随系统）
 → 全站文案 / 分类名 / 数据文案 与配色即时切换，无需刷新
```

---

## P9 多语言内容清单

### P9.1 命名空间（`src/i18n/lang/{zh-CN,en-US}/`）

| 命名空间文件 | 覆盖内容 |
| --- | --- |
| `common.js` | 通用按钮/分页、页面与面包屑标题（`page.*`）、主题与语言名称、品牌名与口号 |
| `header.js` | 搜索占位、外观语言设置、导航项名称（`nav.*`） |
| `footer.js` | 快速导航、产品中心、联系入口、扫码提示、版权、口号 |
| `home.js` | 明星产品、两段产品介绍文案 |
| `about.js` | 图文介绍 3 段、荣誉/认证标题、服务优势 3 卡 |
| `contact.js` | 联系信息、地图电话、表单占位与校验提示、结果弹窗 |
| `news.js` | 新闻标题、上/下一篇、返回列表 |
| `product.js` | 搜索结果标题、详情页「首页 / 联系我们」 |
| `join.js` | 职位表头、职位详情、公司简介（当前路由未启用） |
| `production.js` | 生产能力标题、工厂页签与明细、暂无图片 |
| `rd.js` | 研发历程/设备/知识产权页签/资质标题 |
| `placeholder.js` | 占位页提示 |

### P9.2 术语词典（`i18n/terms.js`）

覆盖分类标题与描述（英文 → 中文），如 `Consumer Audio→消费类音频`、`Headphone→头戴式耳机`、`TWS→真无线耳机`、`(On-ear/Overear)→（贴耳式/包耳式）` 等约 40 条；未命中回退英文。

### P9.3 数据层翻译（`localizedData.js`）

产品（title/sub_title/descr/params）、资讯（title/descr/content）、职位（department/position/descr）、流程（title）通过 `_zh` 字段切换；`push_at_str`（日期）与 `year`（年份）保持与语言无关的写法，不翻译。

---

# 第三部分 · 附录（APPENDIX）

## A1 可扩展更新节点

> 以下为文档维护锚点。项目迭代时，请同步更新对应章节并在 [A3 变更记录](#a3-变更记录) 追加条目。

| 编号 | 触发场景 | 需同步更新的文档章节 | 需同步修改的代码 |
| --- | --- | --- | --- |
| U1 | 新增/修改路由、启用 Join Us | [T2.1](#t21-路由-srcrouterindexjs)、[P2](#p2-站点信息架构) | `src/router/index.js`、`i18n/lang/*/common.js`（`page.*`） |
| U2 | 新增页面 | [T4](#t4-视图页面函数说明)、[P4](#p4-页面内容说明书)、[P9.1](#p91-命名空间srci18nlangzh-cnen-us) | `src/views/*`、`i18n/lang/{zh-CN,en-US}/<ns>.js` |
| U3 | 新增/调整组件 | [T3](#t3-通用组件函数说明)、[P5](#p5-功能模块展示清单) | `src/components/*` |
| U4 | 调整本地 API 函数 | [T2.4](#t24-数据与-api-层) | `src/api/index.js`、`localizedData.js` |
| U5 | 数据结构变更 | [T5](#t5-本地数据模型)、[P4](#p4-页面内容说明书) | `src/api/data/*.json` |
| U6 | 新增分类 / 术语 | [P9.2](#p92-术语词典i18ntermsjs)、[T2.5.2](#t252-utilsnavdatajs) | `src/api/data/category.json`、`src/i18n/terms.js` |
| U7 | 新增/调整主题令牌 | [P7](#p7-视觉展示效果规范)、[T2.5.1](#t251-utilsthemejs) | `src/assets/css/theme.css`、`utils/theme.js`、`public/index.html`、`PreferenceSwitch` |
| U8 | 切换真实后端接口 | [T2.4.3](#t243-apirequestjs--原始-axios-实现回退参考未启用)、[T6.1](#t61-异常处理清单) | `src/api/request.js`、`.env.*`、`vue.config.js`（proxy） |
| U9 | 部署方式调整 | [T7.2](#t72-部署) | `.github/workflows/*`、`vue.config.js`（publicPath） |
| U10 | 启用占位实现（TextTooltip 等） | [A2](#a2-已知偏差与占位实现) | 对应组件 |
| U11 | 新增语言 | [P9](#p9-多语言内容清单)、[T2.3.1](#t231-i18nindexjs) | `src/i18n/lang/<locale>/`、`i18n/index.js` 的 `SUPPORTED_LOCALES`、`PreferenceSwitch` |

## A2 已知偏差与占位实现

| 项 | 现象 | 位置 | 建议 |
| --- | --- | --- | --- |
| 加入我们路由 | `JoinUs` / `JoinUsDetail` 组件与文案齐备，但路由被注释，页面不可达 | `router/index.js#L17-28` | 如需上线，取消注释并补齐面包屑标题 |
| 产品中心 query 路由 | `/product-center?name=Consumer Audi`、`/product-center?name=TWS` 作为独立 path 定义（含 query 的 path 在 vue-router 中不匹配实际查询，实际仍走 `/product-center`） | `router/index.js#L83-94` | 建议改为 `meta.titleKey` 参数化或移除冗余项 |
| 新闻详情翻页 | `jump()` 使用 `location.reload()` 强制刷新，与 SPA 无刷新约定不一致 | `views/news/Detail.vue#L78-84` | 建议改用 `$route` 参数监听重载数据 |
| `TextTooltip` | 占位实现，未接入溢出省略逻辑 | `components/TextTooltip/index.vue` | 待反推原产物后替换 |
| `Placeholder` 页 | 未挂载到路由 | `views/placeholder/Placeholder.vue` | 仅在开发期使用 |
| 产品详情 `handler` | 空实现，模板未调用 | `views/product/ProductDetail.vue#L341-345` | 可清理 |
| 主题首屏色值 | `public/index.html` 前置脚本首屏背景写死 `#D6E8F5`（day），与 `theme.css` 的 `--bg: #f4f6f8` 不一致 | `public/index.html#L17` | 建议统一为 `theme.css` 令牌值 |
| README 主题描述 | README「二、主题」章节描述浅蓝 `#D6E8F5/#4A90C4` 体系，与现行 `theme.css` 黑白双模 `#F4F6F8/#0A5BD6` 不一致 | `README.md` | 以 `theme.css` 为准，README 待同步 |
| 泰国工厂 | `production.js` 泰国文案被注释，`imgs[16]` 仍被加载但无对应 tab | `i18n/lang/*/production.js`、`Production.vue` | 视业务决定是否恢复 |
| Pageclip key | 站点写入令牌以明文硬编码在源码 | `api/index.js#L65` | 令牌为公开只写令牌，如更换需同步 `public/index.html` |

## A3 变更记录

| 版本 | 日期 | 变更人 | 说明 |
| --- | --- | --- | --- |
| v1.0 | 2026-10-16 | — | 初始基线：对齐当前代码库，覆盖技术文档（T1–T7）与产品文档（P1–P9）全量内容 |
| v2.0 | 2026-10-16 | — | 塑胶模具小工厂版改造：砍研发中心/生产制造/加入我们页面与多级分类树（P0）；首页、关于页、产品详情、产品中心重做；数据层 JSON 全量替换为塑胶模具品类；中英双语文案与图片素材同步；修复 `RESOURCE_BASE_URL` 查询参数污染、图片缺少资源前缀、产物 `publicPath` 三处部署缺陷 |

### A3.1 v2.0 改造要点（按改造方案对照）

| 改造方案条目 | 落地位置 | 结果 |
| --- | --- | --- |
| P0-1 砍掉研发中心/生产制造/加入我们路由 | `router/index.js` | 三条路由移除，旧地址重定向；`views/{r-d,production,join,placeholder}` 与 `components/ProductTreeMenu` 留空壳说明文件 |
| P0-2 清理对应组件与 i18n 文案 | `i18n/lang/*/{rd,production,join,placeholder}.js` | 文案清空为占位说明，命名空间保留避免 `require.context` 断链 |
| P0-3 产品分类树改顶部标签 | `views/product/ProductCenter.vue` | 一级标签切换 + 分页；`ProductTreeMenu` 停用，`HeaderContent` 悬浮面板与抽屉分类树同步移除 |
| P0-4 首页基础改造 | `views/home/Home.vue`、`home.css`、`theme.css` | Banner 固定高度裁切、精选产品、两段能力介绍、工厂实力、联系入口 |
| P1-2 关于页合并生产制造、精简资质 | `views/about/Aboutshunkai.vue` | 简介 + 产能（含数据）+ 设备实拍 + 统一资质墙 + 服务优势 + 联系入口；荣誉墙移除 |
| P1-3 产品详情精简 | `views/product/ProductDetail.vue` | 保留放大镜与缩略图翻页（按屏宽 4/3 张），参数表沿用富文本样式，去掉桌面/移动双份 DOM |
| P1-4 数据层替换 | `src/api/data/*.json` | 分类 12 条（3 大类 + 9 二级）、产品 19 条（含中英文案与参数表）、新闻 5 条、图片组 5 组、设置含地图坐标 |
| P2-1 双语填充 | `i18n/lang/{zh-CN,en-US}/*` | 新增 home.factory / home.contact / about.equipment / about.capacity 等键，双语齐备 |
| P2-2 图片素材替换 | `src/assets/img_data/` | 新增 f1–f11 产品占位图、重绘 b1/资质/新闻封面；素材文件名全部改为 ASCII |
| P2-3 地图坐标 | `views/contact/ContactUs.vue`、`api/data/setting.json` | 塘厦科苑城坐标 114.105091 / 22.820934，zoom 17 |
| P2-4~6 响应式/双语/主题走查 | 全站 | 无头浏览器逐页渲染核对（首页/关于/产品/详情/新闻/联系 + 中英 + 昼夜） |


> 后续每次迭代请在此表追加一行，并在 [A1](#a1-可扩展更新节点) 中标注受影响的章节。

---

*文档结束 · CODE WIKI v1.0*
