<template>
  <div>
    <TheHeader/>
    <div class="main-page">
        <router-view/>
    </div>
  </div>
</template>

<script setup>
import TheHeader from '../components/ui/TheHeader.vue'
</script>

<style lang="scss">
.main-page {
  padding: 32px;
  min-height: 100vh;
  @apply bg-gray-200;
}
</style>
