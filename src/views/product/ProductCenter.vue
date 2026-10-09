<template>
  <div>
    <Breadcrumb />
    <div class="product_center">
      <div>
        <div class="container">
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
                      {{ $t('common.more') }}
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
            <div class="product_center_r">
              <div class="product_center_menu">
                <div class="ptree">
                  <product-tree-menu
                    :nodes="productTree"
                    :level="0"
                    :active-hierarchy="$route.query.hierarchy"
                    @select="jumpMune"
                  />
                </div>
              </div>
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
import ProductTreeMenu from "@/components/ProductTreeMenu/index.vue";
import { getProductList } from "@/api/index";
import { RESOURCE_BASE_URL } from "@/utils/resource";
import { categoryStore } from "@/utils/navData";

export default {
  components: { Breadcrumb, ProductTreeMenu },
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
    // 完整层级树：一级 → 二级 subGroups → 三级/四级 childer
    productTree() {
      return categoryStore.roots.map((g) => ({
        title: g.title,
        name: g.name,
        hierarchy: g.hierarchy,
        childer: g.subGroups,
      }));
    },
  },
  watch: {
    // SPA 无刷新：仅在本页内切换分类时重新拉列表，保留组件实例与树展开状态
    $route(to) {
      if (to.name === "product_center") {
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
    getFeachList(extra) {
      getProductList({
        page: this.page,
        limit: this.limit,
        cat_id: this.$route.query.hierarchy || 0,
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
    jumpMune(item) {
      this.$router.push({
        name: "product_center",
        query: { name: item.name || item.title, hierarchy: item.hierarchy },
      });
    },
    jump(item) {
      this.$router.push({
        name: "product_center_detail",
        query: {
          id: item.id,
          hierarchy: this.$route.query.hierarchy,
          page: this.page,
          limit: this.limit,
        },
      });
    },
  },
};
</script>

<style scoped>
/* 来自 chunk-18f6d912.e796d06a.css，已去掉公共 breadcrumb 部分 */
@media (min-width: 1200px) {
  .product_center_l_item_img {
    height: 200px !important;
  }
}
@media (min-width: 768px) {
  .product_center_l_item_img {
    height: 200px !important;
  }
}
@media (max-width: 576px) {
  .product_center_l_item_img {
    height: 80px !important;
  }
}
@media (max-width: 768px) {
  .product_center {
    padding-bottom: 140px !important;
  }
  .product_center_r {
    display: none;
  }
  .product_center_l {
    width: 100% !important;
    padding-right: 0 !important;
  }
  .product_center_l .product_center_l_item {
    width: 50% !important;
  }
}
@media (min-width: 1513px) {
  .product_center .container {
    max-width: 1500px !important;
  }
}
.product_center {
  padding-bottom: 180px;
}
.product_center .container {
  padding: 0 !important;
}
.product_center .container .product_center_row {
  margin-top: 30px !important;
  display: flex;
  flex-direction: row;
  position: relative;
}
.product_center .container .product_center_l.el-col {
  padding-right: 22px !important;
}
.product_center .container .product_center_l {
  width: 75%;
  padding-right: 12px;
  position: relative;
}
.product_center .container .product_center_l .el-pagination {
  text-align: center;
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: -40px;
  left: 0;
  right: 0;
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
.product_center .container .product_center_l ul {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 0;
  list-style-type: none;
}
.product_center .container .product_center_l .product_center_l_item {
  width: 33.33%;
  padding: 10px;
}
.product_center
  .container
  .product_center_l
  .product_center_l_item
  .product_center_l_item_wrapper {
  padding: 20px;
  background: var(--surface-2);
  height: 100%;
}
.product_center
  .container
  .product_center_l
  .product_center_l_item
  .product_center_l_item_wrapper
  .product_center_l_item_title {
  padding: 5px 0 0 0;
  font-size: 20px;
  line-height: 1.5;
  text-align: left;
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
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}
.product_center
  .container
  .product_center_l
  .product_center_l_item
  .product_center_l_item_wrapper
  .product_center_l_item_btn {
  margin-top: 10px !important;
  margin-bottom: 25px !important;
  font-size: 12px;
  color: var(--text-muted);
  background: transparent;
  margin: 0 15px 0 0;
  border: 1px solid var(--btn-bg);
  border-radius: 0;
  padding: 6px 20px;
  display: block;
}
.product_center
  .container
  .product_center_l
  .product_center_l_item
  .product_center_l_item_wrapper
  .product_center_l_item_img {
  display: table;
  table-layout: fixed;
  width: 100%;
  vertical-align: middle;
  text-align: center;
  display: flex;
  justify-content: center;
}
.product_center
  .container
  .product_center_l
  .product_center_l_item
  .product_center_l_item_wrapper
  .product_center_l_item_img
  img {
  width: 100%;
  height: auto;
  object-fit: contain;
}
.product_center .container .product_center_r {
  width: 25%;
  padding: 10px 0 !important;
  position: absolute;
  right: 0;
  height: 100%;
  background: var(--surface);
  border: 1px solid var(--border);
  overflow: hidden;
  overflow: scroll;
}
.product_center .container .product_center_r .product_center_menu {
  overflow: scroll;
  overflow-x: hidden;
  background: var(--surface);
}
.product_center .container .product_center_r .product_center_menu .ptree {
  background: var(--surface);
  padding: 8px 0;
}
.empty-tip {
  width: 100%;
}
</style>
