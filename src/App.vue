<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import MHeader from '@/components/header/m-header.vue'

const route = useRoute()
const visible = computed(() => {
  return route.meta.showHeader
})
</script>

<template>
  <m-header v-if="visible"></m-header>
  <router-view></router-view>
</template>

<style scoped>
</style>
