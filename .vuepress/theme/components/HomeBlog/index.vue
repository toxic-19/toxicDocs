<template>
  <div class="home-blog">
    <HeroSection
      :reco-show-module="recoShowModule"
      :hero-image-style="heroImageStyle"
    />

    <ModuleTransition delay="0.16">
      <div v-show="recoShowModule" class="home-blog-wrapper">
        <div id="home-posts" class="blog-list">
          <!-- 博客列表 -->
          <note-abstract :data="$recoPosts" @paginationChange="paginationChange" />
        </div>
        <aside class="info-wrapper">
          <div class="info-block info-block--profile">
            <PersonalInfo/>
          </div>

          <div class="info-block">
            <h4 class="info-heading">
              <reco-icon icon="reco-category" /> {{ $recoLocales.category }}
            </h4>
            <ul class="category-wrapper">
              <li
                v-for="(item, index) in this.$categories.list"
                :key="index"
                class="category-item"
              >
                <router-link :to="item.path">
                  <span class="category-name">{{ item.name }}</span>
                  <span class="post-num">{{ item.pages.length }}</span>
                </router-link>
              </li>
            </ul>
          </div>

          <div v-if="$tags.list.length !== 0" class="info-block">
            <h4 class="info-heading">
              <reco-icon icon="reco-tag" /> {{ $recoLocales.tag }}
            </h4>
            <TagList @getCurrentTag="getPagesByTags" />
          </div>

          <div
            v-if="$themeConfig.friendLink && $themeConfig.friendLink.length !== 0"
            class="info-block"
          >
            <h4 class="info-heading">
              <reco-icon icon="reco-friend" /> {{ $recoLocales.friendLink }}
            </h4>
            <FriendLink />
          </div>
        </aside>
      </div>
    </ModuleTransition>

    <ModuleTransition delay="0.24">
      <Content v-show="recoShowModule" class="home-center" custom/>
    </ModuleTransition>
  </div>
</template>

<script>
import { defineComponent, toRefs, reactive, computed, onMounted } from 'vue'
import TagList from '@theme/components/TagList'
import FriendLink from '@theme/components/FriendLink'
import NoteAbstract from '@theme/components/NoteAbstract'
import HeroSection from '@theme/components/HomeBlog/HeroSection.vue'
import { ModuleTransition, RecoIcon } from '@vuepress-reco/core/lib/components'
import PersonalInfo from '@theme/components/PersonalInfo'
import { useInstance, useShowModule } from '@theme/helpers/composable'

export default defineComponent({
  components: { HeroSection, NoteAbstract, TagList, FriendLink, ModuleTransition, PersonalInfo, RecoIcon },
  setup (props, ctx) {
    const instance = useInstance()

    const state = reactive({
      recoShow: false,
      heroHeight: 0
    })

    const { recoShowModule } = useShowModule()

    const heroImageStyle = computed(() => instance.$frontmatter.heroImageStyle || {})

    onMounted(() => {
      const heroEl = document.querySelector('.hero-section')
      state.heroHeight = heroEl ? heroEl.clientHeight : 0
      state.recoShow = true
    })

    return { recoShowModule, heroImageStyle, ...toRefs(state) }
  },
  methods: {
    paginationChange (page) {
      setTimeout(() => {
        window.scrollTo(0, this.heroHeight)
      }, 100)
    },
    getPagesByTags (tagInfo) {
      this.$router.push({ path: tagInfo.path })
    }
  }
})
</script>

<style lang="stylus">
@require '../../styles/home-blog-sidebar.styl'
</style>
