<template>
  <div class="demo-image__preview">
    <ElImageViewer
      v-if="isVisible"
      :src="url"
      :on-close="close"
      :url-list="[url]"
    />
  </div>
</template>

<script>
// 主路径：直接吃 element-ui 源码里的 image-viewer 组件
import ElImageViewer from "element-ui/packages/image/src/image-viewer.vue";
// 备选（如上面报错，按顺序试）：
// import ElImageViewer from 'element-ui/lib/image-viewer'
// const ElImageViewer = require('element-ui/lib/image-viewer').default

export default {
  name: "ImagePreview",
  components: { ElImageViewer },
  props: {
    imgList: { type: Array, default: () => [] },
    index: { type: Number, default: 0 },
    isVisible: { type: Boolean, default: false },
    k: { type: String, default: "" },
  },
  data() {
    return { url: "", data: [] };
  },
  watch: {
    index(val) {
      this.url = this.data[val];
    },
  },
  created() {
    this.data = [];
    for (let i = 0; i < this.imgList.length; i++) {
      this.data.push(this.imgList[i][this.k]);
    }
    this.url = this.data[this.index];
  },
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>
