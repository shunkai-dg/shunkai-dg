// 反推自 app.ceef79bc.js（fast_navigation / consumer_audio / industrial_audio）
// 分类层级关系：
//   1 Consumer Audio ─ 3 Headphone(On-ear/Overear) / 4 TWS / 5 Conference Audio
//   2 Industrial Audio ─ 6 Headphone(On-ear/Overear) / 7 In-ear Earphones / 8 Others
//   叶子项 hierarchy 9~37 已逐项校正（参见线上菜单层级）

const icons = {
  consumerHeadphone: require("@/assets/img/navData1.png"),
  consumerTWS:       require("@/assets/img/navData2.png"),
  consumerConference:require("@/assets/img/navData3.png"),
  industrialHeadphone: require("@/assets/img/navData4.png"),
  industrialInEar:   require("@/assets/img/navData5.png"),
  industrialOthers:  require("@/assets/img/navData6.png"),
};

export const fast_navigation = {
  title: "Fast navigation",
  childer: [
    {
      title: "Home",
      path: "/",
      name: "home",
      isMinNav: false,
      isNav: true,
      id: "fast_navigation",
    },
    {
      title: "About aska",
      path: "/about-aska",
      name: "about_aska",
      id: "fast_navigation",
    },
    {
      title: "Product-Center",
      path: "/product-center",
      isSubNav: true,
      id: "fast_navigation",
    },
    {
      title: "R&D Center",
      path: "/r-d-center",
      name: "r_d_center",
      id: "fast_navigation",
    },
    { title: "News", path: "/news", name: "news", id: "fast_navigation" },
    {
      title: "Production",
      path: "/production",
      name: "production",
      id: "fast_navigation",
    },
    {
      title: "Join Us",
      path: "/join-us",
      name: "join_us",
      isMinNav: false,
      isNav: true,
      id: "fast_navigation",
    },
    {
      title: "Contact Us",
      path: "/contact-us",
      name: "contact_us",
      id: "fast_navigation",
      isMinNav: true,
      childer: [{ title: "Join Us", path: "/join-us", name: "join_us" }],
    },
  ],
};

export const consumer_audio = {
  title: "Consumer Audio",
  name: "Consumer Audio",
  id: "consumer_audio",
  hierarchy: 1,
  isAppointAddress: true,
  // 子分组（头部 subNav 三列展示用）
  subGroups: [
    {
      title: "Headphone",
      desc: "(On-ear/Overear)",
      hierarchy: 3,
      icon: icons.consumerHeadphone,
      childer: [
        { title: "BT HIFI Headphones", hierarchy: 9 },
        {
          title: "Wireless ANC headphones",
          hierarchy: 10,
          childer: [
            { title: "FF/FB ANC headphones", hierarchy: 28 },
            { title: "Hybrid ANC headphones", hierarchy: 29 },
          ],
        },
        {
          title: "Gaming Headphones",
          hierarchy: 11,
          childer: [
            { title: "2.4G/5.8G Gaming Headphones", hierarchy: 30 },
            { title: "BT+2.4G ULL Gaming Headphones", hierarchy: 31 },
          ],
        },
        { title: "USB Audio Headphones (SUPPORT TEAMS)", hierarchy: 12 },
      ],
    },
    {
      title: "TWS",
      hierarchy: 4,
      icon: icons.consumerTWS,
      childer: [
        { title: "TWS HIFI Audio", hierarchy: 13 },
        {
          title: "Hybrid ANC",
          hierarchy: 14,
          childer: [
            { title: "Dynamic spk version", hierarchy: 32 },
            { title: "Balanced armature + Dynamic spk version", hierarchy: 33 },
          ],
        },
        { title: "TWS Hearing Enhancement", hierarchy: 15 },
      ],
    },
    {
      title: "Conference Audio",
      hierarchy: 5,
      icon: icons.consumerConference,
      childer: [{ title: "With XMOS/Advanced 6 Mics", hierarchy: 16 }],
    },
  ],
  // 页脚平铺列表用：保留嵌套层级，name 缺省取 title，hierarchy 缺省取组级
  get childer() {
    const flat = (items, fallback) =>
      items.map((t) => {
        const item = {
          title: t.title,
          name: t.name || t.title,
          hierarchy: t.hierarchy != null ? t.hierarchy : fallback,
        };
        if (t.path) item.path = t.path;
        if (t.childer && t.childer.length)
          item.childer = flat(t.childer, t.hierarchy);
        return item;
      });
    return this.subGroups.reduce(
      (arr, g) => arr.concat(flat(g.childer, g.hierarchy)),
      [],
    );
  },
};

