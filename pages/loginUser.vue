<script setup lang="ts">
import { reactive } from "vue";
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";

const { login, loginWithGoogle } = useFirebaseAuth();

const toast = useToast();

const schema = z.object({
  email: z.string().email("Correo electrónico inválido"),
  password: z.string().min(8, "Debe tener al menos 8 caracteres"),
});

type Schema = z.output<typeof schema>;

const state = reactive({
  email: undefined,
  password: undefined,
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  console.log(event.data);
  try {
    await login(event.data.email, event.data.password);
    toast.add({
      title: "Redirigiendo al dashboard",
      timeout: 2000,
      callback: async () => {
        await navigateTo("/dashboard");
      },
    });
  } catch (error) {
    console.log(error);
  }
}

async function onGoogleSignIn() {
  try {
    await loginWithGoogle();
    toast.add({
      title: "Redirigiendo al dashboard",
      timeout: 2000,
      callback: async () => {
        await navigateTo("/dashboard");
      },
    });
  } catch (error) {
    console.log(error);
  }
}

function redirectToRegister() {
  navigateTo("/register");
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
      <h2 class="text-2xl font-semibold text-center text-gray-700 mb-6">Iniciar Sesión</h2>
      <UForm :schema="schema" :state="state" @submit="onSubmit">
        <UFormGroup label="Correo Electrónico" name="email" class="mb-4">
          <UInput v-model.trim="state.email" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </UFormGroup>

        <UFormGroup label="Contraseña" name="password" class="mb-6">
          <UInput v-model.trim="state.password" type="password" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </UFormGroup>

        <UButton type="submit" class="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-200">Iniciar Sesión</UButton>
      </UForm>
      <div class="mt-4 text-center text-gray-500">O</div>
      <UButton @click="onGoogleSignIn" class="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition duration-200 mt-4 flex items-center justify-center">
        <svg class="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
          <path fill="#EA4335" d="M24 9.5c3.2 0 6.1 1.1 8.3 3.2l6.2-6.2C34.9 3.4 30.6 1.5 26 1.5 15.3 1.5 7 9.8 7 20.5c0 2.8.6 5.5 1.8 8L3 33c-2.5-4.3-4-9.3-4-14.5C-1 8.3 11.2-1 24-1s25 9.3 25 25c0 6.6-2.4 12.7-6.5 17.3l-6.2-6.2C37.9 35.9 40 30.1 40 24c0-4.2-1.3-8.1-3.5-11.4L32.4 9.5c-2.2-2.1-5.1-3.5-8.4-3.5-5.4 0-9.8 4.4-9.8 9.8S17 25.6 22.4 25.6h1.6v-5.6h-1.6c-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5h0z"/>
        </svg>
        Iniciar Sesión con Google
      </UButton>
      <UButton @click="redirectToRegister" class="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition duration-200 mt-4 flex items-center justify-center">
        <svg class="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 2a2 2 0 00-2 2v4H6a2 2 0 000 4h2v4a2 2 0 004 0v-4h2a2 2 0 000-4h-2V4a2 2 0 00-2-2z" />
        </svg>
        Registrarse
      </UButton>
    </div>
  </div>
</template>

<style scoped>
/* No additional styles are needed as we are using Tailwind CSS */
</style>
