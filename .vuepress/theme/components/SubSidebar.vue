<script>
import { defineComponent, computed } from 'vue'
import { isActive } from '@theme/helpers/utils'
import { useInstance } from '@theme/helpers/composable'

export default defineComponent({
  setup (props, ctx) {
    const instance = useInstance()

    const headers = computed(() => {
      return instance.$showSubSideBar ? instance.$page.headers : []
    })

    const isLinkActive = (header) => {
      return isActive(instance.$route, instance.$page.path + '#' + header.slug)
    }

    return { headers, isLinkActive }
  },
  render (h) {
    return h('ul', {
      class: { 'sub-sidebar-wrapper': true },
      style: { width: this.headers.length > 0 ? '10.5rem' : '0' }
    }, [
      ...this.headers.map((header, index) => {
        return h('li', {
          key: header.slug || index,
          class: {
            active: this.isLinkActive(header),
            [`level-${header.level}`]: true
          }
        }, [
          // 仅用 hash 锚点，避免 router-link 与 $page.path / base 不一致导致跳错页空白
          h('a', {
            class: {
              'sub-sidebar-link': true,
              [`reco-side-${header.slug}`]: true
            },
            attrs: {
              href: '#' + header.slug
            },
            on: {
              click: (e) => {
                e.preventDefault()
                const path = this.$route.path
                const hash = '#' + header.slug
                if (this.$router) {
                  this.$router.replace({ path, hash }).catch(() => {})
                }
              }
            }
          }, header.title)
        ])
      })
    ])
  }
})
</script>

<style lang="stylus" scoped>
.sub-sidebar-wrapper
  width 10.5rem
  padding-left 0
  list-style none
  font-size 12px
  li
    padding 0.15rem 0
    cursor pointer
    border-left 1px solid rgba(15, 23, 42, 0.12)
    .sub-sidebar-link
      display block
      padding 0.35rem 0.5rem 0.35rem 0.35rem
      color var(--text-color-sub)
      font-size 12px
      line-height 1.45
      text-decoration none
      border-radius 6px
      background transparent
      transition color 0.15s ease, border-color 0.15s ease
    &:hover
      border-left-color rgba(13, 148, 136, 0.45)
      .sub-sidebar-link
        color $accentColor
    &.active
      border-left-color $accentColor
      .sub-sidebar-link
        color $accentColor
        font-weight 600
    &.level-1
      padding-left 0.2rem
    &.level-2
      padding-left 0.55rem
    &.level-3
      padding-left 1rem

.dark .sub-sidebar-wrapper li
  border-left-color rgba(255, 255, 255, 0.12)
</style>
