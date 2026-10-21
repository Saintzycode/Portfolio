<script setup lang="ts">
import { computed } from 'vue'
import contributions from '../data/contributions.json'

// GitHub's dark palette, straight from their legend.
const LEVEL_COLORS = ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353']
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const weeks = contributions.weeks
const total = computed(() => contributions.totalContributions)
const activeDays = computed(() => weeks.flatMap((w) => w.days).filter((d) => d.count > 0).length)

const monthLabels = computed(() =>
  weeks.map((week, index) => {
    const month = new Date(`${week.firstDay}T00:00:00Z`).getUTCMonth()
    const previous = index > 0 ? new Date(`${weeks[index - 1].firstDay}T00:00:00Z`).getUTCMonth() : month
    return month === previous ? '' : MONTHS[month]
  }),
)

const tooltip = (date: string, count: number) => {
  const day = new Date(`${date}T00:00:00Z`).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  })
  return count === 0
    ? `No contributions on ${day}.`
    : `${count} contribution${count === 1 ? '' : 's'} on ${day}.`
}

const updated = new Date(contributions.generatedAt).toLocaleDateString('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
})
</script>

<template>
  <div
    class="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur transition hover:border-violet-400/30 hover:shadow-[0_24px_60px_-28px_rgba(168,85,247,0.5)]"
  >
    <div class="flex flex-wrap items-baseline gap-x-3 gap-y-1">
      <p class="font-display text-4xl font-bold text-white">{{ total.toLocaleString() }}</p>
      <p class="text-sm text-zinc-400">
        contributions in the last year · {{ activeDays }} active days
      </p>
    </div>

    <div class="mt-6 overflow-x-auto pb-2">
      <div v-if="weeks.length" class="inline-block">
        <div class="mb-1 flex gap-2">
          <div class="w-[26px] shrink-0" />
          <div class="flex gap-[3px]">
            <span
              v-for="(label, index) in monthLabels"
              :key="index"
              class="w-[11px] overflow-visible text-[10px] whitespace-nowrap text-violet-300/60"
            >
              {{ label }}
            </span>
          </div>
        </div>

        <div class="flex gap-2">
          <div class="flex shrink-0 flex-col gap-[3px]">
            <span
              v-for="(label, index) in ['', 'Mon', '', 'Wed', '', 'Fri', '']"
              :key="index"
              class="h-[11px] w-[26px] overflow-visible text-[9px] leading-[11px] whitespace-nowrap text-zinc-600"
            >
              {{ label }}
            </span>
          </div>

          <div class="flex gap-[3px]">
            <div v-for="(week, weekIndex) in weeks" :key="weekIndex" class="flex flex-col gap-[3px]">
              <span
                v-for="day in week.days"
                :key="day.date"
                :title="tooltip(day.date, day.count)"
                :aria-label="tooltip(day.date, day.count)"
                role="img"
                class="h-[11px] w-[11px] rounded-[2px] transition hover:ring-1 hover:ring-white/70"
                :style="{ backgroundColor: LEVEL_COLORS[day.level] }"
              />
            </div>
          </div>
        </div>
      </div>

      <p v-else class="text-sm text-zinc-500">No contribution data yet — run `npm run contrib`.</p>
    </div>

    <div class="mt-5 flex items-center justify-between text-[11px] text-zinc-600">
      <span>Updated {{ updated }}</span>
      <span class="flex items-center gap-1">
        Less
        <span
          v-for="(color, level) in LEVEL_COLORS"
          :key="level"
          class="h-[11px] w-[11px] rounded-[2px]"
          :style="{ backgroundColor: color }"
        />
        More
      </span>
    </div>
  </div>
</template>
