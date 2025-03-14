<template>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">Venta</th>
                    <th scope="col" class="px-6 py-3">Fecha</th>
                    <th scope="col" class="px-6 py-3">Cliente</th>
                    <th scope="col" class="px-6 py-3">Empleado</th>
                    <th scope="col" class="px-6 py-3">Total</th>
                    <th scope="col" class="px-6 py-3">Acción</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="venta in ventas" :key="venta.id" class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                    <td class="px-6 py-4">{{venta.id}}</td>
                    <td class="px-6 py-4">{{venta.sellDate}}</td>
                    <td class="px-6 py-4">{{ venta.client.name }}</td>
                    <td class="px-6 py-4">{{ venta.employee.name }}</td>
                    <td class="px-6 py-4">{{ venta.total }}</td>
                    <td class="px-6 py-4">
                        <a :href="`/edit-sale/${venta.id}`" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Editar</a>
                        <br>
                        <button @click="eliminarVenta(venta.id)" class="font-medium text-red-600 dark:text-red-500 hover:underline">Eliminar</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from 'axios';

const ventas = ref([]);

const obtenerVentas = async () => {
    try {
        const respuesta = await axios.get("http://localhost:8080/sell");
        console.log("Resúesta :: ", respuesta.data)
        /*ventas.value = respuesta.data._embedded.sale.map((v, index) => ({
            id: v._links.self.href.split('/').pop(),
            sellDate: v.sellDate,
            client: v.client,
            employee: v.employee,
            total: v.total
        }));*/
    } catch (error) {
        console.error("Error al obtener ventas:", error);
    }
};

const eliminarVenta = async (id) => {
    try {
        await axios.delete(`http://localhost:8080/sell/${id}`);
        ventas.value = ventas.value.filter(v => v.id !== id);
    } catch (error) {
        console.error("Error al eliminar venta:", error);
    }
};

onMounted(obtenerVentas);
</script>