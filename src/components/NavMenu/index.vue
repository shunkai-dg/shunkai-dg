<template>
  <el-menu
    class="el-menu-demo"
    :default-active="activeMenu"
    mode="horizontal"
    @select="$emit('select', $event)"
  >
    <template v-for="(n, i) in menus">
      <!-- 有 childer 的渲染为 el-submenu（如 Contact Us） -->
      <el-submenu
        v-if="n.childer"
        :key="'s' + i"
        :index="n.path + n.name + i"
        popper-append-to-body
      >
        <template slot="title">
          <a href="javascript:;" @click="$emit('jump', n)">{{ $label(n) }} </a>
        </template>
        <el-menu-item v-for="(c, ci) in n.childer" :key="ci" :index="c.path">
          {{ $label(c) }}
        </el-menu-item>
      </el-submenu>
      <!-- Product Center：hover 展开产品分组面板 -->
      <el-menu-item
        v-else-if="n.isSubNav"
        :key="'p' + i"
        :index="n.title"
        @mouseenter.native="$emit('subnav', n)"
        @mouseleave.native="$emit('subnav-out')"
      >
        {{ $label(n) }}
      </el-menu-item>
      <!-- isNav 项（Home/Join Us）不在顶部导航渲染，与原产物一致 -->
      <el-menu-item
        v-else-if="!n.isNav"
        :key="'i' + i"
        :index="n.path"
        @mouseenter.native="$emit('subnav-out')"
      >
        {{ $label(n) }}
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script>
// 反推来源：app.js 6eaf/c003/5599（NavMenu 模块）
export default {
  name: "NavMenu",
  props: {
    menus: { type: Array, default: () => [] },
    activeMenu: { type: String, default: "/" },
  },
};
</script>
