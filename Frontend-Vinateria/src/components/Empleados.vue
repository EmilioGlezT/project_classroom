<template>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">Nombre del Empleado</th>
                    <th scope="col" class="px-6 py-3">Puesto</th>
                    <th scope="col" class="px-6 py-3">Dirección</th>
                    <th scope="col" class="px-6 py-3">Correo</th>
                    <th scope="col" class="px-6 py-3">Acción</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="empleado in empleados" :key="empleado.id" class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                    <td class="px-6 py-4">{{empleado.name}}</td>
                    <td class="px-6 py-4">{{empleado.position_name}}</td>
                    <td class="px-6 py-4">{{ empleado.address }}</td>
                    <td class="px-6 py-4">{{ empleado.email }}</td>
                    <td class="px-6 py-4">
                        <a :href="`/edit-employee/${empleado.id}`" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Editar</a>
                        <br>
                        <button @click="eliminarEmpleado(empleado.id)" class="font-medium text-red-600 dark:text-red-500 hover:underline">Eliminar</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from 'axios';

const empleados = ref([]);

const obtenerEmpleados = async () => {
    try {
        const respuesta = await axios.get("http://localhost:8080/employee"); // Reemplaza con tu API real
        empleados.value = respuesta.data._embedded.employee.map((e, index) => ({
            id: e._links.self.href.split('/').pop(), // Extrae el ID desde la URL
            name: e.name,
            position_name: e.position_name,
            address: e.address,
            email: e.email
        }));
    } catch (error) {
        console.error("Error al obtener empleados:", error);
    }
};

const eliminarEmpleado = async (id) => {
    try {
        await axios.delete(`http://localhost:8080/employee/${id}`);
        empleados.value = empleados.value.filter(e => e.id !== id);
    } catch (error) {
        console.error("Error al eliminar empleado:", error);
    }
};

onMounted(obtenerEmpleados);
</script>