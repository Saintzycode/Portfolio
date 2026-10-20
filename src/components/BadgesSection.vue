<script setup lang="ts">
import { ref } from 'vue'
import { badges } from '../data/badges'

const broken = ref<Record<string, boolean>>({})

const initials = (title: string) =>
  title
    .split(/\s+/)
    .filter((word) => /^[A-Za-z0-9&+]+$/.test(word))
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join('')
</script>

<template>
  <ul class="grid gap-4 sm:grid-cols-2">
    <li v-for="badge in badges" :key="badge.id">
      <a
        :href="badge.href"
        :target="badge.href ? '_blank' : undefined"
        :rel="badge.href ? 'noreferrer' : undefined"
        class="flex h-full items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 transition hover:border-amber-400/60 hover:bg-zinc-900"
      >
        <span
          class="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-zinc-800 text-lg font-bold text-amber-300"
        >
          <img
            v-if="!broken[badge.id]"
            :src="badge.image"
            :alt="badge.title"
            class="h-full w-full object-contain"
            @error="broken[badge.id] = true"
          />
          <span v-else>{{ initials(badge.title) }}</span>
        </span>

        <span class="min-w-0">
          <span class="block font-semibold text-zinc-50">{{ badge.title }}</span>
          <span class="block text-sm text-zinc-400">{{ badge.issuer }}</span>
          <span class="block text-xs text-zinc-500">{{ badge.issued }}</span>
        </span>
      </a>
    </li>
  </ul>
</template>
