<template>
  <div>
    <div class="product-list">
      <p>{{ $t('product.list.searchResult') }}</p>
    </div>
    <div class="product_center_list">
      <div class="container">
        <ul>
          <li
            v-for="(item, index) in list"
            :key="index"
            class="product_center_l_item"
            @click="jumpProductDetail(item)"
          >
            <div class="product_center_l_item_wrapper">
              <div class="product_center_l_item_img">
                <img :src="RESOURCE_BASE_URL + item.imgs[0]" />
              </div>
              <div class="product_center_l_item_f">
                <h4 class="product_center_l_item_title">{{ item.title }}</h4>
                <p class="product_center_l_item_desc">{{ item.sub_title }}</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { getProductList } from "@/api/index";
import { RESOURCE_BASE_URL } from "@/utils/resource";

export default {
  data() {
    return { RESOURCE_BASE_URL, list: [] };
  },
  watch: {
    $route: {
      immediate: true,
      handler(to, from) {
        if (this.$route.query.k) {
          this.getFeachList(this.$route.query.k);
        }
      },
    },
  },
  created() {
    this.getFeachList(this.$route.query.k);
  },
  methods: {
    getFeachList(keyword) {
      getProductList({ keyword: keyword || "" }).then((res) => {
        this.list = res.data.list;
      });
    },
    jumpProductDetail(item) {
      this.$router.push({
        name: "product_center_detail",
        query: {
          id: item.id,
          hierarchy:
            item.cat_four || item.cat_three || item.cat_two || item.cat_one,
        },
      });
    },
  },
};
</script>

<style scoped>
/* 来自 chunk-6ffba308.63e7db3c.css */
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
  .product_center_l_item {
    width: 50% !important;
  }
}
.product-list {
  background: var(--surface);
  padding: 20px;
  text-align: center;
}
.product-list p {
  margin: 60px 0 !important;
  text-align: center;
  color: var(--text-strong);
  font-family: Microsoft YaHei;
  font-size: 40px;
  font-weight: 700;
  line-height: 1.5;
}
.product_center_list {
  padding: 30px 0 80px 0;
}
.product_center_list ul {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.container ul {
  justify-content: center;
  list-style-type: none;
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
}
.product_center_list .product_center_l_item .product_center_l_item_wrapper {
  padding: 20px;
  background: var(--surface);
  height: 100%;
  position: relative;
}
.product_center_list
  .product_center_l_item
  .product_center_l_item_wrapper
  .product_center_l_item_title {
  padding: 5px 0 0 0;
  font-size: 20px;
  line-height: 1.5;
}
.product_center_list
  .product_center_l_item
  .product_center_l_item_wrapper
  .product_center_l_item_desc {
  margin-top: 20px;
  padding-bottom: 5px;
  margin-top: 0;
  color: var(--accent-text);
  font-size: 14px;
  line-height: 1.7;
  text-align: center;
}
.product_center_list
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
.product_center_list
  .product_center_l_item
  .product_center_l_item_wrapper
  .product_center_l_item_img
  img {
  height: auto;
  width: 100%;
  object-fit: contain;
}
</style>
