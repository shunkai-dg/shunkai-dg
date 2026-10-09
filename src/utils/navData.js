// 分类树由静态改为 API 动态：数据来自 getCategory（本地 JSON），运行时构树
import Vue from "vue";
import { getCategory } from "@/api";

const icons = {
  consumerHeadphone: require("@/assets/img/navData1.png"),
  consumerTWS:       require("@/assets/img/navData2.png"),
  consumerConference:require("@/assets/img/navData3.png"),
  industrialHeadphone: require("@/assets/img/navData4.png"),
  industrialInEar:   require("@/assets/img/navData5.png"),
  industrialOthers:  require("@/assets/img/navData6.png"),
};
// 二级分组按原静态树位置对应的图标（保证头部悬浮面板显示不变）
const GROUP_ICONS = [
  [icons.consumerHeadphone, icons.consumerTWS, icons.consumerConference],
  [icons.industrialHeadphone, icons.industrialInEar, icons.industrialOthers],
];

export const fast_navigation = {
  title: "Fast navigation",
  i18nKey: "footer.fastNavigation",
  childer: [
    {
      title: "Home",
      i18nKey: "header.nav.home",
      path: "/",
      name: "home",
      isMinNav: false,
      isNav: true,
      id: "fast_navigation",
    },
    {
      title: "About aska",
      i18nKey: "header.nav.aboutAska",
      path: "/about-aska",
      name: "about_aska",
      id: "fast_navigation",
    },
    {
      title: "Product-Center",
      i18nKey: "header.nav.productCenter",
      path: "/product-center",
      isSubNav: true,
      id: "fast_navigation",
    },
    {
      title: "R&D Center",
      i18nKey: "header.nav.rdCenter",
      path: "/r-d-center",
      name: "r_d_center",
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
      title: "Production",
      i18nKey: "header.nav.production",
      path: "/production",
      name: "production",
      id: "fast_navigation",
    },
    {
      title: "Join Us",
      i18nKey: "header.nav.joinUs",
      path: "/join-us",
      name: "join_us",
      isMinNav: false,
      isNav: true,
      id: "fast_navigation",
    },
    {
      title: "Contact Us",
      i18nKey: "header.nav.contactUs",
      path: "/contact-us",
      name: "contact_us",
      id: "fast_navigation",
      isMinNav: true,
      childer: [
        {
          title: "Join Us",
          i18nKey: "header.nav.joinUs",
          path: "/join-us",
          name: "join_us",
        },
      ],
    },
  ],
};

// 头部导航渲染顺序（原产物：isNav 项不在 el-menu 中显示）
export const navMenus = fast_navigation.childer;

// 动态分类数据：loaded 标记是否加载完成，roots 为一级分类树
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
  // 挂接父子（childer 保持树结构，供悬浮面板/抽屉/面包屑使用）
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
  // 约定：一级根节点 children 即二级分组，挂到 subGroups 供头部悬浮面板使用
  // 并按位置补原有图标、Headphone 补 (On-ear/Overear) 描述，一二级显示效果不变
  roots.forEach((root, ri) => {
    root.subGroups = root.childer;
    root.subGroups.forEach((g, gi) => {
      g.icon = (GROUP_ICONS[ri] || [])[gi];
      if (!g.desc && g.title === "Headphone") g.desc = "(On-ear/Overear)";
    });
  });
  return roots;
}

// 页脚平铺列表用：将某组节点平铺为叶子列表（保留嵌套层级）
function flatChildren(items, fallback) {
  return (items || []).map((t) => {
    const item = {
      title: t.title,
      name: t.name || t.title,
      hierarchy: t.hierarchy != null ? t.hierarchy : fallback,
    };
    if (t.path) item.path = t.path;
    if (t.childer && t.childer.length)
      item.childer = flatChildren(t.childer, t.hierarchy);
    return item;
  });
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
