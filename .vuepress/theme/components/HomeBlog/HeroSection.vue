<template>
  <div class="hero-section">
    <div class="hero-inner">
      <ModuleTransition>
        <img
          v-if="recoShowModule && heroImgSrc"
          class="hero-img"
          :style="heroImageStyle || {}"
          :src="heroImgSrc"
          alt=""
        >
      </ModuleTransition>

      <ModuleTransition delay="0.04">
        <h1 v-if="recoShowModule && heroText !== null" class="hero-title">
          {{ displayTitle }}
        </h1>
      </ModuleTransition>

      <ModuleTransition delay="0.08">
        <p v-if="recoShowModule && tagline !== null" class="hero-desc">
          {{ displayTagline }}
        </p>
      </ModuleTransition>

      <ModuleTransition delay="0.12">
        <div v-if="recoShowModule" class="hero-actions">
          <button type="button" class="hero-btn hero-btn--primary" @click="scrollToPosts">
            浏览文章
          </button>
          <router-link class="hero-btn hero-btn--ghost" to="/timeline/">
            时间线
          </router-link>
        </div>
      </ModuleTransition>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { ModuleTransition } from '@vuepress-reco/core/lib/components'
import { useInstance } from '@theme/helpers/composable'

export default defineComponent({
  name: 'HeroSection',
  components: { ModuleTransition },
  props: {
    recoShowModule: { type: Boolean, default: true },
    heroImageStyle: { type: Object, default: null }
  },
  setup () {
    const instance = useInstance()
    const heroImgSrc = computed(() => {
      const img = instance.$frontmatter.heroImage
      return img ? instance.$withBase(img) : ''
    })
    const heroText = computed(() => instance.$frontmatter.heroText)
    const tagline = computed(() => instance.$frontmatter.tagline)
    const displayTitle = computed(() => {
      const t = instance.$frontmatter.heroText
      if (t != null && String(t).trim()) return t
      return instance.$title || 'toxicDocs'
    })
    const displayTagline = computed(() => {
      const t = instance.$frontmatter.tagline
      if (t != null && String(t).trim()) return t
      return instance.$description || ''
    })
    return { heroImgSrc, heroText, tagline, displayTitle, displayTagline }
  },
  methods: {
    scrollToPosts () {
      const el = document.getElementById('home-posts')
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }
})
</script>

<style lang="stylus" scoped>
.hero-section
  position relative
  margin $navbarHeight auto 0
  box-sizing border-box
  min-height 420px
  max-height 70vh
  height auto
  display flex
  align-items center
  justify-content center
  padding 3rem 1.25rem 2.5rem
  overflow hidden

.hero-inner
  position relative
  z-index 1
  max-width 720px
  text-align center

.hero-img
  max-width 220px
  margin 0 auto 1.25rem
  border-radius 12px
  box-shadow 0 20px 50px rgba(0, 0, 0, 0.35)

.hero-title
  margin 0 auto 1rem
  font-size clamp(1.75rem, 4vw, 2.75rem)
  font-weight 700
  letter-spacing -0.02em
  line-height 1.2
  color #f8fafc
  text-shadow 0 2px 24px rgba(0, 0, 0, 0.35)

.hero-desc
  margin 0 auto 1.75rem
  font-size clamp(1rem, 2.2vw, 1.25rem)
  line-height 1.65
  color rgba(248, 250, 252, 0.92)
  text-shadow 0 1px 12px rgba(0, 0, 0, 0.25)

.hero-actions
  display flex
  flex-wrap wrap
  gap 0.75rem
  justify-content center
  align-items center

.hero-btn
  display inline-flex
  align-items center
  justify-content center
  min-height 2.75rem
  padding 0 1.35rem
  font-size 0.95rem
  font-weight 600
  border-radius 999px
  border 2px solid transparent
  cursor pointer
  text-decoration none
  transition transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease, border-color 0.2s ease
  &:hover
    transform translateY(-1px)

.hero-btn--primary
  background $accentColor
  color #fff
  box-shadow 0 8px 24px rgba(13, 148, 136, 0.45)
  &:hover
    background lighten($accentColor, 6%)
    box-shadow 0 10px 28px rgba(13, 148, 136, 0.5)

.hero-btn--ghost
  background rgba(255, 255, 255, 0.12)
  color #f8fafc
  border-color rgba(255, 255, 255, 0.35)
  backdrop-filter blur(8px)
  &:hover
    background rgba(255, 255, 255, 0.2)
    border-color rgba(255, 255, 255, 0.55)

@media (max-width: $MQMobile)
  .hero-section
    min-height 360px
    max-height none
    padding 2.5rem 1rem 2rem
  .hero-img
    max-width 180px
</style>
