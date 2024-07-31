<script setup lang="ts">
  const {logout} = useFirebaseAuth();
</script>


<template>
  <div>
    <h4>Dashboard</h4>
    <UButton @click="logout">Salir</UButton>
  </div>
</template>