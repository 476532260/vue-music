<script setup>
import {
  ref,
  computed,
  watch,
  getCurrentInstance,
  nextTick,
  useAttrs
} from 'vue'

// 从文件系统导入多个模块
const modules = import.meta.globEager('@/assets/svg/*.svg')
// 接收父组件传入name属性
const props = defineProps({ name: String })
// 父组件给子组件传递特殊属性，如class、id、data-xxx自定义属性
const attrs = useAttrs()
// 获取当前组件实例
const instance = getCurrentInstance()
// 获取组件的dom元素
const svgRef = ref(null)
// 找到传入name属性的svg图标
const currentSvg = computed(() => {
  const fileName = '/' + props.name + '.svg'
  for (const path in modules) {
    if (path.endsWith(fileName)) {
      return modules[path]
    }
  }
  console.log('not found svg file:' + fileName)
  return undefined
})
// 给svg组件加上data-v-hash
let scopeId = ''
if (instance?.type) {
  const __scopeId = instance?.type?.__scopeId
  if (__scopeId) {
    scopeId = __scopeId
  }
}

const attachAttr = async () => {
  await nextTick()
  const cpt = svgRef.value
  if (!cpt) return
  const svg = cpt.$el | undefined
  if (!svg) return
  if (scopeId) {
    svg.setAttribute('scopeId', '')
    svg.querySelectorAll('*').forEach((element) => {
      element.setAttribute(scopeId, '')
    })
  }
}

watch(
  () => props.name,
  async () => {
    await nextTick()
    attachAttr()
  },
  {
    immediate: true
  }
)
</script>
  
  <template>
  <component
    :is="currentSvg"
    v-if="currentSvg"
    ref="svgRef"
    v-bind="$attrs"
    class="svg-icon"
    :name="name"
  />
</template>
  
  <style lang="scss" scoped>
svg {
  display: inline-block;
  width: 25px;
  height: 25px;
}
</style>