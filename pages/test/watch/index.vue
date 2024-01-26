<template>
  <div class="player">
    <media-player title="Pokemon" src="https://m3u8.pyth0n.software/video/OJoKGgkKU39xx5DuuNOmuE85CezDjzIq7MEtFz%252BHhMH8XS7JWGIFY7Vvg9VVHmhezu7uMfmRwkRMf%252BNdECKdSwzNRPgrgwQa3v6izjznLe2VY996M70HFOyBhgnjKDQUS5SwQJV8QPfsRJoZiAkJTw%253D%253D/%7B%7D/.m3u8">
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