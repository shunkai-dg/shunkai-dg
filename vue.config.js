const path = require('path')

module.exports = {
  // 产物使用相对路径：hash 路由下文档地址恒为 index.html，相对路径对
  // 「根域名部署」与「GitHub Pages 项目页 /<repo>/ 子目录部署」都成立。
  // （原先写死 '/' 时，项目页会去 /js/app.js 取资源导致 404；
  //   img_data 静态资源前缀由 src/utils/resource.js 按 pathname 另行处理。）
  publicPath: './',
  productionSourceMap: false,
  // css.extract: true（cli-service 默认即为 true，显式声明与原产物一致）
  css: { extract: true },
  devServer: {
    port: 8080,
    // 开发环境静态托管 src/assets/img_data（本地 JSON 数据所用占位图）
    before (app) {
      const express = require('express')
      app.use(
        '/img_data',
        express.static(path.resolve(__dirname, 'src/assets/img_data'))
      )
    },
    proxy: {
      '/api': {
        // target: 'https://www.shunkai-dg.cn',
        target: 'http://127.0.0.1:8080/',
        changeOrigin: true
      }
    }
  },
  chainWebpack: config => {
    // svg-sprite-loader：src/assets/icons/svg 下的 svg 编译为 sprite symbol
    config.module
      .rule('svg')
      .exclude.add(path.resolve(__dirname, 'src/assets/icons/svg'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(path.resolve(__dirname, 'src/assets/icons/svg'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({ symbolId: 'icon-[name]' })
      .end()
    // 构建时把 src/assets/img_data 原样复制到 dist/img_data，供 RESOURCE_BASE_URL 拼接访问
    config.plugin('copy').tap(args => {
      args[0].push({
        from: path.resolve(__dirname, 'src/assets/img_data'),
        to: 'img_data',
        toType: 'dir'
      })
      return args
    })
  }
}
