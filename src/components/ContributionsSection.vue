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
  return count === 0 ? `No contributions on ${day}.` : `${count} contribution${count === 1 ? '' : 's'} on ${day}.`
}

const updated = new Date(contributions.generatedAt).toLocaleDateString('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
})
</script>

<template>
  <div class="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
    <div class="flex flex-wrap items-baseline gap-x-3 gap-y-1">
      <p class="text-3xl font-bold text-zinc-50">{{ total.toLocaleString() }}</p>
      <p class="text-sm text-zinc-400">
        contributions in the last year · {{ activeDays }} active days
      </p>
    </div>

    <div class="mt-5 overflow-x-auto pb-2">
      <div v-if="weeks.length" class="inline-block">
        <div class="mb-1 flex gap-[3px]">
          <div class="w-[26px] shrink-0" />
          <div class="flex gap-[3px]">
            <span
              v-for="(label, index) in monthLabels"
              :key="index"
              class="w-[11px] overflow-visible text-[10px] whitespace-nowrap text-zinc-500"
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
              class="h-[11px] w-[26px] overflow-visible text-[9px] leading-[11px] whitespace-nowrap text-zinc-500"
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
                class="h-[11px] w-[11px] rounded-[2px]"
                :style="{ backgroundColor: LEVEL_COLORS[day.level] }"
              />
            </div>
          </div>
        </div>
      </div>

      <p v-else class="text-sm text-zinc-500">No contribution data yet — run `npm run contrib`.</p>
    </div>

    <div class="mt-3 flex items-center justify-between text-[11px] text-zinc-500">
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
