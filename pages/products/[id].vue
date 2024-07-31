<template>
<div class="min-h-screen bg-gray-100 p-0 md:p-8">

    <div class="w-full max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h1 class="text-3xl font-semibold text-gray-800 mb-6">
        Detalles del Producto
      </h1>

      <!-- Mostrar detalles del producto -->
      <div v-if="product" class="bg-white p-6 rounded-lg shadow-md space-y-6">
        <!-- Carrusel de imágenes -->
        <div class="relative overflow-hidden rounded-lg">
          <div class="relative h-56 overflow-hidden rounded-lg md:h-96">
            <!-- Generate carousel items dynamically -->
            <div
              v-for="(image, index) in imageList"
              :key="index"
              class="absolute inset-0 transition-opacity duration-700 ease-in-out"
              :class="{
                'opacity-100': index === currentSlide,
                'opacity-0': index !== currentSlide,
                'transition-opacity': true,
              }"
              data-carousel-item
            >
              <div class="relative">
                <img
                  :src="image"
                  class="w-full h-full object-cover md:object-none"
                  :alt="`Image ${index + 1}`"
                />
              </div>
            </div>
          </div>

          <!-- Slider indicators -->
          <div
            class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3 rtl:space-x-reverse z-30"
          >
            <button
              v-for="(image, index) in imageList"
              :key="index"
              @click="currentSlide = index"
              class="w-3 h-3 rounded-full"
              :class="{
                'bg-blue-600': currentSlide === index,
                'bg-gray-400': currentSlide !== index,
              }"
              aria-label="Slide {{ index + 1 }}"
              data-carousel-slide-to="index"
            ></button>
          </div>

          <!-- Slider controls -->
          <button
            @click="prevSlide"
            class="absolute top-1/2 left-0 transform -translate-y-1/2 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none z-30"
            data-carousel-prev
          >
            <span
              class="w-10 h-10 flex items-center justify-center rounded-full bg-white/60 dark:bg-gray-800/60 group-hover:bg-white/80 dark:group-hover:bg-gray-800/80"
            >
              <svg
                class="w-4 h-4 text-gray-800 dark:text-gray-200 rtl:rotate-180"
                aria-hidden="true"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 1 1 5l4 4"
                />
              </svg>
              <span class="sr-only">Previous</span>
            </span>
          </button>
          <button
            @click="nextSlide"
            class="absolute top-1/2 right-0 transform -translate-y-1/2 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none z-30"
            data-carousel-next
          >
            <span
              class="w-10 h-10 flex items-center justify-center rounded-full bg-white/60 dark:bg-gray-800/60 group-hover:bg-white/80 dark:group-hover:bg-gray-800/80"
            >
              <svg
                class="w-4 h-4 text-gray-800 dark:text-gray-200 rtl:rotate-180"
                aria-hidden="true"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <span class="sr-only">Next</span>
            </span>
          </button>
        </div>

        <!-- Información del producto -->
        <div>
          <h2 class="text-2xl font-semibold text-gray-800 mb-2">
            {{ product.nombre }}
          </h2>
          <p class="text-gray-600 mb-4">{{ product.descripcion }}</p>
          <div class="flex items-center justify-between mb-4">
            <span class="text-2xl font-bold text-blue-600">
              S/{{ product.precio.toFixed(2) }}
            </span>
            <span
              v-if="product.precio_anterior"
              class="text-lg line-through text-gray-500"
            >
              S/{{ product.precio_anterior.toFixed(2) }}
            </span>
          </div>
          <div class="text-sm text-gray-600 mb-4">
            <span>SKU: {{ product.sku }}</span> |
            <span>Stock: {{ product.stock }}</span>
          </div>

          <!-- Botón de regreso -->
          <nuxt-link
            to="/"
            class="inline-block px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors duration-300"
          >
            Volver
          </nuxt-link>
        </div>
      </div>

      <!-- Mensaje de carga y error -->
      <div v-if="loading" class="text-center text-gray-500 mt-6">
        Cargando...
      </div>
      <div v-if="error" class="text-center text-red-500 mb-4 mt-6">
        {{ error }}
      </div>

      <!-- Mensaje cuando no hay producto -->
      <div
        v-if="!product && !loading && !error"
        class="text-center text-gray-500 mt-6"
      >
        No se encontró el producto.
      </div>
    </div>
  </div>
</template>
  
  <script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "#app";
import { useProducts } from "@/composables/useProducts";

// Define the type for a product
interface Product {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  precio_anterior?: number;
  imagenes: string[];
  marca: string;
  sku: string;
  stock: number;
  sexo: string;
}

const route = useRoute();
const { products, error, loading, fetchProducts } = useProducts();
const product = ref<Product | null>(null);
const currentSlide = ref(0);
const imageList = ref<string[]>([]);

onMounted(() => {
  fetchProducts().then(() => {
    const productId = route.params.id as string;
    product.value = products.value.find((p) => p.id === productId) || null;
    if (product.value) {
      imageList.value = product.value.imagenes;
    }
  });
});

const nextSlide = () => {
  if (imageList.value.length > 0) {
    currentSlide.value = (currentSlide.value + 1) % imageList.value.length;
  }
};

const prevSlide = () => {
  if (imageList.value.length > 0) {
    currentSlide.value =
      (currentSlide.value - 1 + imageList.value.length) %
      imageList.value.length;
  }
};
</script>
  
  <style scoped>
/* Estilos adicionales aquí si es necesario */
@media (max-width: 767px) {
  .relative img {
    object-fit: scale-down;
  }
}
</style>
  