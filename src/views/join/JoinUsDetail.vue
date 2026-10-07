<template>
  <div class="join-detail">
    <Breadcrumb />
    <div class="join-detail-wrap warp">
      <div class="join-detail-container container">
        <div class="join-detail-wrapper-l">
          <p>work</p>
          <p>{{ detailData.department }}</p>
          <div>Salary Negotiable</div>
          <button @click="jump">Return</button>
        </div>
        <div class="join-detail-wrapper-r">
          <div class="join-detail-wrapper-text" v-html="detailData.descr"></div>
          <div class="company-join">
            aska Electronics. Co., Ltd, a national high-tech enterprise, and was
            awarded the "contract abiding and trustworthy" enterprise in
            Guangdong Province. The company focuses on the R & D, production and
            sales of wireless intelligent audio products. Its main products
            include high-tech intelligent audio products such as ordinary
            Bluetooth wireless headset, intelligent noise reduction Bluetooth
            headset, special industry Bluetooth communication headset, E-sports
            wireless headset and intelligent wearable devices. The main sales
            markets are Europe, America, Japan, South Korea, Latin America,
            Southeast Asia and other global regions. The company is adjacent to
            Shenzhen and located in the beautiful Tangxia, Dongguan. The
            company's park environment is elegant, safe and comfortable, the
            annual orders are saturated, and the salary and grain are paid on
            time.
          </div>
          <div class="join-detail-return">
            <button @click="jump">Return</button>
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
      detailData: {},
    };
  },
  created() {
    if (JSON.stringify(this.$route.params) !== "{}") {
      this.detailData = this.$route.params;
    }
    this.getList();
  },
  methods: {
    getList() {
      seoList({ page: 1, limit: 15 }).then((res) => {
        this.detailData = res.data.list[Number(this.$route.query.id)];
      });
    },
    jump() {
      this.$router.push({ name: "join_us" });
    },
  },
};
</script>

<style scoped>
/* 来自 chunk-05213b46.0d2c9b82.css，已去掉公共 breadcrumb 部分 */
@media (min-width: 768px) and (max-width: 1199px) {
  .join-detail-wrap {
    padding: 0 15px;
  }
}
@media (min-width: 768px) {
  .join-detail-wrapper-r .join-detail-return {
    display: none;
  }
}
@media (max-width: 768px) {
  .join-detail-wrap {
    padding: 0 10px;
  }
  .join-detail-container {
    flex-direction: column !important;
  }
  .join-detail-wrapper-l button {
    display: none;
  }
  .join-detail-wrapper-r .join-detail-return {
    display: block;
  }
  .join-detail-wrapper-l,
  .join-detail-wrapper-r {
    width: 100% !important;
    padding: 0 15px !important;
  }
}
.join-detail .join-detail-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f8f8f8;
}
.join-detail .join-detail-wrap .join-detail-container {
  display: flex;
  flex-direction: row;
  padding: 0 20px;
}
.join-detail .join-detail-wrap .join-detail-container .join-detail-wrapper-l {
  width: 33.33333%;
  padding-top: 36px !important;
  text-align: left;
  padding: 0 15px;
}
.join-detail .join-detail-wrap .join-detail-container .join-detail-wrapper-l p {
  padding: 5px 0;
}
.join-detail
  .join-detail-wrap
  .join-detail-container
  .join-detail-wrapper-l
  div {
  padding: 5px 0;
  color: grey;
  margin-bottom: 60px;
}
.join-detail
  .join-detail-wrap
  .join-detail-container
  .join-detail-wrapper-l
  button {
  font-size: 14px;
  color: #094b7c;
  background: transparent;
  margin: 0 15px 0 0;
  border: 1px solid #094b7c;
  border-radius: 40px;
  padding: 12px 40px;
}
.join-detail
  .join-detail-wrap
  .join-detail-container
  .join-detail-wrapper-l
  p:first-child {
  text-align: left;
  color: #094b7c;
}
.join-detail
  .join-detail-wrap
  .join-detail-container
  .join-detail-wrapper-l
  p:nth-child(2) {
  font-size: 18px;
  margin-bottom: 10px !important;
}
.join-detail .join-detail-wrap .join-detail-container .join-detail-wrapper-r {
  flex: 1;
  padding: 40px;
  text-align: left;
}
.join-detail
  .join-detail-wrap
  .join-detail-container
  .join-detail-wrapper-r
  .join-detail-wrapper-text {
  height: 300px;
  overflow: scroll;
  overflow-x: hidden;
  padding: 15px 5px;
  background-color: #f8f8f8 !important;
}
.join-detail
  .join-detail-wrap
  .join-detail-container
  .join-detail-wrapper-r
  .join-detail-wrapper-text
  p {
  background-color: transparent !important;
  margin: 12px 0 !important;
}
.join-detail
  .join-detail-wrap
  .join-detail-container
  .join-detail-wrapper-r
  .company-join {
  color: #000;
  padding: 15px 10px;
  background: hsla(0, 0%, 50.2%, 0.21);
}
.join-detail
  .join-detail-wrap
  .join-detail-container
  .join-detail-wrapper-r
  .join-detail-return {
  width: 100%;
  text-align: center;
  margin: 60px 0;
}
.join-detail
  .join-detail-wrap
  .join-detail-container
  .join-detail-wrapper-r
  .join-detail-return
  button {
  font-size: 14px;
  color: #094b7c;
  background: transparent;
  margin: 0 15px 0 0;
  border: 1px solid #094b7c;
  border-radius: 40px;
  padding: 12px 40px;
}
</style>
