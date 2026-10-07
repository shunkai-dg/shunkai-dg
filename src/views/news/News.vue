<template>
  <div>
    <Breadcrumb />
    <div class="new_warp warp">
      <div class="new_container container">
        <ul class="new_center">
          <li v-for="(item, index) in dataList" :key="index" class="new_list">
            <div class="new_item">
              <div class="new_item_l">
                <img :src="item.cover" />
              </div>
              <div class="new_item_r">
                <p class="new_item_news">News</p>
                <p class="new_item_r_tit">{{ item.title }}</p>
                <p class="new_item_r_desc">{{ item.descr }}</p>
                <button class="new_item_r_btn" @click="jump(item)">more</button>
              </div>
            </div>
          </li>
        </ul>
        <el-pagination
          v-show="dataList && dataList.length"
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
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb";
import { getInfoList } from "@/api/index";

export default {
  components: { Breadcrumb },
  data() {
    return {
      page: 1,
      limit: 3,
      total: 0,
      dataList: [],
    };
  },
  created() {
    this.getInfoList();
  },
  methods: {
    getInfoList() {
      getInfoList({ page: this.page, limit: this.limit }).then((res) => {
        this.dataList = res.data?.list;
        this.total = res.data?.total;
      });
    },
    handleCurrentChange(page) {
      this.page = page;
      this.getInfoList();
    },
    jump(item) {
      this.$router.push({ name: "news_detail", query: { id: item.id } });
    },
  },
};
</script>

<style scoped>
/* 来自 chunk-96f993c4.507aa0c0.css，已去掉公共 breadcrumb 部分 */
@media (max-width: 768px) {
  .new_center {
    padding: 10px !important;
  }
  .new_item {
    flex-direction: column;
  }
  .new_item_l,
  .new_item_r {
    width: 100% !important;
  }
}
.new_warp {
  margin-top: 80px;
}
.new_container .el-pagination {
  text-align: center;
  margin-top: 20px;
  margin-bottom: 100px;
}
.new_container .el-pagination .btn-next:disabled,
.new_container .el-pagination .btn-prev:disabled {
  background: #fff;
}
.new_container .el-pagination .btn-next:disabled i,
.new_container .el-pagination .btn-prev:disabled i {
  color: #c0c4cc;
}
.new_container .el-pagination button {
  width: 28px;
  height: 28px;
}
.new_container .el-pagination button .el-icon {
  font-size: 16px;
}
.new_container .el-pagination .active,
.new_container .el-pagination .el-pager li:hover {
  color: #fff !important;
  background-color: #000 !important;
}
.new_center .new_list {
  padding: 10px;
  margin-bottom: 20px;
  list-style-type: none;
}
.new_center .new_item {
  display: flex;
  background: #fff;
}
.new_center .new_item_l {
  width: 25%;
  padding: 30px;
  align-items: flex-start;
  min-height: 256px;
  background: hsla(0, 0%, 74.9%, 0.2);
}
.new_center .new_item_l img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  vertical-align: initial;
}
.new_center .new_item_r {
  flex: 1;
  padding: 20px 60px 20px 40px;
}
.new_center .new_item_r .new_item_news {
  position: relative;
  padding-left: 8px;
}
.new_center .new_item_r .new_item_news:after {
  content: "";
  width: 1px;
  height: 21px;
  background-color: #000;
  display: inline-block;
  left: 0;
  position: absolute;
}
.new_center .new_item_r .new_item_r_tit {
  text-align: left;
  font-size: 22px;
  margin-top: 17px !important;
  padding: 5px 0;
}
.new_center .new_item_r .new_item_r_desc {
  padding: 5px 0;
  color: grey;
  margin-bottom: 20px !important;
}
.new_center .new_item_r .new_item_r_btn {
  font-size: 14px;
  color: #fff;
  background: #000;
  border: 1px solid #000;
  padding: 2px 15px;
}
.new_center .new_item_r .new_item_r_btn:hover {
  color: #333;
  background: #fff;
}
</style>
