<template>
  <Common :sidebarItems="sidebarItems" :showModule="show">
    <div
      v-if="$frontmatter.home"
      class="home-page-shell"
      :style="homePageBgStyle"
    >
      <component :is="homeCom"/>
      <Footer class="footer"/>
    </div>
    <div v-else>
      <ModuleTransition v-if="sidebarItems.length > 0">
        <Page :key="path" :sidebar-items="sidebarItems"/>
      </ModuleTransition>
      <Page v-else :key="path" :sidebar-items="sidebarItems"/>
    </div>
  </Common>
</template>

<script>
import { defineComponent, computed, ref, onMounted } from 'vue'
import Home from '@theme/components/Home'
import HomeBlog from '@theme/components/HomeBlog'
import Page from '@theme/components/Page'
import Footer from '@theme/components/Footer'
import Common from '@theme/components/Common'
import { resolveSidebarItems } from '@theme/helpers/utils'
import { getHomePageBgStyle } from '@theme/helpers/homeBgStyle'
import { useInstance } from '@theme/helpers/composable'
import { ModuleTransition } from '@vuepress-reco/core/lib/components'

export default defineComponent({
  components: { HomeBlog, Home, Page, Common, Footer, ModuleTransition },
  setup (props, ctx) {
    const instance = useInstance()

    const sidebarItems = computed(() => {
      const { $page, $site, $localePath } = instance
      if ($page) {
        return resolveSidebarItems(
          $page,
          $page.regularPath,
          $site,
          $localePath
        )
      } else {
        return []
      }
    })

    const homeCom = computed(() => {
      const { type } = instance.$themeConfig || {}
      if (type) {
        return type == 'blog' ? 'HomeBlog' : type
      }
      return 'Home'
    })

    const show = ref(false)
    onMounted(() => {
      show.value = true
    })

    const path = computed(() => {
      return instance?.$page.path
    })

    const homePageBgStyle = computed(() => getHomePageBgStyle(instance))

    return { sidebarItems, homeCom, show, path, homePageBgStyle }
  }
})
</script>

<style src="prismjs/themes/prism-tomorrow.css"></style>
<style src="../styles/theme.styl" lang="stylus"></style>
