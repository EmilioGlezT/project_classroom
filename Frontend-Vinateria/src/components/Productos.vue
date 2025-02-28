<template>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">Nombre del Vino</th>
            <th scope="col" class="px-6 py-3">Precio</th>
            <th scope="col" class="px-6 py-3">Categoría</th>
            <th scope="col" class="px-6 py-3">description</th>
            <th scope="col" class="px-6 py-3">Acción</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="producto in productos" :key="producto.id" class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
            
            <td class="px-6 py-4">{{producto.fullName}}</td>
            <td class="px-6 py-4">{{producto.price}}</td>
            <td class="px-6 py-4">{{ producto.category }}</td>
            <td class="px-6 py-4">{{ producto.description }}</td>


            <td class="px-6 py-4">
              <a :href="`/edit-product/${producto.id}`" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Editar</a>
              <br>
              <!-- <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Eliminar</a> -->
              <button @click="eliminarProducto(producto.id)" class="font-medium text-red-600 dark:text-red-500 hover:underline">Eliminar</button>
            </td>
          </tr>
          
        
          
        </tbody>
      </table>
    </div>
  </template>

  <script setup>
  import { ref, onMounted } from "vue";
  import axios, {isCancel, AxiosError} from 'axios';

  const productos = ref([]);

const obtenerProductos = async () => {
  try {
    const respuesta = await axios.get("http://localhost:8080/product"); // Reemplaza con tu API real
    console.log("Resúesta :: ", respuesta)
    // productos.value = respuesta.data._embedded.product;
    productos.value = respuesta.data._embedded.product.map((p, index) => ({
        id: p._links.self.href.split('/').pop(), // Extrae el ID desde la URL
        fullName: p.fullName,
        price: p.price,
        category: p.category,
        description: p.description
    }));
  } catch (error) {
    console.error("Error al obtener productos:", error);
  }
};

const eliminarProducto = async (id) => {
  if (!confirm("¿Estás seguro de que deseas eliminar este producto?")) return;
  console.log("id",id)
  try {
    await axios.delete(`http://localhost:8080/product/${id}`);
    productos.value = productos.value.filter(producto => producto.id !== id);
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
  }
};

// Llamar la API cuando el componente se monte
onMounted(obtenerProductos);

</script>