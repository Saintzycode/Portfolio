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
  <ul class="grid gap-6 sm:grid-cols-2">
    <li v-for="badge in badges" :key="badge.id">
      <a
        :href="badge.href"
        :target="badge.href ? '_blank' : undefined"
        :rel="badge.href ? 'noreferrer' : undefined"
        class="group flex h-full items-center gap-5 rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-amber-300/40 hover:shadow-[0_24px_60px_-24px_rgba(251,191,36,0.45)]"
      >
        <span
          class="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-white/15 to-white/[0.02] p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]"
        >
          <span
            class="absolute inset-0 rounded-2xl bg-amber-300/10 opacity-0 blur-md transition group-hover:opacity-100"
          />
          <img
            v-if="!broken[badge.id]"
            :src="badge.image"
            :alt="badge.title"
            class="relative h-full w-full object-contain"
            @error="broken[badge.id] = true"
          />
          <span v-else class="relative font-display text-xl font-bold text-amber-300">
            {{ initials(badge.title) }}
          </span>
        </span>

        <span class="min-w-0">
          <span class="block font-display font-semibold text-white">{{ badge.title }}</span>
          <span class="mt-1 block text-sm text-zinc-400">{{ badge.issuer }}</span>
          <span class="mt-0.5 block text-xs text-zinc-500">Issued {{ badge.issued }}</span>
          <span
            v-if="badge.href"
            class="mt-2 inline-block text-sm font-medium text-amber-300/90 transition group-hover:text-amber-200"
          >
            View credential →
          </span>
        </span>
      </a>
    </li>
  </ul>
</template>
