<script setup lang="ts">
import { ref } from "vue";
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";

const { login } = useFirebaseAuth();

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
    await login(event.data.email, event.data.password);
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
  <UForm :schema="schema" :state="state"  @submit="onSubmit">
    <UFormGroup label="Email" name="email" class="mb-2">
      <UInput v-model.trim="state.email" />
    </UFormGroup>

    <UFormGroup label="Password" name="password" class="mb-4" >
      <UInput v-model.trim="state.password" type="password" />
    </UFormGroup>

    <UButton type="submit"> Submit </UButton>
  </UForm>
</template>