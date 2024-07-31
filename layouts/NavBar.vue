<template>
  <nav class="bg-gray-800 text-white py-2 px-6 fixed w-full top-0 left-0 z-50">
    <div class="container mx-auto flex items-center justify-between">
      <!-- Logo or Brand Name -->
      <router-link to="/" class="hover:bg-gray-700 px-3 py-2 rounded">
        <div class="text-2xl font-semibold">ZapShoes</div>
      </router-link>

      <!-- Desktop Navigation Links -->
      <div class="hidden md:flex items-center space-x-6">
        <router-link to="/" class="hover:bg-gray-700 px-3 py-2 rounded"
          >Inicio</router-link
        >
      <!--   <router-link to="/hombres" class="hover:bg-gray-700 px-3 py-2 rounded"
          >Productos</router-link
        >
        <router-link to="/servicios" class="hover:bg-gray-700 px-3 py-2 rounded"
          >Ofertas</router-link
        > -->
        <router-link to="/loginUser" class="hover:bg-gray-700 px-3 py-2 rounded"
          >Login</router-link
        >

        <!-- Improved Color Scheme Selector -->
        <div class="relative">
          <ColorScheme>
            <USelect
              v-model="$colorMode.preference"
              :options="['system', 'light', 'dark']"
              class="bg-gray-700 text-white border border-gray-600 rounded-lg shadow-md"
            />
          </ColorScheme>
        </div>
      </div>

      <!-- Mobile Menu Button -->
      <button
        @click="toggleMenu"
        class="md:hidden text-white focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>
    </div>

    <!-- Mobile Menu Links -->
    <div v-show="isMenuOpen" class="md:hidden bg-gray-800 text-white">
      <router-link to="/" class="block px-4 py-2 hover:bg-gray-700"
        >Inicio</router-link
      >
     <!--  <router-link to="/productos" class="block px-4 py-2 hover:bg-gray-700"
        >Productos</router-link
      >
      <router-link to="/servicios" class="block px-4 py-2 hover:bg-gray-700"
        >Servicios</router-link
      > -->
      <router-link to="/loginUser" class="block px-4 py-2 hover:bg-gray-700"
        >Login</router-link
      >
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from "vue";

const isMenuOpen = ref(false);
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<style scoped>
/* Tailwind CSS styles are being used */

.theme-selector {
  @apply bg-gray-700 text-white border border-gray-600 rounded-lg shadow-md;
}

.theme-selector:hover {
  @apply bg-gray-600;
}

.theme-selector svg {
  @apply text-gray-400;
}
</style>
