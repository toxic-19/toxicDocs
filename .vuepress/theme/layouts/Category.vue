<template>
  <Common class="categories-wrapper" :sidebar="false">
    <!-- 分类集合 -->
    <ul class="category-wrapper">
      <li
        class="category-item"
        :class="title == item.name ? 'active': ''"
        v-for="(item, index) in $categoriesList"
        v-show="item.pages.length > 0"
        :key="index">
        <router-link :to="item.path">
          <span class="category-name">{{ item.name }}</span>
          <span class="post-num">{{ item.pages.length }}</span>
        </router-link>
      </li>
    </ul>

    <!-- 博客列表 -->
    <note-abstract
      class="list"
      :data="posts"
      @paginationChange="paginationChange"
    ></note-abstract>
  </Common>
</template>

<script>
import { defineComponent, computed } from 'vue'
import Common from '@theme/components/Common'
import NoteAbstract from '@theme/components/NoteAbstract'
import { sortPostsByStickyAndDate, filterPosts } from '@theme/helpers/postData'
import { useInstance } from '@theme/helpers/composable'

export default defineComponent({
  components: { Common, NoteAbstract },

  setup (_, ctx) {
    const instance = useInstance()

    const posts = computed(() => {
      let posts = instance.$currentCategories.pages
      posts = filterPosts(posts)
      sortPostsByStickyAndDate(posts)
      return posts
    })

    const title = computed(() => {
      return instance.$currentCategories.key
    })

    const getCurrentTag = (tag) => {
      ctx.emit('currentTag', tag)
    }

    const paginationChange = (page) => {
      setTimeout(() => {
        window.scrollTo(0, 0)
      }, 100)
    }

    return {
      posts,
      title,
      getCurrentTag,
      paginationChange
    }
  }
})
</script>

<style src="../styles/theme.styl" lang="stylus"></style>
<style src="prismjs/themes/prism-tomorrow.css"></style>
<style lang="stylus" scoped>
.categories-wrapper
  max-width $contentWidth
  margin 0 auto
  padding 4.6rem 2.5rem 0

  .category-wrapper
    display flex
    flex-wrap wrap
    align-items center
    gap 0.5rem 0.55rem
    list-style none
    padding 0
    margin 1.5rem 0 1.75rem

  .category-item
    margin 0
    padding 0
    list-style none
    display inline-block
    vertical-align middle
    a
      display flex
      align-items center
      justify-content space-between
      gap 0.5rem
      min-width 0
      max-width 100%
      box-sizing border-box
      padding 0.35rem 0.85rem
      border-radius 999px
      font-size 0.8125rem
      font-weight 500
      line-height 1.35
      text-decoration none
      color var(--text-color)
      background rgba(15, 23, 42, 0.045)
      border 1px solid rgba(15, 23, 42, 0.1)
      box-shadow none
      transition background 0.2s ease, color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease, transform 0.15s ease
    .category-name
      flex 1
      min-width 0
      overflow hidden
      text-overflow ellipsis
      white-space nowrap
    .post-num
      flex-shrink 0
      margin-left 0
      min-width 1.35rem
      padding 0 0.4rem
      height 1.35rem
      display inline-flex
      align-items center
      justify-content center
      border-radius 999px
      font-size 0.7rem
      font-weight 600
      line-height 1
      color var(--text-color-sub)
      background rgba(15, 23, 42, 0.08)
    &:hover:not(.active) a
      color $accentColor
      border-color rgba(13, 148, 136, 0.35)
      background rgba(13, 148, 136, 0.08)
      transform translateY(-1px)
      .post-num
        background rgba(13, 148, 136, 0.15)
        color $accentColor
    &.active a
      color #fff
      background $accentColor
      border-color $accentColor
      box-shadow 0 2px 10px rgba(13, 148, 136, 0.28)
      transform none
      .category-name
        color #fff
      .post-num
        background rgba(255, 255, 255, 0.25)
        color #fff
      &:hover
        color #fff
        background lighten($accentColor, 4%)
        border-color lighten($accentColor, 4%)
        .post-num
          background rgba(255, 255, 255, 0.32)
          color #fff

.dark .categories-wrapper
  .category-item a
    background rgba(255, 255, 255, 0.06)
    border-color rgba(255, 255, 255, 0.12)
  .category-item:not(.active) .post-num
    background rgba(255, 255, 255, 0.1)
    color var(--text-color-sub)
  .category-item.active a .post-num
    background rgba(255, 255, 255, 0.25)
    color #fff
  .category-item:hover:not(.active) a
    color lighten($accentColor, 12%)
    border-color rgba(13, 148, 136, 0.45)
    background rgba(13, 148, 136, 0.12)
    .post-num
      background rgba(13, 148, 136, 0.2)
      color lighten($accentColor, 12%)
  .category-item.active a
    color #fff
    .category-name
      color #fff

@media (max-width: $MQMobile)
  .categories-wrapper
    padding 4.6rem 1rem 0
  .page-edit
    .edit-link
      margin-bottom .5rem
    .last-updated
      font-size .8em
      float none
      text-align left
</style>
