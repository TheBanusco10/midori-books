const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pwa: {
    name: 'Midori books',
    themeColor: '#059669',
    msTileColor: '#000000',
    iconPaths: {
      msTileImage: 'img/icons/mstile-150x150.png'
    },
    manifestOptions: {
      start_url: '/'
    }
  },
})
