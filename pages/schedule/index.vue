<script lang="ts" setup>
import { ArtworkType, ProviderID, type Schedule } from "~/types/schedule";

import VueCountdown from "@chenfengyuan/vue-countdown";

const { data, pending } = useFetch<Schedule>("/api/schedule");

const tabs = ['All', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

let currentTab = ref('All');

const getTime = (time: string | number | Date) =>
  new Date(time).getTime() - new Date().getTime();

</script>
<template>
  <div v-if="pending">Loading...</div>
  <div v-if="data" class="schedule-container">
    <button :class="['schedule-tabs', { 'active-tab': currentTab === tab }]" v-for="tab in tabs"
      @click="currentTab = tab">{{ tab }}</button>

    <div class="tabs">
      <h1>{{ currentTab }}</h1>
      <div v-if="currentTab === 'All'">
        <div v-for="(day, dayName) in data" :key="dayName">
          <h2>{{ String(dayName).charAt(0).toUpperCase() + String(dayName).slice(1) }}</h2>
          <div v-for="release in day" :key="release.id">
            <img class="schedule-img" :src="release.coverImage" alt="Error" />
            <p>{{ release.title.english ? release.title.english : release.title.romaji }}</p>
            <p>Ep {{ release.airingEpisode }}</p>

            <ClientOnly>
              <vue-countdown :time="getTime(release.airingAt)" v-slot="{ days, hours, minutes, seconds }">
                <template v-if="days || hours || minutes || seconds"> Airing In: </template>
                <template v-if="days">{{ days }} days, </template>
                <template v-if="hours">{{ hours }} hours, </template>
                <template v-if="minutes">{{ minutes }} minutes, </template>
                <template v-if="seconds">{{ seconds }} seconds 🎉.</template>
                <template v-else>Aired 🎉</template>
              </vue-countdown>
            </ClientOnly>
          </div>
        </div>
      </div>
      <div v-else>
        <div v-for="release in data[currentTab.toLowerCase()]" :key="release.id">
          <img class="schedule-img" :src="release.coverImage" alt="Error" />
          <p>{{ release.title.english ? release.title.english : release.title.romaji }}</p>
          <p>Ep {{ release.airingEpisode }}</p>
          <ClientOnly>
            <vue-countdown :time="getTime(release.airingAt)" v-slot="{ days, hours, minutes, seconds }">
              <template v-if="days || hours || minutes || seconds"> Airing In: </template>
              <template v-if="days">{{ days }} days, </template>
              <template v-if="hours">{{ hours }} hours, </template>
              <template v-if="minutes">{{ minutes }} minutes, </template>
              <template v-if="seconds">{{ seconds }} seconds 🎉.</template>
              <template v-else>Aired 🎉</template>
            </vue-countdown>
          </ClientOnly>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "~/assets/css/schedule.css";
</style>