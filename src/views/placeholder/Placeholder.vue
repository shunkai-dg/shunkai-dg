<template>
  <div class="placeholder-page">
    <h2>{{ $route.name }}</h2>
    <p>该页面待阶段 3 按 dist chunk 反推实现。</p>
  </div>
</template>

<script>
export default {
  name: "Placeholder",
};
</script>

<style scoped>
.placeholder-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 16px;
  text-align: center;
  color: #999;
}
h2 {
  color: #333;
}
</style>
