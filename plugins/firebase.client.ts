import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

export default defineNuxtPlugin((nuxtApp) => {
  console.log('Initializing Firebase');

  const { apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId } = useRuntimeConfig().public;
  console.log(apiKey);

  const firebaseConfig = {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const storage = getStorage(app);

  return {
    provide: {
      auth,
      storage,  // Agrega la instancia de storage aquí
    }
  }
});
