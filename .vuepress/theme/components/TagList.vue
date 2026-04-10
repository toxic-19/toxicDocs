<template>
  <div class="tags">
    <span
      v-for="(item, index) in tags"
      v-show="!item.pages || (item.pages && item.pages.length > 0)"
      :key="index"
      class="tag-item"
      :class="{ active: item.name == currentTag }"
      @click="tagClick(item)"
    >{{ item.name }}</span>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useInstance } from '@theme/helpers/composable'

export default defineComponent({
  props: {
    currentTag: {
      type: String,
      default: ''
    }
  },
  setup (props, ctx) {
    const instance = useInstance()
    const tags = computed(() => {
      const list = instance.$tagesList
      const all = { name: instance.$recoLocales.all, path: '/tag/' }
      return [all, ...(Array.isArray(list) ? list : [])]
    })

    const tagClick = tag => {
      ctx.emit('getCurrentTag', tag)
    }

    return { tags, tagClick }
  }
})
</script>

<style lang="stylus" scoped>
.tags
  display flex
  flex-wrap wrap
  align-items center
  gap 0.5rem 0.55rem
  margin 1.5rem 0 1.75rem
  line-height 1.5
  .tag-item
    margin 0
    padding 0.35rem 0.85rem
    display inline-flex
    align-items center
    justify-content center
    vertical-align middle
    cursor pointer
    border-radius 999px
    font-size 0.8125rem
    font-weight 500
    line-height 1.35
    color var(--text-color)
    background rgba(15, 23, 42, 0.045)
    border 1px solid rgba(15, 23, 42, 0.1)
    box-shadow none
    transition background 0.2s ease, color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease, transform 0.15s ease
    &:hover
      color $accentColor
      border-color rgba(13, 148, 136, 0.35)
      background rgba(13, 148, 136, 0.08)
      transform translateY(-1px)
    &.active
      color #fff
      background $accentColor
      border-color $accentColor
      box-shadow 0 2px 10px rgba(13, 148, 136, 0.28)
      transform none
      &:hover
        color #fff
        background lighten($accentColor, 4%)
        border-color lighten($accentColor, 4%)

.dark .tags .tag-item
  background rgba(255, 255, 255, 0.06)
  border-color rgba(255, 255, 255, 0.12)
  &:hover
    color lighten($accentColor, 12%)
    border-color rgba(13, 148, 136, 0.45)
    background rgba(13, 148, 136, 0.12)
  &.active
    color #fff
    &:hover
      color #fff
      background lighten($accentColor, 5%)
      border-color lighten($accentColor, 5%)
</style>
