<template>
      <h1 class="stats-h1">Aniflame Stats</h1>
  <div class="stats-container">
    <div class="stats-card">
      <IconVideo class="stats-icon" color="var(--accent)" :size="25" />
      <h1 class="stats-title">Total Anime</h1>
      <h1 class="stats-value">{{ data.anime }}</h1>
    </div>
    
    <div class="stats-card">
      <IconBook class="stats-icon" color="var(--accent)" :size="25" />
      <h1 class="stats-title">Total Manga</h1>
      <h1 class="stats-value">{{ data.manga }}</h1>
    </div>
    <div class="stats-card">
      <IconBookOpenText class="stats-icon" color="var(--accent)" :size="25" />
      <h1 class="stats-title">Total Novels</h1>
      <h1 class="stats-value">{{ data.novels }}</h1>
    </div>
    <div class="stats-card">
      <IconClock class="stats-icon" color="var(--accent)" :size="25" />
      <h1 class="stats-title">Total Skip's</h1>
      <h1 class="stats-value">{{ data.skipTimes }}</h1>
      </div>
  </div>

</template>


<script setup>
  import "~/assets/css/stats.css";
  const { data } = await useFetch('https://api.anify.tv/stats')
  </script>