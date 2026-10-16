<template>
  <div>
    <Breadcrumb />
    <div class="product_center">
      <div>
        <div class="container">
          <!-- 一级分类标签（化妆品外壳 / 电子产品外壳 / 其他产品），点击切换列表 -->
          <ul class="product_tabs">
            <li
              v-for="c in categoryTabs"
              :key="c.id"
              class="product_tabs_item"
              :class="{ 'is-active': isActiveTab(c) }"
              @click="selectTab(c)"
            >
              {{ $tt(c.title) }}
            </li>
          </ul>

          <div class="product_center_row">
            <div class="product_center_l">
              <ul v-if="list && list.length > 0">
                <li
                  v-for="(item, index) in list"
                  :key="index"
                  class="product_center_l_item"
                >
                  <div class="product_center_l_item_wrapper">
                    <h4 class="product_center_l_item_title">
                      {{ item.title }}
                    </h4>
                    <p class="product_center_l_item_desc">
                      {{ item.sub_title }}
                    </p>
                    <button
                      class="product_center_l_item_btn"
                      @click="jump(item)"
                    >
                      {{ $t("common.more") }}
                    </button>
                    <div class="product_center_l_item_img">
                      <img
                        v-if="item.imgs[0]"
                        :src="RESOURCE_BASE_URL + item.imgs[0]"
                      />
                    </div>
                  </div>
                </li>
              </ul>
              <p v-else class="product_center_empty">
                {{ $t("common.noData") }}
              </p>
              <el-pagination
                v-show="list && list.length"
                background
                layout="prev, pager, next"
                :current-page="page"
                :page-size="limit"
                :total="total"
                @current-change="handleCurrentChange"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import { getProductList } from "@/api/index";
import { RESOURCE_BASE_URL } from "@/utils/resource";
import { categoryStore } from "@/utils/navData";

export default {
  components: { Breadcrumb },
  data() {
    return {
      RESOURCE_BASE_URL,
      list: [],
      page: 1,
      limit: 6,
      total: 0,
    };
  },
  computed: {
    ...mapGetters(["routersList"]),
    // 顶部标签：categoryStore 的一级分类
    categoryTabs() {
      return categoryStore.roots;
    },
    // 当前选中的分类 id（默认第一个分类）
    activeCatId() {
      const id = Number(this.$route.query.hierarchy);
      if (id) return id;
      const first = this.categoryTabs[0];
      return first ? Number(first.id) : 0;
    },
  },
  watch: {
    // SPA 无刷新：本页内切换分类时重新拉列表
    $route(to) {
      if (to.name === "product_center") {
        this.page = 1;
        this.getFeachList();
      }
    },
    // 分类数据异步就绪后，若 URL 未带分类则按默认分类拉一次
    categoryTabs(tabs) {
      if (tabs.length && !Number(this.$route.query.hierarchy)) {
        this.page = 1;
        this.getFeachList();
      }
    },
  },
  created() {
    this.getFeachList();
  },
  beforeDestroy() {
    this.$store.dispatch("getBreadcrumb", this.routersList);
  },
  methods: {
    isActiveTab(c) {
      return Number(c.id) === Number(this.activeCatId);
    },
    // 点击标签：写入 query，列表由 watch $route 触发刷新
    selectTab(c) {
      if (this.isActiveTab(c)) return;
      this.$router.push({
        name: "product_center",
        query: { name: c.name || c.title, hierarchy: c.id },
      });
    },
    getFeachList(extra) {
      getProductList({
        page: this.page,
        limit: this.limit,
        cat_id: this.activeCatId || 0,
        ...extra,
      }).then((res) => {
        this.list = res.data.list;
        this.total = res.data.total;
      });
    },
    handleCurrentChange(page) {
      this.page = page;
      this.getFeachList();
    },
    jump(item) {
      this.$router.push({
        name: "product_center_detail",
        query: {
          id: item.id,
          hierarchy: this.activeCatId,
          page: this.page,
          limit: this.limit,
        },
      });
    },
  },
};
</script>

<style scoped>
/* 来自 chunk-18f6d912.e796d06a.css，已按「顶部标签」改造重写 */
.product_center {
  padding-bottom: 180px;
}

/* ---------------- 顶部一级分类标签 ---------------- */
.product_tabs {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 30px 0 10px;
  padding: 0;
  list-style: none;
  gap: 12px;
}

.product_tabs_item {
  padding: 10px 28px;
  font-size: 15px;
  line-height: 1.4;
  color: var(--text-muted);
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: 4px;
  cursor: pointer;
  transition:
    color 0.2s ease,
    background-color 0.2s ease,
    border-color 0.2s ease;
}

