<script setup lang="ts">
import type { Project } from '../data/projects'

defineProps<{ project: Project }>()
</script>

<template>
  <article
    class="group flex flex-col gap-3 rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 transition hover:border-indigo-500/60 hover:bg-zinc-900"
  >
    <div class="flex items-start justify-between gap-3">
      <h3 class="text-lg font-semibold text-zinc-50">{{ project.title }}</h3>
      <span
        v-if="project.featured"
        class="shrink-0 rounded-full bg-indigo-500/15 px-2 py-0.5 text-xs font-medium text-indigo-300"
      >
        Featured
      </span>
    </div>

    <p class="text-sm leading-relaxed text-zinc-400">{{ project.summary }}</p>

    <ul class="flex flex-wrap gap-1.5">
      <li
        v-for="tech in project.stack"
        :key="tech"
        class="rounded-md bg-zinc-800 px-2 py-0.5 text-xs text-zinc-300"
      >
        {{ tech }}
      </li>
    </ul>

    <div class="mt-auto flex flex-wrap gap-4 pt-1">
      <a
        v-for="link in project.links"
        :key="link.href"
        :href="link.href"
        target="_blank"
        rel="noreferrer"
        class="text-sm font-medium text-indigo-400 transition hover:text-indigo-300 hover:underline"
      >
        {{ link.label }} →
      </a>
    </div>
  </article>
</template>
