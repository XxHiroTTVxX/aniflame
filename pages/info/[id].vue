<template>
  <div v-if="pending"><InfoSkeleton /></div>
  <div class="info-container" v-else-if="data">
    <div class="thumbnail">
      <img v-if="poster.length > 0" :src="poster[0].img" alt="Error" />
    </div>
    <div class="titles">
      <div class="info">
        <h1 class="english" v-if="data.title.english">
          {{ data.title.english }}
        </h1>
        <h2 class="romaji" v-if="data.title.romaji">
          {{ data.title.romaji }}
        </h2>
        <h3 class="native" v-if="data.title.native">
          {{ data.title.native }}
        </h3>

        <div class="button-container">
          <a>
            <button class="watch-now-button">Watch Now</button>
          </a>
        </div>
        <div class="genre-season">
          <div class="genres">
            <span
              class="genre"
              v-for="genre in data.genres.slice(0, 7)"
              :key="genre"
              >{{ genre }}</span
            >
          </div>
          <div class="season-container">
            <div class="season">
              <IconSun v-if="data.season == 'SUMMER'" />
              <IconSnowflake v-if="data.season == 'WINTER'" />
              <IconFlower v-if="data.season == 'SPRING'" />
              <IconLeaf v-if="data.season == 'FALL'" />
              <IconXCircle v-if="data.season == 'NONE'" />
            </div>
            <span class="year">{{ data.season }} {{ data.year }}</span>
          </div>
        </div>
      </div>

      <div class="test">
        <div class="rating-container">
          <div class="rating-icon">
            <IconStar />
          </div>
          <span class="average-rating"
            >{{ data.averageRating.toFixed(0) }}/10</span
          >
        </div>

        <div class="popularity-container">
          <div class="rating-icon">
            <IconBookmark />
          </div>
          <span class="average-popularity"
            >{{ (data.averagePopularity / 1000).toFixed(0) }}k</span
          >
        </div>
      </div>

      <div class="description">
        <p @click="showDesc = !showDesc">
          <span
            v-html="
              showDesc
                ? data.description
                : data.description.length > 500
                ? data.description.substr(0, 500) + '...'
                : data.description
            "
          ></span>
        </p>

        <span
          class="showMoreLess"
          v-if="data.description.length > 500"
          @click="showDesc = !showDesc"
          >{{ showDesc ? "Show less" : "Show more" }}</span
        >
      </div>

      <div class="separator-container">
        <hr class="separator" />
        <div class="provider-selector">
          <select>
            
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArtworkType, ProviderID, type Info } from "~/types/info";
import "~/assets/css/info.css";

const showDesc = ref(false);

const route = useRoute();

const { pending, data } = await useLazyFetch<Info>(
  `/api/info/${route.params.id}`,
  {
    server: false,
  }
);

const priorityList: ProviderID[] = [
  ProviderID.Tvdb,
  ProviderID.Anilist,
  ProviderID.Kitsu,
];
const poster = computed(() => {
  if (!data.value) return [];
  let posters =
    data.value?.artwork?.filter(
      (x: { type: ArtworkType }) => x.type === ArtworkType.Poster
    ) ?? [];
  posters.sort(
    (a: { providerId: ProviderID }, b: { providerId: ProviderID }) =>
      priorityList.indexOf(a.providerId) - priorityList.indexOf(b.providerId)
  );
  return posters;
});


</script>
