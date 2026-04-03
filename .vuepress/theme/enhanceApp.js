/* eslint-disable no-proto */
import postMixin from '@theme/mixins/posts'
import localMixin from '@theme/mixins/locales'
import { interceptRouterError, fixRouterError404 } from '@theme/helpers/other'
import { installSafeScrollBehavior } from './helpers/scrollBehavior'

export default ({
  Vue,
  siteData,
  isServer,
  router
}) => {
  Vue.mixin(postMixin)
  Vue.mixin(localMixin)
  // if (!isServer) {
  //   addScriptToHead('//kit.fontawesome.com/51b01de608.js')
  //   registerCodeThemeCss(siteData.themeConfig.codeTheme)
  // }

  interceptRouterError(router)
  fixRouterError404(router)

  // 在 smooth-scroll 等插件注册完 scrollBehavior 之后再覆盖（下一轮任务）
  if (!isServer) {
    setTimeout(() => {
      installSafeScrollBehavior(router, Vue)
    }, 0)
  }
}
