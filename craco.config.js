const path = require('path')

const resolve = pathname => path.resolve(__dirname, pathname)
module.exports = {
  devServer: {
    proxy: {
      '/api': 'http://localhost:3001',
    },
    port: 8000,
  },
  webpack: {
    alias: {
      '@': resolve('src'),
    },
  },
}
