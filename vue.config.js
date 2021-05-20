const registerRouter = require('./backend/router')

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        // variableとmixinをグローバルに導入
        additionalData: `@import "@/assets/scss/variable.scss";
        @import "@/assets/scss/mixin.scss";`
      }
    }
  },
  devServer: {
    before (app) {
      registerRouter(app)
    }
  }
}
