<template>
  <div class="player">
    <media-player title="Pokemon" src="https://eno.tendoloads.com/_v6/c6dedfb09ff7c7b5ba93dc1908b9f09bc96e6d037f616f9f2f8d095438482ca99c2d72934d49865e80155b644563c015e45cd018ba39b3908b8ea1d40c02d4605ccc8918c3129381ade992c544e7cccb3cf727122ab888647b6414c5c37012434de05e0ec7f875cfbc4919dfe17cee0033f85c49f068cadc7196dfa34e3e8f29/master.m3u8">
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