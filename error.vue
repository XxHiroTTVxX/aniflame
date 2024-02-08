<template>
   <NuxtLayout>
  <div class="error-container">
    <div class="error-icon">
    <IconXCircle :size="80" />
  </div>
    <h1>Error</h1>
    <div class="error-info">
      <h2>Uh Oh!</h2>

    <p class="error-code">
      <strong>{{ error.statusCode }}</strong>
      <p class="error-message">{{ error.message }}</p>
    </p>
  </div>
  <div class="divider-container">
    <div class="divider"></div>
  </div>
  <button class="home-button" @click="handleError">Go Home</button>

      <p>Oops! It seems that an error has occurred. We apologize for the inconvenience and are actively working to resolve it.</p>
      <p>Please try refreshing the page. If the issue persists, kindly report it in our <a href="dsc.gg/rubynetwork">Discord</a>.</p>
    </div>
  </NuxtLayout>
</template>
  
<script setup>
const props = defineProps({
  error: Object
})

const handleError = () => clearError({ redirect: '/' })
</script>

<style scoped>
.error-container {
  text-align: center;
  margin-top: 8rem;
  margin-bottom: 7rem;
}

.home-button {
  font-size: 16px;
  color: var(--text-color);
  background-color: var(--primary);
  margin-bottom: 1.5rem;
  padding: 14px 32px;
  letter-spacing: 1px;
  transition: all 0.3s ease-in-out;
  border-radius: 0.5rem;
}

.home-button:hover {
  background-color: var(--text-color);
  color: var(--primary);
}

.divider-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.divider {
  height: 0.7rem;
  margin-bottom: 2rem;
  margin-top: 1.4rem;
  border-radius: 1rem;
  width: 5rem;
  background-color: gray;
}

.error-icon {
  margin-bottom: 2rem;
}

.error-code {
  color: var(--accent) ;
  font-size: 2.5rem;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
}

.error-message {
  font-size: 1.5rem;
  color: var(--text-color);
  margin-top: 1.5rem;
}

p {
  font-size: 1.4rem;
}

a {
  color: var(--accent);
}

a:hover {
  color: var(--primary);
}

h1 {
  font-size: 4.5rem;
}
</style>