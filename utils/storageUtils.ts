import { ref, uploadBytes, getDownloadURL, getStorage } from 'firebase/storage';
import { useNuxtApp } from '#app'; // Importa useNuxtApp para acceder a la instancia de Firebase

export const uploadImage = async (file: File, path: string): Promise<string> => {
  const { $storage } = useNuxtApp();

  const imageRef = ref($storage, path);
  await uploadBytes(imageRef, file);
  return getDownloadURL(imageRef);
};
