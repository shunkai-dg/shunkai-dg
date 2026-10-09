<template>
  <div>
    <Breadcrumb />
    <div class="new_detail_warp warp">
      <div class="container">
        <div class="new_detail_title">
          <div class="tit">{{ getInfoDetail.title }}</div>
          <p class="new_detail_time">{{ getInfoDetail.push_at_str }}</p>
        </div>
        <div class="new_detail_center" v-html="getInfoDetail.content"></div>
        <div class="new_detail_page">
          <p>
            {{ $t('news.detail.prev') }}
            <span v-if="previous" class="text" @click="jump('previous')">{{
              previous.title
            }}</span>
            <span v-else>{{ $t('common.noData') }}</span>
          </p>
          <p>
            {{ $t('news.detail.next') }}
            <span v-if="next" class="text" @click="jump('next')">{{
              next.title
            }}</span>
            <span v-else>{{ $t('common.noData') }}</span>
          </p>
        </div>
        <div class="divide_line"></div>
        <div class="new_detail_btn">
          <button @click="jumpGo">{{ $t('news.detail.backToList') }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb";
import { getInfoView, getInfoList } from "@/api/index";

export default {
  inject: ["reload"],
  components: { Breadcrumb },
  data() {
    return {
      previous: {},
      next: {},
      dateView: {},
      getInfoDetail: {},
      dataList: [],
      index: 0,
    };
  },
  created() {
    this.getInfoView();
    this.getInfoList();
  },
  methods: {
    getInfoView() {
      getInfoView({ id: this.$route.query.id }).then((res) => {
        this.getInfoDetail = res.data;
      });
    },
    getInfoList() {
      getInfoList({ page: 1, limit: 15 }).then((res) => {
        const id = this.$route.query.id;
        const list = res.data.list;
        for (let i = 0; i < list.length; i++) {
          if (id === list[i].id || id === String(list[i].id)) {
            this.index = 0;
            this.previous = list[i - 1];
            this.next = list[i + 1];
            this.dateView = list[i];
          }
        }
        this.dataList = list;
      });
    },
    jump(type) {
      let id = "";
      if (type === "next") id = this.next.id;
      else if (type === "previous") id = this.previous.id;
      this.$router.push({ name: "news_detail", query: { id } });
      location.reload();
    },
    jumpGo() {
      this.$router.push({ name: "news" });
    },
  },
};
</script>

<style scoped>
/* 来自 chunk-fd4caf6c.65306cbc.css，已去掉公共 breadcrumb 部分 */
@media (max-width: 767px) {
  .new_detail_warp {
    padding: 0 8px;
  }
}
.new_detail_warp {
  margin-top: 60px;
}
.new_detail_title {
  display: flex;
  text-align: center;
  flex-direction: column;
}
.new_detail_title .tit {
  text-align: center;
  color: var(--text);
  font-size: 24px;
  line-height: 1.5;
  margin-bottom: 30px;
}
.new_detail_title .new_detail_time {
  text-align: center;
  color: var(--text-muted);
  font-family: Microsoft YaHei;
  font-size: 12px;
  line-height: 1.5;
  margin-bottom: 30px !important;
}
.new_detail_center {
  margin-bottom: 60px;
}
.new_detail_center p {
  text-align: left;
  color: var(--text);
  font-family: Microsoft YaHei;
  font-size: 16px;
  line-height: 1.8;
  /* 文字背景色等富文本内联样式放行，由 rich-content.css 统一控制 */
  background: transparent !important;
}
.new_detail_page {
  justify-content: space-between;
  line-height: 2.5;
  letter-spacing: 1px;
  color: var(--text);
  font-size: 14px;
  display: flex;
}
.new_detail_page p {
  display: flex;
}
.new_detail_page .text {
  cursor: pointer;
}
.new_detail_page span {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.divide_line {
  border-bottom: 1px solid var(--border);
  margin-top: 46px;
  margin-bottom: 46px;
}
.new_detail_btn {
  margin-top: 60px;
  text-align: center;
  margin-bottom: 100px;
}
.new_detail_btn button {
  font-size: 14px;
  color: var(--text-strong);
  background: transparent;
  border: 1px solid var(--btn-bg);
  padding: 9px 20px;
}
.new_detail_btn button:hover {
  color: var(--btn-text);
  background: var(--btn-bg);
}
</style>
