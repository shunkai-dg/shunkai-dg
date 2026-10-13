/**
 * 滚动锁：全屏浮层（移动端抽屉、弹窗）打开时禁止背景页面滚动
 * ---------------------------------------------------------------
 * 只把 body 设为 overflow:hidden 在移动端 Safari 上不可靠（仍会被拖动），
 * 因此用 position:fixed + 记录/还原滚动位置的方式锁死页面：
 *   锁定时 body 离开文档流，页面滚动位置由 body 的 top 偏移保留，
 *   解锁时再把 window 滚回原位，视觉上不会跳动。
 *
 * 用法：
 *   import scrollLock from "@/utils/scrollLock";
 *   mixins: [scrollLock],
 *   watch: { isOpen(v) { v ? this.lockScroll() : this.unlockScroll(); } },
 *   beforeDestroy() { this.unlockScroll(); }
 */
export default {
  data() {
    return {
      // 锁定前的页面滚动位置（-1 表示当前未锁定）
      scrollLockY: -1,
    };
  },
  beforeDestroy() {
    this.unlockScroll();
  },
  methods: {
    /** 锁定背景页面滚动 */
    lockScroll() {
      if (this.scrollLockY !== -1) return;
      const y =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
      this.scrollLockY = y;
      // 记录在 <html> 上，保留 window 自己的 .scrollTop
      document.documentElement.style.setProperty("--scroll-lock-y", -y + "px");
      document.documentElement.classList.add("is-scroll-locked");
      // 布局被锁定的瞬间把窗口位置归零，避免出现空白
      window.scrollTo(0, 0);
      // 浏览器前进/后退会自行还原滚动位置，这里同步回来，解锁时才能回到正确位置
      window.addEventListener("popstate", this.syncScrollLockY);
      window.addEventListener("hashchange", this.syncScrollLockY);
    },

    /** 解除锁定并还原到原来的滚动位置 */
    unlockScroll() {
      if (this.scrollLockY === -1) return;
      const y = this.scrollLockY;
      this.scrollLockY = -1;
      document.documentElement.classList.remove("is-scroll-locked");
      document.documentElement.style.removeProperty("--scroll-lock-y");
      window.removeEventListener("popstate", this.syncScrollLockY);
      window.removeEventListener("hashchange", this.syncScrollLockY);
      window.scrollTo(0, y);
    },

    /** 锁定期间窗口位置被浏览器改变（前进/后退）时，同步记录值 */
    syncScrollLockY() {
      if (this.scrollLockY === -1) return;
      this.scrollLockY =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
    },
  },
};
