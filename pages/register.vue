<script setup lang="ts">
import { ref } from "vue";
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";

const { register } = useFirebaseAuth();

const toast = useToast();

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Must be at least 8 characters"),
});

type Schema = z.output<typeof schema>;

const state = reactive({
  email: undefined,
  password: undefined,
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with data
  console.log(event.data);
  try {
    await register(event.data.email, event.data.password);
    toast.add({
      title: "Redirigiendo al dashboard",
      timeout: 2000,
      callback: async() => {
        await navigateTo('/dashboard')
      },
    });
  } catch (error) {
    console.log(error);
  }
}


</script>

<template>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <UFormGroup label="Email" name="email">
      <UInput v-model.trim="state.email" />
    </UFormGroup>

    <UFormGroup label="Password" name="password">
      <UInput v-model.trim="state.password" type="password" />
    </UFormGroup>

    <UButton type="submit"> Submit <v-icon>mdi-home</v-icon> </UButton>
  </UForm>
</template>