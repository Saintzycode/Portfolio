<script setup lang="ts">
defineProps<{ index: string; label: string; title: string }>()
</script>

<template>
  <div class="mb-10">
    <div class="flex items-center gap-3">
      <span class="font-display text-xs font-semibold tracking-[0.3em] text-violet-300/80 uppercase">
        {{ index }} / {{ label }}
      </span>
      <span class="h-px flex-1 bg-gradient-to-r from-violet-400/50 to-transparent" />
    </div>
    <h2 class="mt-4 font-display text-3xl font-bold text-white sm:text-4xl">{{ title }}</h2>
  </div>
</template>
