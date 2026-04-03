import { getCurrentInstance, ref, onMounted, watch } from 'vue'

export function useInstance () {
  const vm = getCurrentInstance()
  if (!vm) throw new Error('must be called in setup')

  const instance = vm?.proxy || {}
  return instance
}

export function useShowModule () {
  // 初始必须为 true：SSR/静态生成阶段不会执行 onMounted，若用 false 则 v-show 会把正文区整段隐藏（看起来像「列表消失」）
  const recoShowModule = ref(true)
  const instance = getCurrentInstance()?.proxy

  onMounted(() => {
    recoShowModule.value = true
  })

  // 仅在同一路径下的 hash 变化（如 #localstorage）时不要再 false：否则 onUpdated 会整段隐藏正文，外链带锚点打开会像「打不开正文」
  if (instance && instance.$route) {
    watch(
      () => instance.$route.path,
      () => {
        recoShowModule.value = false
        setTimeout(() => {
          recoShowModule.value = true
        }, 100)
      }
    )
  }

  return { recoShowModule }
}
