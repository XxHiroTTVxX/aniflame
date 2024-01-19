<template>
  <div class="player">
    <media-player title="Pokemon" src="https://anify.anistreme.live/video/YrPhp%252BdQooA0%252B4IP6o4sRp7siYUb9pF3R1MFzIBdmL08aN9X9pSsmK3e62lHCczmZX26qEEZuq1qJDMvJZI9mtxD17jCJjn0u%252FU%252BGeNlMTy6awoqUB4QhmzfXoZOa5HU8lnP3MItIeh0fYNlHoTYhnabrwnzw8HR11UiobqAAVY%253D/%7B%7D/.m3u8">
  <media-provider></media-provider>
  <media-video-layout></media-video-layout>
</media-player>
  </div>
</template>

<script lang="ts">
import 'vidstack/player/styles/default/theme.css';
import 'vidstack/player/styles/default/layouts/video.css';
import 'vidstack/player';
import 'vidstack/player/layouts';
import 'vidstack/player/ui';
</script>

<style scoped>
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