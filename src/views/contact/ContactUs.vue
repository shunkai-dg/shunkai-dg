<template>
  <div>
    <Breadcrumb />
    <div class="contact_us_warp warp">
      <div class="contact_us_container container">
        <div class="askatek-title">
          <p>{{ $t("contact.title") }}</p>
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
                        <p>{{ $t("common.brand.name") }}</p>
                        <p>{{ $t("contact.map.tel") }}</p>
                        <p style="word-wrap: break-word; max-width: 300px">
                          {{ $t("contact.info.chinaAddress") }}
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
                    {{ $t("contact.form.notice") }}
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
                        :placeholder="$t('contact.form.name')"
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
                        :placeholder="$t('contact.form.mobile')"
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
                        :placeholder="$t('contact.form.email')"
                        maxlength="100"
                        clearable
                      />
                    </el-form-item>
                    <el-form-item label="" prop="content">
                      <el-input
                        v-model="ruleForm.content"
                        type="textarea"
                        :placeholder="$t('contact.form.content')"
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
                        {{
                          submitting
                            ? $t("contact.form.submitting")
                            : $t("common.submit")
                        }}
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
    return {
      center: { lng: 114.059284, lat: 22.798283 },
      mapZoom: 17,
      markerPoint: { lng: 114.059284, lat: 22.798283 },
      show: false,
      submitting: false,
      ruleForm: { name: "", email: "", mobile: "", content: "" },
      picturUrl: "",
    };
  },
  computed: {
    // 校验规则依赖当前语言，放入 computed 以便切换语言时同步生效
    rules() {
      const validateMobile = (rule, value, callback) => {
        if (!value) {
          callback(new Error(this.$t("contact.form.mobile")));
        } else if (!/^[\d+\-\s()]{6,20}$/.test(value)) {
          callback(new Error(this.$t("contact.form.mobileInvalid")));
        } else {
          callback();
        }
      };

      // 邮箱校验：非必填，填了才校验格式
      const validateEmail = (rule, value, callback) => {
        if (!value) {
          callback();
        } else if (!/^[\w.+-]+@[\w-]+(\.[\w-]+)+$/.test(value)) {
          callback(new Error(this.$t("contact.form.emailInvalid")));
        } else {
          callback();
        }
      };

      return {
        name: [
          {
            required: true,
            message: this.$t("contact.form.name"),
            trigger: "blur",
          },
          {
            min: 2,
            max: 50,
            message: this.$t("contact.form.nameLength"),
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
            message: this.$t("contact.form.content"),
            trigger: "blur",
          },
          {
            min: 5,
            max: 500,
            message: this.$t("contact.form.contentLength"),
            trigger: "blur",
          },
        ],
        // 保持原有行为：同名字段 content 覆盖了上面的校验数组
        content: "",
      };
    },
    tabs() {
      return [
        {
          icon: require("@/assets/img/Contact Us1.png"),
          title: this.$t("contact.info.chinaAddressTitle"),
          desc: this.$t("contact.info.chinaAddress"),
        },
        {
          icon: require("@/assets/img/Contact Us2.png"),
          title: this.$t("contact.info.telephoneTitle"),
          desc: this.$t("contact.info.telephone"),
        },
        {
          icon: require("@/assets/img/Contact Us3.png"),
          title: this.$t("contact.info.mailboxTitle"),
          desc: this.$t("contact.info.mailbox"),
        },
      ];
    },
    tabs1() {
      return [
        {
          icon: require("@/assets/img/Contact Us4.png"),
          title: this.$t("contact.info.singaporeAddressTitle"),
          desc: this.$t("contact.info.singaporeAddress"),
        },
        {
          icon: require("@/assets/img/Contact Us5.png"),
          title: this.$t("contact.info.mailboxTitle"),
          desc: this.$t("contact.info.mailbox"),
        },
        { icon: "", title: "", desc: "" },
      ];
    },
  },
  methods: {
    // 居中反馈弹窗，必须点击确认才关闭
    showAlert(message, type = "info", title = this.$t("contact.alert.tips")) {
      return this.$alert(message, title, {
        type,
        center: true,
        confirmButtonText: this.$t("common.confirm"),
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
            this.$t("contact.alert.incomplete"),
            "warning",
            this.$t("contact.alert.incompleteTitle"),
          );
          return;
        }

        this.submitting = true;

        setInfoContact(this.ruleForm)
          .then((res) => {
            if (res && res.code === 40000) {
              this.$refs.ruleForm.resetFields();
              this.showAlert(
                this.$t("contact.alert.success"),
                "success",
                this.$t("contact.alert.successTitle"),
              );
            } else {
              this.showAlert(
                (res && res.message) || this.$t("contact.alert.failed"),
                "error",
                this.$t("contact.alert.failedTitle"),
              );
            }
          })
          .catch((err) => {
            console.error("submit error:", err);
            this.showAlert(
              this.$t("contact.alert.network"),
              "error",
              this.$t("contact.alert.failedTitle"),
            );
          })
          .finally(() => {
            this.submitting = false;
          });
      });
    }, 

    locationSuccess(point, AddressComponent, marker) {
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
  color: var(--text);
  font-size: 17px;
  line-height: 1.5;
  text-align: inherit;
  font-weight: 700;
}
.contact_us_content_tab .contact_us_content_item .contact_us_content-desc1,
.contact_us_content_tab .contact_us_content_item .contact_us_content-desc {
  margin-top: 7px;
  color: var(--text-muted);
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
  background: var(--surface);
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
  background-color: var(--btn-bg);
  color: var(--btn-text);
  font-size: 14px;
  border: 1px solid var(--border);
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
  background-color: var(--bg-soft);
  color: var(--text-muted);
  border: 1px solid var(--border);
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
  color: var(--text);
}
.contact-alert .el-message-box__content {
  padding: 20px 24px 24px;
}
.contact-alert .el-message-box__btns {
  padding: 0 24px 22px;
}
.contact-alert .el-button--primary {
  background-color: var(--btn-bg);
  border-color: var(--btn-bg);
  padding: 10px 28px;
  border-radius: 4px;
}
.contact-alert .el-button--primary:hover {
  background-color: var(--accent-strong);
  border-color: var(--accent-strong);
}
</style>
