<template>
    <div class="prose">
      <h1>Dang</h1>
            <p>
              <strong>{{ error.message }}</strong>
            </p>
      <p>It looks like something broke.</p>
      <p>Sorry about that.</p>
      <button @click="handleError">Go Home</button>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    error: Object
  })
  
  const handleError = () => clearError({ redirect: '/' })
  </script>