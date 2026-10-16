<template>
  <div>
    <div class="product-list">
      <p>{{ $t("product.list.searchResult") }}</p>
      <p v-if="keyword" class="product-list_keyword">{{ keyword }}</p>
    </div>
    <div class="product_center_list">
      <div class="container">
        <ul v-if="list && list.length">
          <li
            v-for="(item, index) in list"
            :key="index"
            class="product_center_l_item"
            @click="jumpProductDetail(item)"
          >
            <div class="product_center_l_item_wrapper">
              <div class="product_center_l_item_f">
                <h4 class="product_center_l_item_title">{{ item.title }}</h4>
                <p class="product_center_l_item_desc">{{ item.sub_title }}</p>
                <div class="product_center_l_item_img">
                  <img
                    v-if="item.imgs && item.imgs[0]"
                    :src="RESOURCE_BASE_URL + item.imgs[0]"
                    :alt="item.title"
                  />
                </div>
              </div>
            </div>
          </li>
        </ul>
        <p v-else class="product_center_list_empty">{{ $t("common.noData") }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { getProductList } from "@/api/index";
import { RESOURCE_BASE_URL } from "@/utils/resource";

export default {
  data() {
    return { RESOURCE_BASE_URL, list: [], keyword: "" };
  },
  watch: {
    $route: {
      immediate: true,
      handler(to) {
        if (to.query && to.query.k !== undefined) {
          this.getFeachList(to.query.k);
        }
      },
    },
  },
  created() {
    this.getFeachList(this.$route.query.k);
  },
  methods: {
    getFeachList(keyword) {
      this.keyword = keyword || "";
      getProductList({ keyword: this.keyword }).then((res) => {
        this.list = res.data.list;
      });
    },
    jumpProductDetail(item) {
      this.$router.push({
        name: "product_center_detail",
        query: {
          id: item.id,
          hierarchy: item.cat_two || item.cat_one,
        },
      });
    },
  },
};
</script>

<style scoped>
/* 来自 chunk-6ffba308.63e7db3c.css，色值统一改走主题令牌 */
.product-list {
  background: var(--surface);
  padding: 20px;
  text-align: center;
}

.product-list p {
  margin: 60px 0 !important;
  text-align: center;
  color: var(--text-strong);
  font-size: 40px;
  font-weight: 700;
  line-height: 1.5;
}

.product-list .product-list_keyword {
  margin: 0 0 40px !important;
  font-size: 20px;
  font-weight: 400;
  color: var(--text-muted);
}

.product_center_list {
  padding: 30px 0 80px 0;
  background: var(--bg);
}

.product_center_list ul {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0;
  margin: 0;
}

.container ul {
  justify-content: center;
  list-style-type: none;
}

.product_center_list .container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
  box-sizing: border-box;
}

.product_center_list .product_center_list_empty {
  padding: 60px 0;
  text-align: center;
  color: var(--text-muted);
}

.product_center_list .product_center_l_item_f {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
}

.product_center_list .product_center_l_item {
  width: 25%;
  padding: 10px;
  box-sizing: border-box;
  cursor: pointer;
}

.product_center_list .product_center_l_item .product_center_l_item_wrapper {
  padding: 20px;
  background: var(--surface);
  height: 100%;
  position: relative;
  border: 1px solid var(--border);
  border-radius: 6px;
  box-sizing: border-box;
}

.product_center_list
  .product_center_l_item
  .product_center_l_item_wrapper
  .product_center_l_item_title {
  padding: 5px 0 0 0;
  font-size: 18px;
  line-height: 1.5;
  color: var(--text);
  text-align: left;
}

.product_center_list
  .product_center_l_item
  .product_center_l_item_wrapper
  .product_center_l_item_desc {
  padding-bottom: 5px;
  color: var(--text-muted);
  font-size: 14px;
  line-height: 1.7;
  text-align: left;
}

.product_center_list
  .product_center_l_item
  .product_center_l_item_wrapper
  .product_center_l_item_img {
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.product_center_list
  .product_center_l_item
  .product_center_l_item_wrapper
  .product_center_l_item_img
  img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.product_center_list
  .product_center_l_item:hover
  .product_center_l_item_img
  img {
  transform: scale(1.05);
}

@media (max-width: 768px) {
  .product-list p {
    margin: 30px 0 !important;
    font-size: 26px;
  }
  .product_center_list .product_center_l_item {
    width: 50%;
  }
  .product_center_list
    .product_center_l_item
    .product_center_l_item_wrapper
    .product_center_l_item_img {
    height: 140px;
  }
}

@media (max-width: 480px) {
  .product_center_list .product_center_l_item {
    width: 100%;
  }
}
</style>
