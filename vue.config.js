const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ]
})

module.exports = {
  devServer: {
        proxy: 'http://127.0.0.1:5000'
      },

  transpileDependencies: [
    'vuetify'
  ]
}
