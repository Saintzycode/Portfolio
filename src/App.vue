<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { profile } from './data/profile'
import { projects } from './data/projects'
import { badges } from './data/badges'
import contributions from './data/contributions.json'
import SectionHeading from './components/SectionHeading.vue'
import BadgesSection from './components/BadgesSection.vue'
import ContributionsSection from './components/ContributionsSection.vue'
import ProjectCard from './components/ProjectCard.vue'

const nav = [
  { label: 'Projects', href: '#projects' },
  { label: 'Badges', href: '#badges' },
  { label: 'Contributions', href: '#contributions' },
]

const stats = [
  { value: projects.length, label: 'projects' },
  { value: badges.length, label: 'certifications' },
  { value: contributions.totalContributions, label: 'contributions this year' },
]

let observer: IntersectionObserver | undefined

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer?.unobserve(entry.target)
        }
      }
    },
    { threshold: 0.15 },
  )
  document.querySelectorAll('.reveal').forEach((el) => observer?.observe(el))
})

onUnmounted(() => observer?.disconnect())
</script>

<template>
  <div class="relative overflow-x-hidden">
    <!-- gradient orbs -->
    <div aria-hidden="true" class="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        class="absolute -top-48 -left-40 h-[38rem] w-[38rem] rounded-full bg-indigo-600/40 blur-[130px] animate-[drift_22s_ease-in-out_infinite]"
      />
      <div
        class="absolute top-1/3 -right-48 h-[34rem] w-[34rem] rounded-full bg-fuchsia-600/30 blur-[140px] animate-[drift_28s_ease-in-out_infinite_reverse]"
      />
      <div
        class="absolute -bottom-52 left-1/4 h-[32rem] w-[32rem] rounded-full bg-violet-600/25 blur-[150px] animate-[drift_34s_ease-in-out_infinite]"
      />
    </div>

    <!-- floating nav -->
    <header class="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <nav
        class="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-1.5 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.9)] backdrop-blur-xl"
      >
        <a href="#top" class="px-3 py-1.5 font-display text-sm font-semibold text-white">
          {{ profile.name }}
        </a>
        <span class="mx-1 h-4 w-px bg-white/10" />
        <a
          v-for="item in nav"
          :key="item.href"
          :href="item.href"
          class="hidden rounded-full px-3 py-1.5 text-sm text-zinc-300 transition hover:bg-white/10 hover:text-white sm:block"
        >
          {{ item.label }}
        </a>
        <a
          :href="profile.github"
          target="_blank"
          rel="noreferrer"
          class="ml-1 rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-3.5 py-1.5 text-sm font-semibold text-white transition hover:brightness-110"
        >
          GitHub
        </a>
      </nav>
    </header>

    <main id="top" class="mx-auto max-w-6xl px-6">
      <!-- hero -->
      <section class="flex min-h-screen flex-col items-center justify-center py-28 text-center">
        <p
          class="text-xs font-semibold tracking-[0.35em] text-violet-300/80 uppercase sm:text-sm"
        >
          {{ profile.role }}
        </p>

        <h1 class="mt-7 font-display text-5xl font-bold tracking-tight sm:text-7xl lg:text-8xl">
          <span
            class="bg-gradient-to-br from-white via-violet-200 to-indigo-400 bg-clip-text text-transparent"
          >
            {{ profile.name }}
          </span>
        </h1>

        <p class="mt-6 max-w-xl text-base text-zinc-400 sm:text-lg">{{ profile.tagline }}</p>

        <div class="mt-9 flex flex-wrap justify-center gap-3">
          <a
            v-for="social in profile.socials"
            :key="social.href"
            :href="social.href"
            target="_blank"
            rel="noreferrer"
            class="rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm text-zinc-200 backdrop-blur transition hover:border-violet-400/50 hover:bg-white/10 hover:shadow-[0_0_34px_-8px_rgba(168,85,247,0.7)]"
          >
            {{ social.label }}
          </a>
        </div>

        <div class="mt-12 flex flex-wrap justify-center gap-3">
          <span
            v-for="stat in stats"
            :key="stat.label"
            class="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-zinc-400 backdrop-blur"
          >
            <span class="font-display font-semibold text-white">{{ stat.value }}</span>
            {{ stat.label }}
          </span>
        </div>

        <p class="mt-16 text-xs tracking-[0.3em] text-zinc-600 uppercase">Scroll</p>
      </section>

      <!-- projects -->
      <section id="projects" class="scroll-mt-28 py-20">
        <div class="reveal">
          <SectionHeading index="01" label="Projects" title="Things I've built" />
          <div class="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            <ProjectCard v-for="project in projects" :key="project.slug" :project="project" />
          </div>
        </div>
      </section>

      <!-- badges -->
      <section id="badges" class="scroll-mt-28 py-20">
        <div class="reveal">
          <SectionHeading index="02" label="Badges" title="Certifications earned" />
          <BadgesSection />
        </div>
      </section>

      <!-- contributions -->
      <section id="contributions" class="scroll-mt-28 py-20">
        <div class="reveal">
          <SectionHeading index="03" label="Contributions" title="Activity on GitHub" />
          <ContributionsSection />
        </div>
      </section>
    </main>

    <footer class="border-t border-white/10">
      <div
        class="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-6 py-10 text-sm text-zinc-500"
      >
        <span>© {{ new Date().getFullYear() }} {{ profile.name }}</span>
        <span>Vue · TypeScript · Tailwind CSS</span>
      </div>
    </footer>
  </div>
</template>
