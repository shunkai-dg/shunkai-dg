<template>
  <div>
    <Breadcrumb />
    <div class="contact_us_warp warp">
      <div class="contact_us_container container">
        <div class="askatek-title">
          <p>Contact Us</p>
        </div>
        <div class="contact_us_content">
          <ul class="contact_us_content_tab">
            <li
              v-for="(item, index) in tabs"
              :key="index"
              class="contact_us_content_item"
            >
              <div class="contact_us_content_item_content">
                <div class="contact_us_content_img">
                  <img :src="item.icon" alt="" />
                </div>
                <div class="contact_us_content_text">
                  <p class="contact_us_content-tit">{{ item.title }}</p>
                  <p class="contact_us_content-desc">{{ item.desc }}</p>
                </div>
              </div>
            </li>
          </ul>
          <ul class="contact_us_content_tab">
            <li
              v-for="(item, index) in tabs1"
              :key="index"
              class="contact_us_content_item"
            >
              <div class="contact_us_content_item_content">
                <div class="contact_us_content_img">
                  <img :src="item.icon" alt="" />
                </div>
                <div class="contact_us_content_text">
                  <p class="contact_us_content-tit">{{ item.title }}</p>
                  <p class="contact_us_content-desc1">{{ item.desc }}</p>
                </div>
              </div>
            </li>
          </ul>
          <div class="contact_us_content_info">
            <el-row :gutter="24">
              <el-col :span="12">
                <div class="contact_us_content_map">
                  <baidu-map
                    class="map-view"
                    style="display: flex; flex-direction: column"
                    :center="markerPoint"
                    :zoom="mapZoom"
                  >
                    <bm-geolocation
                      anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
                      :show-address-bar="true"
                      :auto-location="true"
                      @locationSuccess="locationSuccess"
                    />
                    <bm-marker
                      :position="markerPoint"
                      :dragging="true"
                      @mouseup="infoWindowOpen"
                    >
                      <bm-info-window
                        style="font-size: 13px"
                        :show="show"
                        @close="infoWindowClose"
                        @open="infoWindowOpen"
                      >
                        <p>aska</p>
                        <p>Tel:86.769.8989.0808</p>
                        <p style="word-wrap: break-word; max-width: 300px">
                          No.5 Puxin Road, Keyuancheng Industrial Park，Tangxia
                          Town, Dongguan, Guangdong, PRC 523718
                        </p>
                      </bm-info-window>
                    </bm-marker>
                    <bm-navigation
                      anchor="BMAP_ANCHOR_TOP_RIGHT"
                      class="navigation"
                    />
                  </baidu-map>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="contact_us_content_form">
                  <div class="contact_us_content_title">
                    Please rest assured that we will not disclose your
                    information
                  </div>
                  <el-form
                    ref="ruleForm"
                    class="demo-ruleForm"
                    :model="ruleForm"
                    :rules="rules"
                    label-width="0px"
                  >
                    <el-form-item label="" prop="name">
                      <el-input
                        v-model="ruleForm.name"
                        placeholder="Please enter your name"
                        autocomplete="off"
                        ,
                        maxlength="50"
                        show-word-limit
                        clearable
                      />
                    </el-form-item>
                    <el-form-item label="" prop="mobile">
                      <el-input
                        v-model="ruleForm.mobile"
                        placeholder="Please enter your mobile number"
                        autocomplete="off"
                        maxlength="20"
                        clearable
                        @input="
                          ruleForm.mobile = ruleForm.mobile.replace(
                            /[^\d+\-\s()]/g,
                            '',
                          )
                        "
                      />
                    </el-form-item>
                    <el-form-item label="" prop="email">
                      <el-input
                        v-model="ruleForm.email"
                        placeholder="Please enter email address"
                        maxlength="100"
                        clearable
                      />
                    </el-form-item>
                    <el-form-item label="" prop="content">
                      <el-input
                        v-model="ruleForm.content"
                        type="textarea"
                        placeholder="Please enter the content"
                        maxlength="500"
                        show-word-limit
                        :autosize="{ minRows: 4, maxRows: 8 }"
                      />
                    </el-form-item>
                    <el-form-item>
                      <el-button
                        class="contact_us_content_submit"
                        type="primary"
                        :loading="submitting"
                        :disabled="submitting"
                        @click="submitForm('ruleForm')"
                      >
                        {{ submitting ? "Submitting..." : "Submit" }}
                      </el-button>
                    </el-form-item>
                  </el-form>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb";
