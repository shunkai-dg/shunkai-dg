# shunkai-dg（aska 官网 · Vue 2 前端）

以 Vue 2.7 + vue-cli 4 反推重建的 aska 官网前端，数据由本地 JSON 模拟（无需后端即可运行）。

## 快速开始

```bash
npm install
npm run serve   # 开发服务器（默认 8080，被占用时自动顺延，例如 8081）
npm run build   # 生产构建，产物在 dist/
npm run format  # prettier 格式化
```

> 开发环境资源前缀由 `src/utils/resource.js` 的 `RESOURCE_BASE_URL`（`http://localhost:8080/`）决定；
> 若 devServer 顺延到其它端口，图片会 404，直接改这一处即可。

## 目录结构

```
public/                  HTML 模板（含主题/语言首屏前置脚本）
src/
  assets/css/            global.css（全局转写样式）、header.scss（头部/抽屉）、
                         rich-content.css（富文本正文）、theme.css（主题「昼夜」令牌与适配）
  assets/icons/svg/      svg sprite 图标（svg-icon 组件）
  components/            头部、页脚、导航、面包屑、产品树、图片预览、外观语言切换…
  i18n/                  国际化：index.js（实例与切换）、terms.js（分类术语词典）、lang/{zh-CN,en-US}/*.js
  utils/                 navData（分类树）、theme（主题「昼夜」）、resource、auth
  views/                 页面（home / about / product / news / join / contact / production / r-d）
  api/                   本地数据服务（data/*.json）+ 原始请求实现（request.js，未启用）
  router/                路由表（hash 模式）
  store/                 Vuex（含主题/语言选择）
```

---

## 一、语言切换（vue-i18n@8）

支持 **中文 / English / 跟随系统**，默认跟随系统；选择结果写入 `localStorage`（键 `aska-locale`），
并同步 `<html lang>` 与 ElementUI 内置文案（分页、表单校验提示等）。

### 关键文件

| 文件 | 作用 |
| --- | --- |
| `src/i18n/index.js` | 创建 VueI18n 实例、语言解析/持久化、ElementUI 语言同步 |
| `src/i18n/terms.js` | 分类/术语词典（数据来自 JSON 的英文分类名 → 中文），查不到原样回退 |
| `src/i18n/lang/zh-CN/*.js` | 中文文案，**文件名即命名空间** |
| `src/i18n/lang/en-US/*.js` | 英文文案（站点原始文案，逐字保留） |

语言模块由 `require.context` 自动装载：在 `lang/zh-CN/` 与 `lang/en-US/` 下同名的
文件即同一命名空间，因此新增一个模块只需在两处各建一个同名文件：

```js
// src/i18n/lang/zh-CN/news.js
export default { title: "新闻", detail: { prev: "上一篇：" } };
// src/i18n/lang/en-US/news.js
export default { title: "News", detail: { prev: "Previous:" } };
```

模板/脚本中直接使用：

```vue
{{ $t('news.title') }}
:placeholder="$t('header.searchPlaceholder')"
```

### 术语词典（分类名等非 message 文案）

产品分类来自 `src/api/data/category.json`（英文），不适合放进 message。用全局方法取词：

```vue
{{ $tt(cat.title) }}      <!-- 词典命中返回中文，未命中回退英文 -->
{{ $label(navItem) }}     <!-- 导航项：有 i18nKey 走 $t，否则走 $tt -->
```

中文词条维护在 `src/i18n/terms.js`；漏译不会报错，只会显示英文原文。

### 范围说明

界面（导航、页脚、面包屑、按钮、表单、页面标题与正文）全部可切换；
**接口/JSON 数据本身（产品名、新闻标题与正文、职位、地址）保持原文**，未做数据层翻译。

---

## 二、主题「昼夜」（白天浅蓝 / 黑夜深蓝 / 跟随系统）

> 浅蓝是白昼的呼吸，深蓝是夜晚的静默；同一片蓝，两种节奏。

| 角色 | 色值 | 用途 |
| --- | --- | --- |
| 白天主色（浅蓝） | `#D6E8F5` | 页面背景、头部、大面积留白 |
| 白天辅色（中蓝） | `#4A90C4` | 按钮、链接、图标、强调（大号/装饰） |
| 黑夜主色（深蓝） | `#0B1A2F` | 夜间页面背景、沉浸式容器 |
| 黑夜辅色（亮蓝） | `#5AA9E6` | 夜间按钮、高亮文字、交互反馈 |
| 正文（日） | `#1A2B3C` | 白天正文、标题 |
| 正文（夜） | `#E8F1F8` | 夜间正文、标题（避免纯白眩光） |

### 实现

| 文件 | 作用 |
| --- | --- |
| `src/utils/theme.js` | 模式解析（`day`/`night`/`auto`）、写入 `<html data-theme>`、系统偏好监听、300ms 过渡开关 |
| `src/assets/css/theme.css` | **全部色值的唯一来源**：设计令牌 + ElementUI 适配 + 页面皮肤，必须最后引入 |
| `src/components/PreferenceSwitch/index.vue` | 太阳/月亮 + 语言切换控件（导航栏右侧 / 移动端抽屉） |
| `src/store/index.js` | `themeMode` / `localeSetting` 状态与 mutation |
| `public/index.html` | 首屏前置脚本：在打包资源加载前定好主题与语言，避免闪烁 |

- 切换时给 `<html>` 临时挂 `.theme-transition`，背景色与文字色 300ms 同步渐变，结束后移除，
  不影响常态 hover 手感；`prefers-reduced-motion` 下自动关闭。
- 跟随系统时监听 `prefers-color-scheme`（主题）与 `languagechange`（语言），系统变化即时跟随。
- 选择结果写入 `localStorage`（`aska-theme` / `aska-locale`）；可用 URL 参数临时预览、不污染偏好：
  `?theme=night&locale=en-US`。

### 扩展一个主题

在 `theme.css` 里新增 `:root[data-theme="..."]` 令牌块，并在 `src/utils/theme.js` 的
`THEME_MODES` 与 `PreferenceSwitch` 的 `THEME_OPTIONS` 中登记即可；页面样式只引用令牌，
无需逐页改色。

### 对比度

两套主题均通过 WCAG AA 校验（脚本逐页扫描可见文字与真实背景的对比度）：

- 小字号强调文字/图标额外提供 AA 变体 `--accent-text`（白天 `#2A6A96`，夜间 `#7FC0F2`），
  `--accent` 保持规范原值用于填充、描边与装饰；
- 填充按钮使用 `--btn-bg`/`--btn-text`（白天中蓝配白字，夜间亮蓝配深字）；
- 富文本中由数据自带的内联高亮（如 `style="background-color:#ffff00"`）在夜间自动转为深色文字。

---

## 三、数据与接口

`src/api/index.js` 用本地 JSON 模拟 9 个接口（分类、产品、资讯、职位、流程、设置、图片），
签名与后端一致；`src/api/request.js` 保留原始 axios 实现作为回退参考。
