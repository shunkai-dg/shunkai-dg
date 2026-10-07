<template>
  <div class="askatek-first-picture">
    <Breadcrumb />
    <div class="join-wrap warp">
      <div class="join-container container">
        <div class="askatek-title">
          <p>Join Us</p>
        </div>
        <div class="join-table">
          <div class="join-table-header">
            <ul>
              <li
                v-for="(header, index) in tableHeaders"
                :key="index"
                :class="'join-table_td_' + index"
              >
                <span class="grid-content bg-purple">{{ header.label }}</span>
              </li>
            </ul>
          </div>
          <div class="join-table-body">
            <ul>
              <li
                v-for="(item, index) in tableData"
                :key="index"
                @click="jump(item)"
              >
                <div class="join-table_td_0">{{ item.department }}</div>
                <div class="join-table_td_1">{{ item.position }}</div>
                <div class="join-table_td_2">{{ item.quantity }}</div>
                <div class="join-table_td_3">
                  Job Details
                  <b-icon-arrow-right />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb";
import { seoList } from "@/api/index";

export default {
  components: { Breadcrumb },
  data() {
    return {
      picturUrl: "",
      tableHeaders: [
        { key: "department", label: "Department", span: "3" },
        { key: "position", label: "Position", span: "4" },
        { key: "quantity", label: "quantity", span: "1" },
        { key: "operation", label: "Job Details", span: "4" },
      ],
      tableData: [],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      seoList({ page: 1, limit: 15 }).then((res) => {
        this.tableData = res.data.list;
      });
    },
    jump(item) {
      this.$router.push({
        name: "join_us_details",
        query: { id: item.id },
        params: { ...item },
      });
    },
  },
};
</script>

<style scoped>
/* 来自 chunk-33d4f297.5b1c3455.css，已去掉公共 breadcrumb 部分 */
@media (min-width: 768px) {
  .join-container {
    padding: 0 15px;
  }
}
@media (max-width: 767px) {
  .join-wrap {
    padding: 0 10px;
  }
  .join-table_td_0,
  .join-table_td_2 {
    display: none;
  }
  .join-table_td_1,
  .join-table_td_3 {
    width: 50% !important;
  }
}
.join-wrap {
  position: relative;
  display: flex;
  justify-content: center;
  text-align: left;
  background: #f8f8f8;
}
.join-wrap .join-container {
  display: flex;
  justify-content: right;
  flex-direction: column;
}
.join-wrap .join-container .askatek-title {
  height: 56px;
  line-height: 56px;
  color: #000;
  font-size: 30px;
  font-weight: 700;
  position: relative;
}
.join-wrap .join-container .askatek-title:after {
  content: "";
  width: 60px;
  height: 2px;
  background-color: #094b7c;
  display: inline-block;
  bottom: 0;
  position: absolute;
}
.join-table {
  width: 100%;
  margin: 30px 0 40px 0;
}
.join-table .join-table-header {
  background: #000;
  border: 0 solid #000;
  padding: 0 20px;
  border-radius: 8px 8px 0 0;
  height: 44px;
  align-items: center;
  display: flex;
}
.join-table .join-table-header ul {
  list-style: none;
  width: 100%;
  margin: 0 !important;
  align-items: center;
  display: flex;
}
.join-table .join-table-header ul li {
  color: #fff;
  padding: 0 15px;
}
.join-table .join-table-header ul li span {
  padding: 5px 0;
  color: #fff;
  font-size: 16px;
}
.join-table .join-table-header ul .join-table_td_3 {
  font-size: 16px;
  font-weight: 400 !important;
}
.join-table .join-table-body ul {
  width: 100%;
}
.join-table .join-table-body ul li {
  cursor: pointer;
  display: flex;
  height: 38px;
  background: #fff;
  padding: 0 20px;
  align-items: center;
  margin-bottom: 5px;
}
.join-table .join-table-body ul li div {
  padding: 0 15px;
  color: #000;
  font-weight: 400;
}
.join-table .join-table_td_0,
.join-table .join-table_td_3 {
  width: 30%;
}
.join-table .join-table_td_3 {
  text-align: center;
  color: #606266 !important;
  font-weight: 500 !important;
}
.join-table .join-table_td_3 svg {
  color: #000;
}
.join-table .join-table_td_3:hover {
  color: #006bba !important;
}
.join-table .join-table_td_1 {
  width: 33.33333%;
}
.join-table .join-table_td_2 {
  width: 10.33333%;
}
</style>