import { setInfoContact } from "@/api/index";

export default {
  components: { Breadcrumb },
  data() {
    const validateMobile = (rule, value, callback) => {
      if (!value) {
        callback(new Error("Please enter your mobile number"));
      } else if (!/^[\d+\-\s()]{6,20}$/.test(value)) {
        callback(new Error("Please enter a valid mobile number"));
      } else {
        callback();
      }
    };

    // 邮箱校验：非必填，填了才校验格式
    const validateEmail = (rule, value, callback) => {
      if (!value) {
        callback();
      } else if (!/^[\w.+-]+@[\w-]+(\.[\w-]+)+$/.test(value)) {
        callback(new Error("Please enter a valid email address"));
      } else {
        callback();
      }
    };

    return {
      center: { lng: 114.059284, lat: 22.798283 },
      mapZoom: 17,
      markerPoint: { lng: 114.059284, lat: 22.798283 },
      show: false,
      submitting: false,
      ruleForm: { name: "", email: "", mobile: "", content: "" },
      rules: {
        name: [
          {
            required: true,
            message: "Please enter your name",
            trigger: "blur",
          },
          {
            min: 2,
            max: 50,
            message: "Name should be 2 to 50 characters",
            trigger: "blur",
          },
        ],
        mobile: [
          { required: true, validator: validateMobile, trigger: "blur" },
        ],
        email: [{ validator: validateEmail, trigger: "blur" }],
        content: [
          {
            required: true,
            message: "Please enter the content",
            trigger: "blur",
          },
          {
            min: 5,
            max: 500,
            message: "Content should be 5 to 500 characters",
            trigger: "blur",
          },
        ],
        content: "",
      },
      picturUrl: "",
      tabs: [
        {
          icon: require("@/assets/img/CU1.png"),
          title: "Company Address（China）",
          desc: "No.5 Puxin Road, Keyuancheng Industrial Park，Tangxia Town, Dongguan, Guangdong, PRC 523718",
        },
        {
          icon: require("@/assets/img/CU2.png"),
          title: "Telephone",
          desc: "+86.769.8989.0808",
        },
        {
          icon: require("@/assets/img/CU3.png"),
          title: "Mailbox",
          desc: "sales@askatek.cn",
        },
      ],
      tabs1: [
        {
          icon: require("@/assets/img/CU4.png"),
          title: "Company Address（Singapore）",
          desc: "12 Tannery Road #10-01 HB Centre 1 Singapore 347722 ",
        },
        {
          icon: require("@/assets/img/CU5.png"),
          title: "Mailbox",
          desc: "sales@askatek.cn",
        },
        { icon: "", title: "", desc: "" },
      ],
    };
  },
  methods: {
    // 居中反馈弹窗，必须点击确认才关闭
    showAlert(message, type = "info", title = "Tips") {
      return this.$alert(message, title, {
        type,
        center: true,
        confirmButtonText: "OK",
        closeOnClickModal: false,
        closeOnPressEscape: false,
        closeOnHashChange: false,
        showClose: false,
        customClass: "contact-alert",
      }).catch(() => {});
    },

    submitForm() {
      if (this.submitting) return;

      this.$refs["ruleForm"].validate((valid) => {
        if (!valid) {
          this.showAlert(
            "Please complete the required fields correctly.",
            "warning",
            "Incomplete Information",
          );
          return;
        }

        this.submitting = true;

        setInfoContact(this.ruleForm)
          .then((res) => {
            if (res && res.code === 40000) {
              this.$refs.ruleForm.resetFields();
              this.showAlert(
                "Submitted successfully. We will contact you as soon as possible.",
                "success",
                "Success",
              );
            } else {
              this.showAlert(
                (res && res.message) ||
                  "Submission failed, please try again later.",
                "error",
                "Failed",
              );
            }
          })
          .catch((err) => {
            console.error("submit error:", err);
            this.showAlert(
              "Network error, please try again later.",
              "error",
              "Failed",
            );
          })
          .finally(() => {
            this.submitting = false;
          });
      });
    }, // <-- 这里必须有逗号

    locationSuccess(point, AddressComponent, marker) {
      console.log("定位成功");
      console.log(point, "point");
      console.log(AddressComponent, "---AddressComponent");
      console.log(marker, "---marker");
    },

    handler({ BMap, map }) {
      this.center.lng = 114.053332;
      this.center.lat = 2.805705;
      this.zoom = 17;
    },

    infoWindowClose() {
      this.show = false;
    },

    infoWindowOpen() {
      this.show = true;
    },
  },
};
</script>

