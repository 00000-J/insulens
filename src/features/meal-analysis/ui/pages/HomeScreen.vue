<script setup lang="ts">
import { useRouter } from "vue-router";
import { NCard, NIcon } from "naive-ui";
import { CameraSharp } from "@vicons/ionicons5";

const router = useRouter();

function goToAddMealDetails() {
  router.push("/add-meal-details");
}
</script>

<template>
  <div class="page-container home-screen">
    <n-card
      class="home-page-photo-button"
      hoverable
      @click="goToAddMealDetails"
      :content-style="{
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }"
    >
      <n-icon size="100">
        <CameraSharp />
      </n-icon>
    </n-card>
  </div>
</template>
