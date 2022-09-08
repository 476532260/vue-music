<script setup>
import { reactive, toRefs, onMounted } from 'vue'

const state = reactive({
  visible: false,
  text: 'eee',
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
      <span class="icon"></span>
      <div class="text">{{ text }}</div>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 12px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 12px;
  color: #fff;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>