.product_tabs_item:hover {
  color: var(--accent-text);
  border-color: var(--accent);
}

.product_tabs_item.is-active {
  color: var(--btn-text);
  background: var(--btn-bg);
  border-color: var(--btn-bg);
}

.product_center .container {
  padding: 0 15px !important;
  max-width: 1200px;
  margin: 0 auto;
}

.product_center .container .product_center_row {
  display: flex;
  flex-direction: row;
  position: relative;
  margin-top: 20px !important;
}

.product_center .container .product_center_l {
  width: 100%;
  position: relative;
}

.product_center .container .product_center_l ul {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
  list-style-type: none;
}

.product_center .container .product_center_l .product_center_empty {
  padding: 60px 0;
  text-align: center;
  color: var(--text-muted);
}

.product_center .container .product_center_l .product_center_l_item {
  width: 33.33%;
  padding: 10px;
  box-sizing: border-box;
}

.product_center
  .container
  .product_center_l
  .product_center_l_item
  .product_center_l_item_wrapper {
  padding: 20px;
  background: var(--surface-2);
  height: 100%;
  box-sizing: border-box;
}

.product_center
  .container
  .product_center_l
  .product_center_l_item
  .product_center_l_item_wrapper
  .product_center_l_item_title {
  padding: 5px 0 0 0;
  font-size: 18px;
  line-height: 1.5;
  text-align: left;
  color: var(--text);
}

.product_center
  .container
  .product_center_l
  .product_center_l_item
  .product_center_l_item_wrapper
  .product_center_l_item_desc {
  text-align: left;
  padding-bottom: 5px;
  line-height: 1.5;
  color: var(--text-muted);
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.product_center
  .container
  .product_center_l
  .product_center_l_item
  .product_center_l_item_wrapper
  .product_center_l_item_btn {
  margin: 10px 15px 25px 0 !important;
  font-size: 12px;
  color: var(--text-muted);
  background: transparent;
  border: 1px solid var(--btn-bg);
  border-radius: 0;
  padding: 6px 20px;
  display: block;
  cursor: pointer;
}

.product_center
  .container
  .product_center_l
  .product_center_l_item
  .product_center_l_item_wrapper
  .product_center_l_item_btn:hover {
  color: var(--btn-text);
  background: var(--btn-bg);
}

.product_center
  .container
  .product_center_l
  .product_center_l_item
  .product_center_l_item_wrapper
  .product_center_l_item_img {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
}

.product_center
  .container
  .product_center_l
  .product_center_l_item
  .product_center_l_item_wrapper
  .product_center_l_item_img
  img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* ---------------- 分页 ---------------- */
.product_center .container .product_center_l .el-pagination {
  text-align: center;
  display: flex;
  justify-content: center;
  margin-top: 40px;
}

.product_center .container .product_center_l .el-pagination .btn-next:disabled,
.product_center .container .product_center_l .el-pagination .btn-prev:disabled {
  background: var(--surface);
}

.product_center
  .container
  .product_center_l
  .el-pagination
  .btn-next:disabled
  i,
.product_center
  .container
  .product_center_l
  .el-pagination
  .btn-prev:disabled
  i {
  color: var(--text-faint);
}

.product_center .container .product_center_l .el-pagination button {
  width: 28px;
  height: 28px;
}

.product_center .container .product_center_l .el-pagination button .el-icon {
  font-size: 16px;
}

.product_center .container .product_center_l .el-pagination .active,
.product_center .container .product_center_l .el-pagination .el-pager li:hover {
  color: var(--btn-text) !important;
  background-color: var(--btn-bg) !important;
}

/* ---------------- 响应式：平板两列 / 手机单列 ---------------- */
@media (min-width: 1513px) {
  .product_center .container {
    max-width: 1500px;
  }
}

@media (max-width: 768px) {
  .product_center {
    padding-bottom: 100px;
  }
  .product_center .container .product_center_l .product_center_l_item {
    width: 50%;
  }
  .product_center
    .container
    .product_center_l
    .product_center_l_item
    .product_center_l_item_wrapper
    .product_center_l_item_img {
    height: 140px;
  }
}

@media (max-width: 576px) {
  .product_tabs_item {
    padding: 8px 14px;
    font-size: 13px;
  }
  .product_center .container .product_center_l .product_center_l_item {
    width: 100%;
  }
  .product_center
    .container
    .product_center_l
    .product_center_l_item
    .product_center_l_item_wrapper
    .product_center_l_item_img {
    height: 180px;
  }
}
</style>
