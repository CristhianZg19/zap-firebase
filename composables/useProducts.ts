import { ref } from 'vue';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

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
  tallas: string[];
}

export const useProducts = () => {
  const products = ref<Product[]>([]);
  const error = ref<string | null>(null);
  const loading = ref<boolean>(false);

  const fetchProducts = async () => {
    loading.value = true;
    try {
      const db = getFirestore();
      const querySnapshot = await getDocs(collection(db, "zapshoes"));

      products.value = querySnapshot.docs.map(doc => {
        const data = doc.data() as Omit<Product, 'id'>; 
        return {
          id: doc.id, 
          ...data
        };
      });
    } catch (err) {
      error.value = (err as Error).message;
      console.error("Error fetching products: ", err);
    } finally {
      loading.value = false;
    }
  };

  return {
    products,
    error,
    loading,
    fetchProducts,
  };
};