<style scoped>
/* 来自 chunk-22e2453f.0dbdd28c.css，已去掉公共 breadcrumb 部分 */
@media (max-width: 768px) {
  .contact_us_content_tab {
    flex-direction: column;
  }
  .contact_us_content_tab .contact_us_content_item {
    padding: 10px !important;
  }
  .contact_us_container {
    padding: 0 15px;
  }
  .contact_us_content_info {
    display: flex;
    flex-direction: column;
  }
  .contact_us_content_info .el-row {
    margin: 0 !important;
  }
  .contact_us_content_info .el-col-12 {
    width: 100%;
    padding: 0 !important;
  }
}
.contact_us_content_tab {
  display: flex;
}
.contact_us_content_tab .contact_us_content_item {
  flex: 1;
  display: flex;
  padding: 23px;
  position: relative;
}
.contact_us_content_tab .contact_us_content_item .contact_us_content_img {
  width: 55px;
  display: flex;
  align-items: center;
  padding-right: 10px;
}
.contact_us_content_tab .contact_us_content_item .contact_us_content_img img {
  width: 100%;
}
.contact_us_content_tab .contact_us_content_item .contact_us_content-tit {
  color: #333;
  font-size: 17px;
  line-height: 1.5;
  text-align: inherit;
  font-weight: 700;
}
.contact_us_content_tab .contact_us_content_item .contact_us_content-desc1,
.contact_us_content_tab .contact_us_content_item .contact_us_content-desc {
  margin-top: 7px;
  color: #999;
  font-size: 13px;
  line-height: 1.5;
  text-align: inherit;
  word-wrap: break-word;
  overflow: hidden;
}
.contact_us_content_tab
  .contact_us_content_item:first-child
  .contact_us_content-desc1:after {
  content: "                                                        ";
  white-space: pre;
}
.contact_us_content_tab
  .contact_us_content_item:first-child
  .contact_us_content_img {
  width: 104px;
}
.contact_us_content_tab .contact_us_content_item_content {
  display: flex;
  flex-direction: row;
  flex: 1;
}
.contact_us_content_item_ {
  padding: 5px 0;
  text-align: left;
  font-size: 25px;
}
.contact_us_content_info {
  background: #fff;
  margin-top: 30px;
  margin-bottom: 60px;
}
.contact_us_content_info .contact_us_content_map {
  height: 500px;
}
.contact_us_content_info .contact_us_content_map .map-view,
.contact_us_content_info .contact_us_content_map .map {
  height: 100%;
}
.contact_us_content_info .contact_us_content_form {
  padding: 20px;
}
.contact_us_content_info .contact_us_content_form .contact_us_content_title {
  margin: 30px 0 37px 0;
}
.contact_us_content_info .contact_us_content_form .contact_us_content_submit {
  background-color: #000;
  color: #fff;
  font-size: 14px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  padding: 12px 40px;
}
.contact_us_content_info .contact_us_content_form .el-input__inner {
  padding: 12px 15px;
  height: 46px;
  line-height: 1.5;
}
.contact_us_content_info .contact_us_content_form .el-input__inner,
.contact_us_content_info .contact_us_content_form .el-textarea__inner {
  font-size: 14px;
  background-color: #f8f8f8;
  color: #666;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
}
.contact-alert {
  width: 420px;
  border-radius: 8px;
}
.contact-alert .el-message-box__header {
  padding-top: 22px;
}
.contact-alert .el-message-box__title {
  font-size: 16px;
  font-weight: 700;
  color: #333;
}
.contact-alert .el-message-box__content {
  padding: 20px 24px 24px;
}
.contact-alert .el-message-box__btns {
  padding: 0 24px 22px;
}
.contact-alert .el-button--primary {
  background-color: #000;
  border-color: #000;
  padding: 10px 28px;
  border-radius: 4px;
}
.contact-alert .el-button--primary:hover {
  background-color: #333;
  border-color: #333;
}
</style>
