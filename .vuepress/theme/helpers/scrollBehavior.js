/**
 * 覆盖 smooth-scroll 插件的 scrollBehavior：其使用 querySelector(to.hash)，
 * 当 hash 为 URL 编码（如 %E5%8F%98）时会抛错或匹配失败，导致整页异常/空白。
 * 使用 decodeURIComponent + getElementById 安全定位标题。
 */
export function installSafeScrollBehavior (router, Vue) {
  if (typeof window === 'undefined') return

  const previous = router.options.scrollBehavior

  router.options.scrollBehavior = (to, from, savedPosition) => {
    if (to.hash) {
      try {
        const raw = to.hash.replace(/^#/, '')
        const id = decodeURIComponent(raw)

        const scrollToEl = (el) => {
          if (Vue.$vuepress && Vue.$vuepress.$get && Vue.$vuepress.$get('disableScrollBehavior')) {
            return
          }
          const navbar = document.querySelector('.navbar')
          const offset = (navbar && navbar.offsetHeight) || 56
          const top = el.getBoundingClientRect().top + window.pageYOffset - offset - 8
          window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
        }

        const findEl = () => {
          let el = document.getElementById(id)
          if (!el && /^\d/.test(id)) {
            el = document.getElementById('_' + id)
          }
          return el
        }

        // 带锚点直达时，正文可能尚未挂载完成，重试一段时间再放弃
        return new Promise((resolve) => {
          let attempt = 0
          const maxAttempts = 40
          const tick = () => {
            const el = findEl()
            if (el) {
              scrollToEl(el)
              resolve()
              return
            }
            if (attempt++ < maxAttempts) {
              setTimeout(tick, 50)
            } else {
              if (typeof previous === 'function') {
                try {
                  previous(to, from, savedPosition)
                } catch (e) {
                  console.warn('[theme] previous scrollBehavior failed:', e)
                }
              }
              resolve()
            }
          }
          requestAnimationFrame(tick)
        })
      } catch (e) {
        console.warn('[theme] scroll to hash failed:', e)
      }
      return
    }

    if (typeof previous === 'function') {
      try {
        return previous(to, from, savedPosition)
      } catch (e) {
        console.warn('[theme] previous scrollBehavior failed:', e)
      }
    }

    if (savedPosition) {
      window.scrollTo({ top: savedPosition.y, behavior: 'smooth' })
      return
    }
    if (!to.hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
}
