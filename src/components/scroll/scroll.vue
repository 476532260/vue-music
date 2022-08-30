<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

import BScroll from '@better-scroll/core'
import ObserveDOM from '@better-scroll/observe-dom'
BScroll.use(ObserveDOM)

const props = defineProps({
  click: {
    type: Boolean,
    default: true
  },
  probeType: {
    type: Number,
    default: 0
  }
})

const scrollRef = ref(null)
const scroll = ref(null)

const emits = defineEmits(['scroll'])

defineExpose({
  scroll
})

onMounted(() => {
  scroll.value = new BScroll(scrollRef.value, {
    observeDOM: true,
    ...props
  })

  if (props.probeType > 0) {
    scroll.value.on('scroll', (pos) => {
      emits('scroll', pos)
    })
  }
})

onUnmounted(() => {
  scroll.value.destroy()
})
</script>
  
  <template>
  <div ref="scrollRef">
    <slot></slot>
  </div>
</template>