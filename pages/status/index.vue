<script lang="ts" setup>
import "~/assets/css/status.css";

import axios from "axios";
interface ServerOutline {
  url: string
  altName: string
  status: 'loading...' | 'Error!' | 'Working!'
}
const { data: servers, pending } = useAsyncData(async () => {
  const responses = await Promise.allSettled([
  { url: "https://api.anify.tv", altName: "API", status: "loading..." },
  { url: "https://m3u8.pyth0n.software/", altName: "M3U8", status: "loading..." },
  { url: "http://localhost:3000", altName: "Website", status: "loading..." },
  ].map(async (server) => {
    try {
      const response = await axios.get(server.url)
      if (response.status < 200 || response.status > 299) {
        return { ...server, status: 'Error!' }
      }
    } catch (_) {
      return { ...server, status: 'Error!' }
    }
    return { ...server, status: 'Working!' }
  }))

  return (responses.filter(res => res.status === 'fulfilled') as PromiseFulfilledResult<ServerOutline>[]).map(({ value }) => value)
})
</script>
<template>
  <div class="container">
    <div class="page-content">
      <h1 class="server-status-heading">Status</h1>
      <p v-if="pending">Loading...</p>
      <template class="status-container" v-else-if="servers?.length">
        <div
          class="status-container"
          v-for="server in servers"
          :key="server.url"
        >
          <div class="status-text">
            <h1 class="alt-name">{{ server.altName }}</h1>
            <h1
              :style="{ color: server.status === 'Error!' ? 'red' : '#3DED97' }"
            >
              <IconCheck :size="18" v-if="server.status === 'Working!'" />
              <IconAlertOctagon :size="18" v-else-if="server.status === 'Error!'" />
              {{ server.status }}
            </h1>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
