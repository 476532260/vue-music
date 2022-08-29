<script setup>
import { reactive, toRefs, onMounted } from 'vue'

const state = reactive({
  visible: false,
  text: '',
  time: ''
})

const { visible, text } = toRefs(state)

onMounted(() => {
  window.showToast = (text, duration = 2000) => {
    clearTimeout(state.time)
    state.text = text
    state.visible = true
    state.time = setTimeout(() => {
      state.visible = false
    }, duration)
  }
})
</script>

<template>
  <transition name="fade">
    <div class="toast">
      <div class="toast-tip">
        <span class="toast-icon"></span>
        <div class="toast-text">{{ text }}</div>
      </div>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>