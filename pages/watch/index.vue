<template>
  <div class="player" v-if="data">
    <media-player v-if="sortedSources.length > 0" :src="sortedSources[0]?.url">
      <media-provider></media-provider>
      <media-video-layout></media-video-layout>
    </media-player>
  </div>
</template>


<script lang="ts" setup>
import "vidstack/player/styles/default/theme.css";
import "vidstack/player/styles/default/layouts/video.css";
import "vidstack/player";
import "vidstack/player/layouts";
import "vidstack/player/ui";

import type { Sources } from "~/types/sources";
const route = useRoute();

const { pending, data: fetchedData } = await useFetch<Sources>(`/api/sources/`, {
  query: {
    providerId: route.query.providerId,
    watchId: route.query.watchId,
    episodeNumber: route.query.episodeNumber,
    id: route.query.id,
    subType: route.query.subType,
  },
});

const data = reactive({
  sources: fetchedData.value?.sources
    ? fetchedData.value.sources.map((source) => ({
        url: source.url,
        quality: source.quality,
      }))
    : [],
});

const sortedSources = computed(() =>
  sortSourcesByQuality(
    data.sources.filter((source) => source.url && source.quality) as {
      url: string;
      quality: string;
    }[]
  )
);

function sortSourcesByQuality(sources: { url: string, quality: string }[]) {
  const qualityOrder = ['auto', 'default', '1080p', '720p', '480p', '360p'];
  return sources.sort((a, b) => {
    const aIndex = qualityOrder.indexOf(a.quality);
    const bIndex = qualityOrder.indexOf(b.quality);
    
    if (aIndex === -1) return 1; // Move sources with unknown quality to the end
    if (bIndex === -1) return -1; // Move sources with unknown quality to the end
    
    return aIndex - bIndex;
  });
}

console.log(data)

</script>

<style scoped>
media-player {
    aspect-ratio: 16/9;
    border-radius: 1rem;
}
.player {
    height: 40rem;
    width: 53rem;
    margin-top: 8rem;
    margin-left: 7rem;
}
</style>
