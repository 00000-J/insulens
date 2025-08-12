<script setup lang="ts">
import { useRouter } from 'vue-router'
import { NPageHeader, NCard, NText } from 'naive-ui'

const { title, description } = defineProps<{
  title: string
  description?: string
}>()

const router = useRouter()

function goBack() {
  router.back()
}
</script>

<template>
  <div class="placeholder-wrapper">
    <n-page-header :title="title" :on-back="goBack" />
    
    <div class="content">
      <n-card>
        <n-text tag="h3" style="margin-bottom: 1rem; display: block;">
          {{ title }}
        </n-text>
        <n-text depth="3">
          {{ description || `This ${title.toLowerCase()} feature is coming soon!` }}
        </n-text>
      </n-card>
    </div>
  </div>
</template>

<style scoped>
.placeholder-wrapper {
  padding: 1rem;
  max-width: 400px;
  margin: 0 auto;
}

.content {
  padding: 1rem 0;
}
</style>
