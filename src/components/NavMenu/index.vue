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
      <!-- 其余导航项（含 Product Center）：直接跳转，不再悬浮展开多级面板 -->
      <el-menu-item v-else :key="'i' + i" :index="n.path">
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
