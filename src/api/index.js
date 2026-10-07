// 本地 API 服务（数据来自本地 JSON，取消对外部 /api 接口的依赖）
// 保留与原先一致的 9 个导出函数名与签名，页面组件无需改动，透明生效。
// 原始外部请求服务见 ./request.js（保留未使用，作为回退）。
import products from "./data/products.json";
import news from "./data/news.json";
import jobs from "./data/jobs.json";
import steps from "./data/steps.json";
import imgs from "./data/imgs.json";
import setting from "./data/setting.json";

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
  return ok(paginate(jobs.jobs, params));
}

// 图片/轮播图（type: banner/设备/资质/荣誉/证书/工厂/专利）
export function getImg(data = {}) {
  const type = String(data.type);
  return ok(imgs[type] || []);
}

// 资讯列表
export function getInfoList(params = {}) {
  return ok(paginate(news.news, params));
}

// 资讯详情
export function getInfoView(data = {}) {
  const item =
    news.news.find((n) => String(n.id) === String(data.id)) || news.news[0] || {};
  return ok(item);
}

// 提交联系（本地直接返回成功，不再请求外部）
export function setInfoContact(data) {
  return Promise.resolve({ code: 40000, message: "success" });
}

// 产品列表（支持 keyword / cat_id / is_top）
export function getProductList(params = {}) {
  let list = products.products;
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
  if (params.is_top) {
    list = list.slice(0, 4);
  }
  return ok(paginate(list, params));
}

// 产品详情
export function getProductDetail(data = {}) {
  const item =
    products.products.find((p) => String(p.id) === String(data.id)) ||
    products.products[0] ||
    {};
  return ok(item);
}

// 流程步骤
export function getStepList(params = {}) {
  return ok(steps.steps);
}

// 站点设置
export function getSetting(data = {}) {
  return ok(setting);
}