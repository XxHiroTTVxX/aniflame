<template>
  <div :class="{ rounded }" class="skeleton">
  </div>
</template>

<script lang="ts" setup>
defineProps({
  w: {
      type: [Number, String],
      default: "auto",
  },
  h: {
      type:[Number, String],
      default: "auto",
  },
  rounded: {
      type: Boolean,
      default: false,
  },
  borderRadius: {
      type: [Number, String],
      default: "0.3rem",
  }
})
</script>

<style scoped>

.skeleton {
  width: v-bind(w);
  height: v-bind(h);
  border-radius: v-bind(borderRadius);
  border-color: transparent;
  background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.1) 0,
      rgba(255, 255, 255, 0.18) 50%,
      rgba(255, 255, 255, 0.1) 100%
  );
  background-size: 200% 110%;
  animation: skeleton 3.7s linear infinite backwards;
}

.skeleton.rounded {
  border-radius: 50%;
}

@keyframes skeleton {
  0% {
      background-position: 200% 0;
  }
  100% {
      background-position: 0% 0;
  }
}
</style>