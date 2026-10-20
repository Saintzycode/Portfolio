<script setup lang="ts">
import { profile } from './data/profile'
import { projects } from './data/projects'
import BadgesSection from './components/BadgesSection.vue'
import ContributionsSection from './components/ContributionsSection.vue'
import ProjectCard from './components/ProjectCard.vue'

const nav = [
  { label: 'Projects', href: '#projects' },
  { label: 'Badges', href: '#badges' },
  { label: 'Contributions', href: '#contributions' },
]
</script>

<template>
  <div class="min-h-screen">
    <header class="sticky top-0 z-10 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur">
      <nav class="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a href="#top" class="font-semibold text-zinc-50">{{ profile.name }}</a>
        <div class="flex items-center gap-6">
          <a
            v-for="item in nav"
            :key="item.href"
            :href="item.href"
            class="hidden text-sm text-zinc-400 transition hover:text-zinc-100 sm:block"
          >
            {{ item.label }}
          </a>
          <a
            :href="profile.github"
            target="_blank"
            rel="noreferrer"
            class="rounded-lg border border-zinc-700 px-3 py-1.5 text-sm font-medium text-zinc-200 transition hover:border-indigo-500 hover:text-white"
          >
            GitHub
          </a>
        </div>
      </nav>
    </header>

    <main id="top" class="mx-auto max-w-5xl px-6">
      <section class="flex flex-col gap-6 py-16 sm:py-24">
        <p class="text-sm font-medium tracking-wide text-indigo-400 uppercase">{{ profile.role }}</p>
        <h1 class="text-4xl font-bold text-zinc-50 sm:text-6xl">{{ profile.name }}</h1>
        <p class="max-w-2xl text-lg text-zinc-400">{{ profile.tagline }}</p>

        <div class="flex flex-wrap items-center gap-5 pt-2">
          <a
            v-for="social in profile.socials"
            :key="social.href"
            :href="social.href"
            target="_blank"
            rel="noreferrer"
            class="text-sm font-medium text-indigo-400 transition hover:text-indigo-300 hover:underline"
          >
            {{ social.label }} →
          </a>
          <span class="text-sm text-zinc-500">{{ profile.location }}</span>
        </div>
      </section>

      <section id="projects" class="scroll-mt-20 py-12">
        <h2 class="mb-6 text-2xl font-bold text-zinc-50">Projects</h2>
        <div class="grid gap-4 sm:grid-cols-2">
          <ProjectCard v-for="project in projects" :key="project.slug" :project="project" />
        </div>
      </section>

      <section id="badges" class="scroll-mt-20 py-12">
        <h2 class="mb-6 text-2xl font-bold text-zinc-50">Badges &amp; Certifications</h2>
        <BadgesSection />
      </section>

      <section id="contributions" class="scroll-mt-20 py-12">
        <h2 class="mb-6 text-2xl font-bold text-zinc-50">Contributions</h2>
        <ContributionsSection />
      </section>
    </main>

    <footer class="border-t border-zinc-800/80">
      <div
        class="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-2 px-6 py-8 text-sm text-zinc-500"
      >
        <span>Built by {{ profile.name }}</span>
        <span>Vue · TypeScript · Tailwind CSS</span>
      </div>
    </footer>
  </div>
</template>
