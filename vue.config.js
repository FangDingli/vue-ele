const appData = require("./data.json")
const { seller, goods, ratings } = appData
const path = require("path")

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/vue-ele/' : '/',
  devServer: {
    port: 3000,
    before(app) {
      app.get("/api/seller", (request, response) => {
        response.json({
          errno: 0,
          data: seller
        })
      }),
        app.get("/api/goods", (request, response) => {
          response.json({
            errno: 0,
            data: goods
          })
        })
      app.get("/api/ratings", (request, response) => {
        response.json({
          errno: 0,
          data: ratings
        })
      })
    }
  },

  css: {
    sourceMap: true,
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ]
      }
    }
  },

  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  },

  chainWebpack(config) {
    config.resolve.alias.set("components", resolve("src/components")).set("common", resolve("src/common")).set("api", resolve("src/api"))
  }
}
