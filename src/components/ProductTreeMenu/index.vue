<template>
  <div class="ptree-level">
    <div v-for="(n, i) in nodes" :key="i" class="ptree-node">
      <div
        class="ptree-row"
        :class="{
          'has-children': hasChildren(n),
          'is-open': open[i],
          'is-active': isActive(n),
        }"
        :style="{ paddingLeft: level * 14 + 12 + 'px' }"
      >
        <span class="ptree-label" @click="goProduct(n)">{{ $label(n) }}</span>
        <span
          v-if="hasChildren(n)"
          class="ptree-chevron"
          @click.stop="toggle(i)"
        >
          <i class="el-icon-arrow-down" :class="{ 'is-open': open[i] }"></i>
        </span>
      </div>
      <product-tree-menu
        v-if="hasChildren(n) && open[i]"
        :nodes="n.childer"
        :level="level + 1"
        :active-hierarchy="activeHierarchy"
        @select="(e) => $emit('select', e)"
      />
    </div>
  </div>
</template>

<script>
// 产品中心分类树：递归渲染任意层级，向下展开（手风琴）
// 行为对齐 Contact Us：有子级的整行点击即展开/收起子级；无子级的点击跳转分类页
export default {
  name: "ProductTreeMenu",
  props: {
    nodes: { type: Array, default: () => [] },
    level: { type: Number, default: 0 },
    activeHierarchy: { type: [Number, String], default: null },
  },
  data() {
    return { open: {} };
  },
  methods: {
    hasChildren(n) {
      return !!(n && n.childer && n.childer.length);
    },
    isActive(n) {
      return (
        this.activeHierarchy != null &&
        Number(n.hierarchy) === Number(this.activeHierarchy)
      );
    },
    // 整行点击展开/收起子级
    toggle(i) {
      this.$set(this.open, i, !this.open[i]);
    },
    // 叶子项点击：跳转产品中心分类页
    goProduct(n) {
      this.$emit("select", n);
    },
  },
};
</script>

<style scoped>
/* 色值统一走主题令牌（src/assets/css/theme.css）：抽屉内随昼夜切换 */
.ptree-row {
  display: flex;
  align-items: center;
  min-height: 38px;
  cursor: pointer;
  font-size: 13px;
  color: var(--text);
  border-bottom: 1px solid var(--border);
  box-sizing: border-box;
}
.ptree-row.has-children {
  font-weight: 600;
}
.ptree-row:hover .ptree-label,
.ptree-row.is-open .ptree-label,
.ptree-row.is-active .ptree-label {
  color: var(--accent);
}
.ptree-label {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 38px;
  padding-left: 12px;
  box-sizing: border-box;
  margin-bottom: 10px;
  padding-bottom: 10px;
}
.ptree-chevron {
  display: inline-flex;
  align-items: center;
  width: 100px;
  flex-shrink: 0;
  color: var(--text-faint);
}
.ptree-chevron i {
  margin: auto;
  transition: transform 0.25s ease;
  font-size: 12px;
  color: var(--text-faint);
}
.ptree-chevron i.is-open {
  transform: rotate(180deg);
}

@media screen and (max-width: 768px) {
  .ptree-row {
    padding-left: 0;
  }
}
.ptree-level {
  padding-left: 12px;
}
.ptree-node {
  padding-bottom: 0;
}
.ptree-label {
  padding-left: 12px;
}
.ptree-chevron {
  width: 100px;
  color: var(--text-faint);
}
.ptree-chevron i {
  font-size: 10px;
  color: var(--text-faint);
}
</style>
