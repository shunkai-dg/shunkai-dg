// 分类树由静态改为 API 动态：数据来自 getCategory（本地 JSON），运行时构树
//
// 塑胶模具小工厂版简化说明：
//   - 产品中心已改为「顶部一级标签切换」（见 views/product/ProductCenter.vue），
//     不再使用多级手风琴分类树，因此本文件不再维护分组图标 / 二级分组树。
//   - 分类仍然按 parent_id 构树，仅供页脚分组、面包屑分类链使用。
import Vue from "vue";
import { getCategory } from "@/api";

export const fast_navigation = {
  title: "Fast navigation",
  i18nKey: "footer.fastNavigation",
  childer: [
    {
      title: "Home",
      i18nKey: "header.nav.home",
      path: "/",
      name: "home",
      id: "fast_navigation",
    },
    {
      title: "About shunkai",
      i18nKey: "header.nav.aboutshunkai",
      path: "/about-shunkai",
      name: "about_shunkai",
      id: "fast_navigation",
    },
    {
      title: "Product-Center",
      i18nKey: "header.nav.productCenter",
      path: "/product-center",
      name: "product_center",
      id: "fast_navigation",
    },
    {
      title: "News",
      i18nKey: "header.nav.news",
      path: "/news",
      name: "news",
      id: "fast_navigation",
    },
    {
      title: "Contact Us",
      i18nKey: "header.nav.contactUs",
      path: "/contact-us",
      name: "contact_us",
      id: "fast_navigation",
    },
  ],
};

// 头部导航渲染顺序（与原产物一致：isNav 项不在顶部导航显示）
export const navMenus = fast_navigation.childer;

// 动态分类数据：loaded 标记是否加载完成，roots 为一级分类（化妆品外壳 / 电子产品外壳 / 其他）
export const categoryStore = Vue.observable({ loaded: false, roots: [] });

// 将平铺分类数据按 parent_id 构建为树，各级按 sort 升序
// hierarchy = 分类 id（与产品列表 cat_id 对应）
export function buildCategoryTree(list) {
  const byId = {};
  const roots = [];
  // 先建索引
  (list || []).forEach((c) => {
    byId[c.id] = {
      id: c.id,
      title: c.title,
      name: c.name || c.title,
      hierarchy: Number(c.id),
      childer: [],
      _sort: Number(c.sort) || 0,
      _parent: Number(c.parent_id) || 0,
    };
    if (c.desc) byId[c.id].desc = c.desc;
    if (c.path) byId[c.id].path = c.path;
  });
  // 挂接父子
  Object.values(byId).forEach((node) => {
    const parent = byId[node._parent];
    if (parent) {
      parent.childer.push(node);
    } else {
      roots.push(node);
    }
  });
  const sortRec = (nodes) => {
    nodes.sort((a, b) => a._sort - b._sort);
    nodes.forEach((n) => sortRec(n.childer));
  };
  sortRec(roots);
  // 约定：一级根节点 childer 即二级分组，同时挂到 subGroups 供面包屑/页脚复用
  roots.forEach((root) => {
    root.subGroups = root.childer;
  });
  return roots;
}

let _loading = null;
// 加载分类（单例；失败可重试）
export function loadCategories() {
  if (categoryStore.loaded) return Promise.resolve(categoryStore.roots);
  if (_loading) return _loading;
  _loading = getCategory()
    .then((res) => {
      categoryStore.roots = buildCategoryTree(res.data || []);
      categoryStore.loaded = true;
      return categoryStore.roots;
    })
    .catch((err) => {
      _loading = null; // 允许重试
      throw err;
    });
  return _loading;
}

// 按 hierarchy 在动态树（一级 → subGroups → childer）中查找路径链
// 返回 [{ title, name, hierarchy }, ...]，未找到或无 hierarchy 返回 []
export function findHierarchyPath(hierarchy) {
  if (hierarchy == null || hierarchy === "" || Number(hierarchy) === 0)
    return [];
  const target = Number(hierarchy);
  const walk = (nodes, trail) => {
    for (const node of nodes || []) {
      const cur = trail.concat({
        title: node.title,
        name: node.name || node.title,
        hierarchy: node.hierarchy,
      });
      if (Number(node.hierarchy) === target) return cur;
      // 一级用 subGroups（二级分组），其他层级用 childer
      const kids =
        (node.subGroups && node.subGroups.length
          ? node.subGroups
          : node.childer) || [];
      const found = walk(kids, cur);
      if (found) return found;
    }
    return null;
  };
  for (const root of categoryStore.roots) {
    const found = walk([root], []);
    if (found) return found;
  }
  return [];
}
