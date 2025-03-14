<template>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text=gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">Nombre del Proveedor</th>
                    <th scope="col" class="px-6 py-3">Dirección</th>
                    <th scope="col" class="px-6 py-3">Telefono</th>
                    <th scope="col" class="px-6 py-3">Acción</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="proveedor in proveedores" :key="proveedor.id" class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                    <td class="px-6 py-4">{{proveedor.name}}</td>
                    <td class="px-6 py-4">{{ proveedor.address }}</td>
                    <td class="px-6 py-4">{{ proveedor.tel }}</td>
                    <td class="px-6 py-4">
                        <a :href="`/edit-provider/${proveedor.id}`" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Editar</a>
                        <br>
                        <button @click="eliminarProveedor(proveedor.id)" class="font-medium text-red-600 dark:text-red-500 hover:underline">Eliminar</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from 'axios';

const proveedores = ref([]);

const obtenerProveedores = async () => {
    try {
            const response = await axios.get("http://localhost:8080/supplier");
            proveedores.value = response.data._embedded.supplier.map((s, index) => ({
            id: s._links.self.href.split('/').pop(),
            name: s.name,
            address: s.address,
            tel: s.tel
        }));
    } catch (error) {
        console.error("Error al obtener proveedores:", error);
    }
};

const eliminarProveedor = async (id) => {
    try {
        await axios.delete(`http://localhost:8080/supplier/${id}`);
        proveedores.value = proveedores.value.filter(p => p.id !== id);
    } catch (error) {
        console.error("Error al eliminar proveedor:", error);
    }
};

onMounted(obtenerProveedores);
</script>