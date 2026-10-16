// 资源服务器统一前缀（产品图、二维码等通过相对路径访问的静态资源）
//
// 取部署路径（pathname）并保证以 "/" 结尾，页面代码统一用
// `RESOURCE_BASE_URL + "img_data/..."` 拼接，因此这里必须带尾斜杠：
//   - GitHub Pages 根路径部署        -> "/"        拼接结果 "/img_data/..."
//   - 部署在子目录（如 /shunkai-dg/）-> "/shunkai-dg/" 拼接结果 "/shunkai-dg/img_data/..."
//
// 注意：早期实现取的是 window.location.search（意图同样是「部署前缀」），
// 导致任何带查询参数的地址都会污染资源地址 —— 例如 ?locale=en-US 或 ?theme=night
// 会拼出 "?locale=en-USimg_data/products/p1.jpg"，全站图片 404。
// 查询参数属于语言/主题预览开关（见 src/i18n/index.js、src/utils/theme.js），
// 与资源前缀无关，这里改用 pathname。
const pathname =
  typeof window !== "undefined" && window.location
    ? window.location.pathname || "/"
    : "/";

export const RESOURCE_BASE_URL = pathname.replace(/[^/]*$/, "");
