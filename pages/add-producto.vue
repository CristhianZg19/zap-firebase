<template>
  <div class="max-w-7xl mx-auto p-8 bg-white shadow-md rounded-lg">
    <h2 class="text-3xl font-semibold mb-6 text-gray-800">Agregar Producto</h2>
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <!-- Campos existentes -->
        <div>
          <label for="nombre" class="block text-gray-700 font-medium mb-1"
            >Nombre</label
          >
          <input
            id="nombre"
            v-model="product.nombre"
            type="text"
            placeholder="Nombre del producto"
            class="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label for="descripcion" class="block text-gray-700 font-medium mb-1"
            >Descripción</label
          >
          <textarea
            id="descripcion"
            v-model="product.descripcion"
            placeholder="Descripción del producto"
            class="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
          ></textarea>
        </div>
        <div>
          <label for="precio" class="block text-gray-700 font-medium mb-1"
            >Precio</label
          >
          <input
            id="precio"
            v-model.number="product.precio"
            type="number"
            placeholder="Precio"
            class="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            for="precio_anterior"
            class="block text-gray-700 font-medium mb-1"
            >Precio Anterior</label
          >
          <input
            id="precio_anterior"
            v-model.number="product.precio_anterior"
            type="number"
            placeholder="Precio Anterior"
            class="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label for="marca" class="block text-gray-700 font-medium mb-1"
            >Marca</label
          >
          <input
            id="marca"
            v-model="product.marca"
            type="text"
            placeholder="Marca"
            class="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label for="sku" class="block text-gray-700 font-medium mb-1"
            >SKU</label
          >
          <input
            id="sku"
            v-model="product.sku"
            type="text"
            placeholder="SKU"
            class="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label for="stock" class="block text-gray-700 font-medium mb-1"
            >Stock</label
          >
          <input
            id="stock"
            v-model.number="product.stock"
            type="number"
            placeholder="Stock"
            class="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label for="categoria" class="block text-gray-700 font-medium mb-1"
            >Categoría</label
          >
          <input
            id="categoria"
            v-model="product.categoria"
            type="text"
            placeholder="Categoría"
            class="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label for="sexo" class="block text-gray-700 font-medium mb-1"
            >Sexo</label
          >
          <select
            id="sexo"
            v-model="product.sexo"
            class="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="0">Varón</option>
            <option value="1">Damas</option>
            <option value="2">Ambos</option>
          </select>
        </div>
      </div>

      <div>
        <label for="tallas" class="block text-gray-700 font-medium mb-1"
          >Tallas Disponibles</label
        >
        <div class="flex flex-wrap gap-2 mb-4">
          <div
            v-for="(talla, index) in product.tallas"
            :key="index"
            class="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg shadow-sm relative"
          >
            {{ talla }}
            <button
              @click="removeTalla(index)"
              type="button"
              class="absolute top-0 right-0 mt-1 mr-1 text-red-500 hover:text-red-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            id="nueva-talla"
            v-model="newTalla"
            type="text"
            placeholder="Añadir nueva talla"
            class="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          @click="addTalla"
          type="button"
          class="mt-2 bg-blue-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-600 transition duration-200"
        >
          Añadir Talla
        </button>
      </div>

      <div>
        <label for="imagenes" class="block text-gray-700 font-medium mb-1"
          >Imágenes</label
        >
        <input
          id="imagenes"
          type="file"
          @change="handleImageFiles"
          multiple
          class="max-w-8x1 text-gray-700 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div class="flex flex-wrap gap-2 mt-4">
          <img
            v-for="(file, index) in imageFiles"
            :key="index"
            :src="URL.createObjectURL(file)"
            alt="Vista previa"
            class="w-24 h-24 object-cover rounded-lg shadow-sm"
          />
        </div>
      </div>

      <button
        type="submit"
        class="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-200"
      >
        Añadir Producto
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useProductManagement } from "~/composables/useProductManagement"; // Ajusta la ruta según tu estructura

const { addProduct } = useProductManagement();

const product = ref({
  nombre: "",
  descripcion: "",
  precio: 0,
  precio_anterior: 0,
  imagenes: [],
  marca: "",
  sku: "",
  stock: 0,
  categoria: "",
  sexo: "0",
  tallas: [] as string[],
});

const newTalla = ref("");

const imageFiles = ref<File[]>([]);

const handleImageFiles = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files) {
    imageFiles.value = Array.from(target.files);
  }
};

const addTalla = () => {
  if (newTalla.value.trim() !== "") {
    product.value.tallas.push(newTalla.value.trim());
    newTalla.value = "";
  }
};

const removeTalla = (index: number) => {
  product.value.tallas.splice(index, 1);
};

const resetForm = () => {
  product.value = {
    nombre: "",
    descripcion: "",
    precio: 0,
    precio_anterior: 0,
    imagenes: [],
    marca: "",
    sku: "",
    stock: 0,
    categoria: "",
    sexo: "0",
    tallas: [],
  };
  imageFiles.value = [];
};

const handleSubmit = async () => {
  if (product.value && imageFiles.value.length) {
    await addProduct(product.value, imageFiles.value);
    alert("Producto añadido con éxito");
    resetForm();
  } else {
    alert(
      "Por favor, completa todos los campos y selecciona al menos una imagen."
    );
  }
};
</script>

<style scoped>
/* Puedes ajustar estos estilos según tu diseño */
</style>
