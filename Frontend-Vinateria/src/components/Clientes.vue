<template>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">Nombre del Cliente</th>
                    <th scope="col" class="px-6 py-3">RFC</th>
                    <th scope="col" class="px-6 py-3">Dirección</th>
                    <th scope="col" class="px-6 py-3">Correo</th>
                    <th scope="col" class="px-6 py-3">Acción</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="cliente in clientes" :key="cliente.id" class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                    <td class="px-6 py-4">{{cliente.name}}</td>
                    <td class="px-6 py-4">{{cliente.rfc}}</td>
                    <td class="px-6 py-4">{{ cliente.address }}</td>
                    <td class="px-6 py-4">{{ cliente.email }}</td>
                    <td class="px-6 py-4">
                        <a :href="`/edit-client/${cliente.id}`" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Editar</a>
                        <br>
                        <button @click="eliminarCliente(cliente.id)" class="font-medium text-red-600 dark:text-red-500 hover:underline">Eliminar</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from 'axios';

const clientes = ref([]);

const obtenerClientes = async () => {
    try {
        const respuesta = await axios.get("http://localhost:8080/client"); // Reemplaza con tu API real
        clientes.value = respuesta.data._embedded.client.map((c, index) => ({
            id: c._links.self.href.split('/').pop(), // Extrae el ID desde la URL
            name: c.name,
            rfc: c.rfc,
            address: c.address,
            email: c.email
        }));
    } catch (error) {
        console.error("Error al obtener clientes:", error);
    }
};

const eliminarCliente = async (id) => {
    try {
        await axios.delete(`http://localhost:8080/client/${id}`);
        clientes.value = clientes.value.filter(c => c.id !== id);
    } catch (error) {
        console.error("Error al eliminar cliente:", error);
    }
};

onMounted(obtenerClientes);
</script>