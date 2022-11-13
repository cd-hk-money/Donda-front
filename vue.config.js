module.exports = {
  devServer: {
        proxy: 'http://127.0.0.1:8000',
        hot: true,
        host: '0.0.0.0',
        port:3000        
      },

  transpileDependencies: [ 
    'vuetify' 
  ]
}
 