<template>
  <div class="pref-switch" :class="'pref-switch--' + variant">
    <span v-if="variant === 'drawer'" class="pref-switch__heading">{{
      $t("header.settings")
    }}</span>

    <!-- 语言：中文 / English / 跟随系统 -->
    <el-dropdown
      class="pref-switch__item"
      trigger="click"
      placement="bottom-end"
      @command="handleLocale"
    >
      <span
        class="pref-switch__trigger"
        :title="$t('header.languageLabel') + ': ' + localeLabel"
      >
        <svg
          class="pref-switch__icon"
          viewBox="0 0 24 24"
          width="16"
          height="16"
          aria-hidden="true"
        >
          <circle
            cx="12"
            cy="12"
            r="9"
            fill="none"
            stroke="currentColor"
            stroke-width="1.6"
          />
          <ellipse
            cx="12"
            cy="12"
            rx="4"
            ry="9"
            fill="none"
            stroke="currentColor"
            stroke-width="1.6"
          />
          <path
            d="M3.4 9h17.2M3.4 15h17.2"
            fill="none"
            stroke="currentColor"
            stroke-width="1.6"
          />
        </svg>
        <span v-if="variant === 'drawer'" class="pref-switch__text">{{
          localeLabel
        }}</span>
        <i class="el-icon-arrow-down pref-switch__caret"></i>
      </span>
      <el-dropdown-menu slot="dropdown" class="pref-switch__menu">
        <el-dropdown-item
          v-for="opt in localeOptions"
          :key="opt.value"
          :command="opt.value"
          :class="{ 'is-current': localeSetting === opt.value }"
        >
          {{ localeOptionLabel(opt) }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <!-- 主题：白天（太阳）/ 黑夜（月亮）/ 跟随系统 -->
    <el-dropdown
      class="pref-switch__item"
      trigger="click"
      placement="bottom-end"
      @command="handleTheme"
    >
      <span
        class="pref-switch__trigger"
        :title="$t('header.themeLabel') + ': ' + themeModeLabel"
      >
        <i class="pref-switch__icon" :class="themeIcon"></i>
        <span v-if="variant === 'drawer'" class="pref-switch__text">{{
          themeModeLabel
        }}</span>
        <i
          v-if="themeSetting === 'auto'"
          class="pref-switch__auto"
          :title="$t('common.theme.auto')"
          >A</i
        >
        <i class="el-icon-arrow-down pref-switch__caret"></i>
      </span>
      <el-dropdown-menu slot="dropdown" class="pref-switch__menu">
        <el-dropdown-item
          v-for="opt in themeOptions"
          :key="opt.value"
          :command="opt.value"
          :class="{ 'is-current': themeSetting === opt.value }"
        >
          <i :class="opt.icon"></i>
          {{ $t(opt.labelKey) }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
/**
 * 外观与语言切换控件（导航栏右侧 / 移动端抽屉共用）
 * - 语言：中文、English、跟随系统（vue-i18n@8，见 src/i18n/index.js）
 * - 主题：昼夜（白天浅蓝 / 黑夜深蓝 / 跟随系统，见 src/utils/theme.js）
 * 状态存于 Vuex（themeMode / localeSetting），持久化由两个 utils 负责。
 */
import {
  LOCALE_OPTIONS,
  LOCALE_AUTO,
  normalizeLocaleSetting,
  detectSystemLocale,
  LOCALE_ZH,
  LOCALE_EN,
} from "@/i18n";

const THEME_OPTIONS = [
  { value: "day", icon: "el-icon-sunny", labelKey: "common.theme.day" },
  { value: "night", icon: "el-icon-moon", labelKey: "common.theme.night" },
  { value: "auto", icon: "el-icon-moon-night", labelKey: "common.theme.auto" },
];

export default {
  name: "PreferenceSwitch",
  props: {
    variant: { type: String, default: "bar" }, // bar | drawer
  },
  data() {
    return {
      localeOptions: LOCALE_OPTIONS,
      themeOptions: THEME_OPTIONS,
      LOCALE_AUTO,
    };
  },
  computed: {
    localeSetting() {
      return normalizeLocaleSetting(this.$store.state.localeSetting);
    },
    themeSetting() {
      return this.$store.state.themeMode || "auto";
    },
    // 当前实际生效语言（跟随系统时展示系统语言）
    activeLocale() {
      return this.localeSetting === LOCALE_AUTO
        ? detectSystemLocale()
        : this.localeSetting;
    },
    localeLabel() {
      const active =
        this.activeLocale === LOCALE_ZH
          ? this.$t("common.lang.zh")
          : this.$t("common.lang.en");
      // 跟随系统时同时显示「实际生效语言 · 跟随系统」，避免看不出当前语言
      if (this.localeSetting === LOCALE_AUTO) {
        return active + " · " + this.$t("common.lang.auto");
      }
      return active;
    },
    // 图标跟随「实际生效」主题，即太阳/月亮双态
    resolvedTheme() {
      return this.$store.getters.resolvedTheme;
    },
    themeIcon() {
      return this.resolvedTheme === "night" ? "el-icon-moon" : "el-icon-sunny";
    },
    themeModeLabel() {
      const hit = THEME_OPTIONS.find((o) => o.value === this.themeSetting);
      return hit ? this.$t(hit.labelKey) : this.$t("common.theme.auto");
    },
  },
  methods: {
    localeOptionLabel(opt) {
      if (opt.value === LOCALE_AUTO) return this.$t("common.lang.auto");
      return opt.label;
    },
    handleLocale(setting) {
      if (setting === this.localeSetting) return;
      this.$store.dispatch("setLocaleSetting", setting);
    },
    handleTheme(mode) {
      if (mode === this.themeSetting) return;
      this.$store.dispatch("setThemeMode", mode);
    },
  },
};
</script>

<style scoped>
.pref-switch {
  display: flex;
  align-items: center;
}

.pref-switch__heading {
  display: block;
  width: 100%;
  text-align: left;
  font-size: 13px;
  letter-spacing: 0.04em;
  opacity: 0.7;
  padding: 4px 4px 8px;
}

.pref-switch__item {
  margin-left: 6px;
  line-height: 1;
}

.pref-switch__trigger {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  color: inherit;
  padding: 6px 8px;
  border-radius: 6px;
  transition:
    background-color 0.25s ease,
    color 0.25s ease;
}

.pref-switch__trigger:hover {
  background: var(--accent-soft);
  color: var(--accent);
}

.pref-switch__icon {
  font-size: 17px;
  line-height: 1;
  color: var(--accent);
}

svg.pref-switch__icon {
  display: block;
}

.pref-switch__caret {
  font-size: 11px;
  margin-left: 3px;
  opacity: 0.65;
}

.pref-switch__auto {
  font-style: normal;
  font-size: 9px;
  font-weight: 700;
  line-height: 1;
  margin-left: 2px;
  padding: 1px 3px;
  border-radius: 3px;
  background: var(--accent-soft);
  color: var(--accent);
  transform: translateY(-4px);
}

.pref-switch__text {
  margin-left: 6px;
  font-size: 13px;
}

/* 抽屉内：整行铺开，左右两个入口并排 */
.pref-switch--drawer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 12px 4px;
  border-bottom: 1px solid var(--border);
  color: var(--text);
}

.pref-switch--drawer .pref-switch__item {
  margin-left: 0;
  margin-right: 16px;
}

.pref-switch--drawer .pref-switch__trigger {
  padding: 6px 10px;
  border: 1px solid var(--border);
  background: var(--surface);
}
</style>
