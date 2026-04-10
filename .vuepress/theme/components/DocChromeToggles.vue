<template>
  <div
    v-if="hasSidebar"
    class="doc-chrome-toggles"
    role="toolbar"
    aria-label="文档侧栏与大纲显示"
  >
    <button
      type="button"
      class="doc-chrome-btn"
      :class="{ 'is-off': !showLeft }"
      :aria-pressed="showLeft"
      :title="showLeft ? '隐藏左侧目录' : '显示左侧目录'"
      @click="onToggleLeft"
    >
      目录
    </button>
    <button
      type="button"
      class="doc-chrome-btn"
      :class="{ 'is-off': !showRight }"
      :aria-pressed="showRight"
      :title="showRight ? '隐藏右侧大纲' : '显示右侧大纲'"
      @click="onToggleRight"
    >
      大纲
    </button>
  </div>
</template>

<script>
import { defineComponent, inject, computed } from 'vue'

export default defineComponent({
  name: 'DocChromeToggles',
  setup () {
    const docChrome = inject('docChrome', null)
    const hasSidebar = computed(() => !!(docChrome && docChrome.hasSidebar && docChrome.hasSidebar.value))
    const showLeft = computed(() => (docChrome && docChrome.showLeftNav ? docChrome.showLeftNav.value : true))
    const showRight = computed(() => (docChrome && docChrome.showRightOutline ? docChrome.showRightOutline.value : true))
    const onToggleLeft = () => docChrome && docChrome.toggleLeftNav && docChrome.toggleLeftNav()
    const onToggleRight = () => docChrome && docChrome.toggleRightOutline && docChrome.toggleRightOutline()
    return { hasSidebar, showLeft, showRight, onToggleLeft, onToggleRight }
  }
})
</script>

<style lang="stylus" scoped>
.doc-chrome-toggles
  display flex
  align-items center
  gap 0.35rem
  margin-right 0.75rem
  flex-shrink 0

.doc-chrome-btn
  cursor pointer
  border 1px solid rgba(15, 23, 42, 0.14)
  background rgba(248, 250, 252, 0.65)
  color var(--text-color-sub)
  font-size 12px
  line-height 1
  padding 0.35rem 0.55rem
  border-radius 6px
  transition background 0.15s ease, color 0.15s ease, border-color 0.15s ease
  &:hover
    border-color rgba(13, 148, 136, 0.45)
    color $accentColor
  &.is-off
    opacity 0.55

.dark .doc-chrome-btn
  background rgba(30, 41, 59, 0.55)
  border-color rgba(255, 255, 255, 0.12)
  color var(--text-color-sub)

@media (max-width: $MQMobile)
  .doc-chrome-toggles
    display none
</style>
