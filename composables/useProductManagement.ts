import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { uploadImage } from '~/utils/storageUtils'; // Ajusta la ruta si es necesario

interface Product {
  nombre: string;
  descripcion: string;
  precio: number;
  precio_anterior?: number;
  imagenes: string[];
  marca: string;
  sku: string;
  stock: number;
  categoria: string; // Añadido para categoría
  tallas: string[];
}

export const useProductManagement = () => {
  const addProduct = async (product: Product, imageFiles: File[]) => {
    try {
      // Subir imágenes a la categoría especificada
      const imageUrls = await Promise.all(
        imageFiles.map(file => uploadImage(file, `products/${product.categoria}/${file.name}`))
      );

      const db = getFirestore();
      await addDoc(collection(db, 'zapshoes'), {
        ...product,
        imagenes: imageUrls,
      });
      console.log('Producto agregado con éxito');
    } catch (error) {
      console.error("Error adding product: ", error);
    }
  };

  return {
    addProduct,
  };
};