export const industrial_audio = {
  title: "Industrial Audio",
  name: "Industrial Audio",
  id: "industrial_audio",
  hierarchy: 2,
  isAppointAddress: true,
  subGroups: [
    {
      title: "Headphone",
      desc: "(On-ear/Overear)",
      hierarchy: 6,
      icon: icons.industrialHeadphone,
      childer: [
        { title: "Communications Headphones (With Mic Rod)", hierarchy: 17 },
        {
          title: "Special type headphones",
          hierarchy: 18,
          childer: [{ title: "Helmet headphones", hierarchy: 34 }],
        },
        { title: "Protection Headphones （NRR & SNR）", hierarchy: 19 },
        { title: "ANC & ENC Headphones （Carbon Fiber ）", hierarchy: 20 },
      ],
    },
    {
      title: "In-ear Earphones",
      hierarchy: 7,
      icon: icons.industrialInEar,
      childer: [
        { title: "Protection in-ear Earphone （NRR & SNR）", hierarchy: 21 },
        {
          title: "Protection TWS Earphone（NRR & SNR）",
          path: "/tws-ear",
          name: "tws_ear",
          hierarchy: 22,
        },
        { title: "ANC & ENC in-ear Earphones（With Mic Rod）", hierarchy: 23 },
        {
          title: "In-ear Earphones with ambient sound for hunting",
          hierarchy: 37,
        },
      ],
    },
    {
      title: "Others",
      hierarchy: 8,
      icon: icons.industrialOthers,
      childer: [
        { title: "DECT headphones", hierarchy: 24 },
        { title: "PTT function earbuds", hierarchy: 25 },
      ],
    },
  ],
  // 页脚平铺列表用：保留嵌套层级，name 缺省取 title，hierarchy 缺省取组级
  get childer() {
    const flat = (items, fallback) =>
      items.map((t) => {
        const item = {
          title: t.title,
          name: t.name || t.title,
          hierarchy: t.hierarchy != null ? t.hierarchy : fallback,
        };
        if (t.path) item.path = t.path;
        if (t.childer && t.childer.length)
          item.childer = flat(t.childer, t.hierarchy);
        return item;
      });
    return this.subGroups.reduce(
      (arr, g) => arr.concat(flat(g.childer, g.hierarchy)),
      [],
    );
  },
};

// 头部导航渲染顺序（原产物：isNav 项不在 el-menu 中显示）
export const navMenus = fast_navigation.childer;
export const routers = {
  consumer_audio,
  industrial_audio,
};

// 按 hierarchy 在分类完整树（一级 → subGroups → childer）中查找路径链
// 返回 [{ title, name, hierarchy }, ...]，未找到或无 hierarchy 返回 []
export function findHierarchyPath(hierarchy) {
  if (hierarchy == null || hierarchy === "" || Number(hierarchy) === 0)
    return [];
  const target = Number(hierarchy);
  const walk = (nodes, trail) => {
    for (const node of nodes) {
      const cur = trail.concat({
        title: node.title,
        name: node.name || node.title,
        hierarchy: node.hierarchy,
      });
      if (Number(node.hierarchy) === target) return cur;
      if (node.childer && node.childer.length) {
        const found = walk(node.childer, cur);
        if (found) return found;
      }
    }
    return null;
  };
  for (const root of [consumer_audio, industrial_audio]) {
    const found = walk(
      [
        {
          title: root.title,
          name: root.name,
          hierarchy: root.hierarchy,
          childer: root.subGroups,
        },
      ],
      [],
    );
    if (found) return found;
  }
  return [];
}
