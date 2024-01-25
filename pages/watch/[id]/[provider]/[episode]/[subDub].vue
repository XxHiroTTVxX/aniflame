<template>
  <div class="player">
    <media-player title="Pokemon" src="data.sources.url">
  <media-provider></media-provider>
  <media-video-layout></media-video-layout>
</media-player>
  </div>
</template>

<script lang="ts" setup>
import 'vidstack/player/styles/default/theme.css';
import 'vidstack/player/styles/default/layouts/video.css';
import 'vidstack/player';
import 'vidstack/player/layouts';
import 'vidstack/player/ui';


const route = useRoute();

const { data } = await useFetch(`/api/sources/${route.params.providerId}/${route.params.watchId}/${route.params.episode}/${route.params.id}/${route.params.subDub}`);
</script>

<style>
media-player {
    aspect-ratio: 16/9;
}
.player {
    height: 40rem;
    width: 60rem;
    margin-top: 8rem;
    margin-left: 4rem;
}
</style>