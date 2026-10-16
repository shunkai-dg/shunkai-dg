// 本地 API 服务（数据来自本地 JSON，取消对外部 /api 接口的依赖）
// 保留与原先一致的 9 个导出函数名与签名，页面组件无需改动，透明生效。
// 原始外部请求服务见 ./request.js（保留未使用，作为回退）。
//
// 产品/资讯/职位/流程四类数据的文案随语言切换：见 ./localizedData.js，
// 它把 JSON 里的英文与 *_zh 中文合成响应式数据，切换语言时页面自动重渲染。
import {
  localizedProducts,
  localizedNews,
  localizedJobs,
  localizedSteps,
} from "./localizedData";
import imgs from "./data/imgs.json";
import setting from "./data/setting.json";
import category from "./data/category.json";

// 统一响应壳：与后端保持一致 { data: ... }
const ok = (data) => Promise.resolve({ data });

// 简单分页
function paginate(list, params = {}) {
  const page = Number(params.page || 1);
  const limit = Number(params.limit || 10);
  const start = (page - 1) * limit;
  return {
    list: list.slice(start, start + limit),
    total: list.length,
  };
}

// 职位列表
export function seoList(params = {}) {
  return ok(paginate(localizedJobs, params));
}

// 图片/轮播图（type: banner/设备/资质/荣誉/证书/工厂/专利）
export function getImg(data = {}) {
  const type = String(data.type);
  return ok(imgs[type] || []);
}

// 资讯列表
export function getInfoList(params = {}) {
  let list = localizedNews;
  // 按 top 倒序、sort 正序重新排序
  list = list.slice().sort((a, b) => {
    const topDiff = (Number(b.top) || 0) - (Number(a.top) || 0);
    if (topDiff !== 0) return topDiff;
    return (Number(a.sort) || 0) - (Number(b.sort) || 0);
  });
  return ok(paginate(list, params));
}

// 资讯详情
export function getInfoView(data = {}) {
  const item =
    localizedNews.find((n) => String(n.id) === String(data.id)) ||
    localizedNews[0] ||
    {};
  return ok(item);
}

// Pageclip 写入配置：siteKey 是公开的写入令牌（只写、不读），表单名 Contact。
// public/index.html 中已引入 https://s.pageclip.co/v1/pageclip.js，暴露 window.Pageclip。
const PAGECLIP_SITE_KEY = "e3vqonw5pA6peER9ooUZEEwQtG9SYGjC";
const PAGECLIP_FORM_NAME = "Contact";
const PAGECLIP_ENDPOINT = `https://send.pageclip.co/${PAGECLIP_SITE_KEY}/${PAGECLIP_FORM_NAME}`;

// 提交联系表单：数据写入 Pageclip，成功后保持原有 { code: 40000 } 约定
export function setInfoContact(data) {
  const payload = {
    name: data.name || "",
    mobile: data.mobile || "",
    email: data.email || "",
    content: data.content || "",
  };

  // 优先使用官方 JS 库，它通过 XHR 以 JSON 提交
  const pageclip = typeof window !== "undefined" && window.Pageclip;
  if (pageclip && typeof pageclip.send === "function") {
    return new Promise((resolve, reject) => {
      pageclip.send(PAGECLIP_SITE_KEY, PAGECLIP_FORM_NAME, payload, (error) => {
        if (error) reject(new Error(error.message || "Pageclip send failed"));
        else resolve({ code: 40000, message: "success" });
      });
    });
  }

  // 兜底：若脚本被拦截/未加载，直接以表单编码 POST（无预检），并请求 JSON 响应
  const body = new URLSearchParams();
  Object.keys(payload).forEach((key) => body.append(key, payload[key]));
  return fetch(PAGECLIP_ENDPOINT, {
    method: "POST",
    headers: { Accept: "application/json" },
    body,
  }).then((res) => {
    if (!res.ok) throw new Error(`Pageclip request failed: ${res.status}`);
    return { code: 40000, message: "success" };
  });
}

// 产品列表（支持 keyword / cat_id / is_top）
export function getProductList(params = {}) {
  let list = localizedProducts;
  const keyword = (params.keyword || "").trim().toLowerCase();
  if (keyword) {
    list = list.filter(
      (p) =>
        (p.title || "").toLowerCase().indexOf(keyword) !== -1 ||
        (p.sub_title || "").toLowerCase().indexOf(keyword) !== -1,
    );
  }
  const cat_id = Number(params.cat_id);
  if (cat_id) {
    list = list.filter(
      (p) =>
        p.cat_one === cat_id ||
        p.cat_two === cat_id ||
        p.cat_three === cat_id ||
        p.cat_four === cat_id,
    );
  }
  // is_top 仅取前几条作为推荐
  if (params.is_top === 1) {
    list = list.filter((p) => p.is_top === 1);
  } else if (params.is_top === 0) {
    list = list.slice(0, 4);
  }
  return ok(paginate(list, params));
}

// 产品详情
export function getProductDetail(data = {}) {
  const item =
    localizedProducts.find((p) => String(p.id) === String(data.id)) ||
    localizedProducts[0] ||
    {};
  return ok(item);
}

// 流程步骤
export function getStepList(params = {}) {
  return ok(localizedSteps);
}

// 站点设置
export function getSetting(data = {}) {
  return ok(setting);
}

// 分类列表（平铺数据，含 id/parent_id/sort，对应原 /api/index/category）
export function getCategory(params = {}) {
  return ok(category.category);
}
