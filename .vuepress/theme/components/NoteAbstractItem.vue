<template>
  <div
    class="abstract-item"
    :class="{ 'abstract-item--sticky': item.frontmatter.sticky }"
    role="link"
    tabindex="0"
    @click="$router.push(item.path)"
    @keydown.enter="$router.push(item.path)"
  >
    <div class="abstract-item__header">
      <div class="title">
        <reco-icon v-if="item.frontmatter.keys" class="title__lock" icon="reco-lock" />
        <router-link :to="item.path" class="title__link" @click.native.stop>{{ item.title }}</router-link>
      </div>
    </div>

    <div
      v-if="hasTextExcerpt(item)"
      class="abstract abstract-item__excerpt"
      v-html="item.excerpt"
    />

    <PageInfo
      class="abstract-item__meta"
      :pageInfo="item"
      :currentTag="currentTag"
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { RecoIcon } from '@vuepress-reco/core/lib/components'
import PageInfo from './PageInfo'
export default defineComponent({
  components: { PageInfo, RecoIcon },
  props: ['item', 'currentPage', 'currentTag'],
  methods: {
    hasTextExcerpt (item) {
      if (!item || !item.excerpt) return false
      return item.excerpt.replace(/<[^>]+>/g, '').trim().length > 0
    }
  }
})
</script>

<style lang="stylus" scoped>
$card-radius = 14px

.abstract-item
  position relative
  display flex
  flex-direction column
  gap 0.65rem
  margin 0 auto 1.25rem
  padding 1.2rem 1.35rem 1.05rem
  width 100%
  box-sizing border-box
  // 置顶三角用伪元素画在卡内，hidden 可与圆角一致裁切，且不会出界
  overflow hidden
  border-radius $card-radius
  border 1px solid rgba(255, 255, 255, 0.65)
  background rgba(255, 255, 255, 0.94)
  backdrop-filter blur(10px) saturate(160%)
  box-shadow 0 4px 28px rgba(15, 23, 42, 0.1), 0 1px 3px rgba(15, 23, 42, 0.06)
  cursor pointer
  transition transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease
  > *
    pointer-events auto
  &:hover
    transform translateY(-3px)
    box-shadow 0 12px 40px rgba(15, 23, 42, 0.14), 0 4px 12px rgba(15, 23, 42, 0.08)
    border-color rgba(255, 255, 255, 0.85)
  &:focus-visible
    outline 2px solid $accentColor
    outline-offset 2px

// 置顶：右上直角三角（border）+ 三角区域内的白色向上小箭头（纯 CSS），避免用 RecoIcon + transform
$sticky-corner = 2.35rem

.abstract-item--sticky::before
  content ''
  position absolute
  top 0
  right 0
  z-index 1
  width 0
  height 0
  border-top $sticky-corner solid $accentColor
  border-left $sticky-corner solid transparent
  pointer-events none

.abstract-item--sticky::after
  content ''
  position absolute
  top 0.42rem
  right 0.4rem
  z-index 2
  width 0
  height 0
  border-left 0.32rem solid transparent
  border-right 0.32rem solid transparent
  border-bottom 0.48rem solid rgba(255, 255, 255, 0.96)
  filter drop-shadow(0 1px 0 rgba(15, 23, 42, 0.12))
  pointer-events none

.abstract-item--sticky .abstract-item__header
  padding-right 2.5rem

.dark .abstract-item--sticky::before
  border-top-color lighten($accentColor, 6%)

.abstract-item__header
  display flex
  align-items flex-start
  justify-content space-between
  gap 0.75rem

.title
  position relative
  flex 1
  min-width 0
  font-size 1.05rem
  font-weight 600
  line-height 1.45
  letter-spacing -0.01em
  .title__lock
    margin-right 0.35rem
    font-size 1rem
    color $accentColor
    vertical-align -0.1em
  .title__link
    color var(--text-color)
    text-decoration none
    transition color 0.2s ease
    &:hover
      color $accentColor

.abstract-item:hover .title .title__link
  color $accentColor

.abstract-item__excerpt
  margin 0
  padding 0
  font-size 0.875rem
  line-height 1.7
  color var(--text-color-sub)
  display -webkit-box
  -webkit-line-clamp 3
  -webkit-box-orient vertical
  overflow hidden
  word-break break-word
  &:empty
    display none

.abstract-item__meta
  margin-top 0.15rem
  padding-top 0.75rem
  border-top 1px solid rgba(15, 23, 42, 0.08)
  font-size 0.8125rem
  line-height 1.5
  color var(--text-color-sub)
  >>> .iconfont
    opacity 0.9
  >>> .iconfont span
    color var(--text-color-sub)
  >>> .tags .tag-item
    padding 0.1rem 0.45rem
    margin-left 0.35rem
    border-radius 999px
    background rgba(13, 148, 136, 0.08)
    font-size 0.78rem
    transition background 0.2s ease, color 0.2s ease
    &.active
      color $accentColor
    &:hover
      background rgba(13, 148, 136, 0.16)
      color $accentColor

.dark .abstract-item
  border-color rgba(255, 255, 255, 0.12)
  background rgba(30, 41, 59, 0.82)
  box-shadow 0 8px 32px rgba(0, 0, 0, 0.35)
  &:hover
    border-color rgba(255, 255, 255, 0.18)
  .abstract-item__meta
    border-top-color rgba(255, 255, 255, 0.1)
  .title .title__link
    color rgba(248, 250, 252, 0.95)
  &:hover .title .title__link
    color lighten($accentColor, 15%)

@media (max-width: $MQMobile)
  .abstract-item
    padding 1rem 1.1rem 0.95rem
  .abstract-item__meta
    >>> .tags
      display block
      margin-top 0.5rem
      margin-left 0 !important
</style>
