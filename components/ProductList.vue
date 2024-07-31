<template>
  <div
    class="w-full min-h-screen max-w-8xl mx-auto bg-white p-6 rounded-lg shadow-lg"
  >
    <!-- Mostrar mensaje de carga -->
    <div v-if="loading" class="text-center text-gray-500">Cargando...</div>

    <!-- Mostrar mensaje de error -->
    <div v-if="error" class="text-center text-red-500 mb-4">{{ error }}</div>

    <!-- Mostrar productos -->
    <div
      v-if="!loading && !error && products.length === 0"
      class="text-center text-gray-500"
    >
      No hay productos disponibles.
    </div>

    <div
      v-if="!loading && !error && products.length > 0"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      <div
        v-for="product in products"
        :key="product.id"
        class="bg-white p-2 rounded-lg shadow-md"
      >
        <nuxt-link :to="`/products/${product.id}`">
          <img
            :src="product.imagenes[0]"
            alt=""
            class="w-full h-48 object-cover mb-2"
          />
        </nuxt-link>

        <h2 class="text-xl font-semibold text-gray-700">
          {{ product.nombre }}
        </h2>
        <p class="text-gray-500">{{ product.descripcion }}</p>
        <div class="mt-4 flex items-center justify-between">
          <span class="text-lg font-bold text-blue-600"
            >S/{{ product.precio.toFixed(2) }}</span
          >
          <span
            v-if="product.precio_anterior"
            class="text-sm line-through text-gray-500"
            >S/{{ product.precio_anterior.toFixed(2) }}</span
          >
        </div>
        <div class="mt-2 text-sm text-gray-600">
          <span>SKU: {{ product.sku }}</span> |
          <span>Stock: {{ product.stock }}</span>
          <span class="float-right text-red-700">
            {{
              product.sexo === "0"
                ? "Hombre"
                : product.sexo === "1"
                ? "Mujer"
                : "Ambos"
            }}
          </span>
        </div>
        <div class="mt-2 text-sm text-gray-600">
        <h3 class="text-lg font-semibold mb-2">Tallas Disponibles:</h3>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="(talla, index) in product.tallas"
            :key="index"
            class="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg shadow-sm hover:bg-gray-300 transition"
          >
            {{ talla }}
          </span>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
const { products, error, loading, fetchProducts } = useProducts();

onMounted(() => {
  fetchProducts();
});
</script>

<style scoped>
/* Puedes añadir estilos adicionales aquí si es necesario */
</style>
