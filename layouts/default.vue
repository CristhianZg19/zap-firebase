<template>
  <div class="flex flex-col min-h-screen bg-gray-100">
    <!-- Navbar -->
    <NavBar />


    <!-- Main Content -->
    <div class="flex-grow flex items-center justify-center pt-4 ">
      <UCard class="w-full bg-white rounded-lg shadow-md">
       

        <div class="mb-3">
          <slot />
        </div>

        <UNotifications />
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import NavBar from '~/layouts/NavBar.vue'; // Ajusta la ruta según la ubicación de tu componente

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<style scoped>
/* No additional styles are needed as we are using Tailwind CSS */



</style>
