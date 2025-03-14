<template>
    <section>
        <section>
            <a href="/home">Volver a inicio</a>
        </section>

        <section class="bg-black-lighter p-4 shadow">
            <div class="md:flex">
                <h2 class="md:w-1/3 uppercase tracking-wide text-sm sm:text-lg mb-6">Agregar productos</h2>
            </div>
            
            <form @submit.prevent="guardarProductos">
                <!-- Selección de Cliente -->
                <div class="mb-4">
                    <label class="block uppercase tracking-wide text-xs font-bold text-gray-50">Cliente</label>
                    <select v-model="formData.idClient" class="w-full shadow-inner p-4 border-0 text-black">
                        <option value="" disabled>Selecciona un cliente</option>
                        <option v-for="cliente in listaClientes" :key="cliente.id" :value="cliente.id">
                            {{ cliente.nombre }}
                        </option>
                    </select>
                </div>

                <!-- Selección de Empleado -->
                <div class="mb-4">
                    <label class="block uppercase tracking-wide text-xs font-bold text-gray-50">Empleado</label>
                    <select v-model="formData.idEmployee" class="w-full shadow-inner p-4 border-0 text-black">
                        <option value="" disabled>Selecciona un empleado</option>
                        <option v-for="empleado in listaEmpleados" :key="empleado.id" :value="empleado.id">
                            {{ empleado.nombre }}
                        </option>
                    </select>
                </div>

                <!-- Lista de Productos -->
                <div v-for="(producto, index) in formData.products" :key="index" class="md:flex mb-8 border border-cream-dark p-4 rounded-md bg-gray-900">
                    <div class="md:w-1/3">
                        <legend class="uppercase tracking-wide text-sm text-white">Producto {{ index + 1 }}</legend>
                        <p class="text-xs font-light text-red">Selecciona el producto y cantidad.</p>
                    </div>
                    <div class="md:flex-1 mt-2 md:px-3">
                        <div class="mb-4">
                            <label class="block uppercase tracking-wide text-xs font-bold text-gray-50">Producto</label>
                            <select v-model="producto.idProduct" class="w-full shadow-inner p-4 border-0 text-black">
                                <option value="" disabled>Selecciona un producto</option>
                                <option v-for="item in listaProductos" :key="item.id" :value="item.id">
                                    {{ item.nombre }}
                                </option>
                            </select>
                        </div>
                        <div class="mb-4">
                            <label class="block uppercase tracking-wide text-xs font-bold text-gray-50">Cantidad</label>
                            <input
                                v-model="producto.quantity"
                                class="w-full shadow-inner p-4 border-0 text-black"
                                type="number"
                                min="1"
                            />
                        </div>
                    </div>
                    <div class="md:w-1/3 flex justify-center items-center">
                        <button v-if="formData.products.length > 1" @click="eliminarProducto(index)" class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition">
                            Eliminar
                        </button>
                    </div>
                </div>

                <!-- Botón para agregar más productos -->
                <div class="md:flex mb-6 border border-t-1 border-b-0 border-x-0 border-cream-dark">
                    <div class="md:flex-1 px-3 text-center md:text-right">
                        <button type="button" @click="agregarProducto" class="button text-cream-lighter bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-md">
                            Agregar Producto
                        </button>
                    </div>
                </div>

                <!-- Botón para guardar los productos -->
                <div class="md:flex mb-6 border border-t-1 border-b-0 border-x-0 border-cream-dark">
                    <div class="md:flex-1 px-3 text-center md:text-right">
                        <button class="button text-cream-lighter bg-brick hover:bg-brick-dark px-6 py-2 rounded-md" type="submit" :disabled="loading">
                            {{ loading ? "Guardando..." : "Guardar Productos" }}
                        </button>
                    </div>
                </div>
            </form>
        </section>
    </section>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";

// Objeto con todos los valores del formulario
const formData = ref({
    idClient: "",
    idEmployee: "",
    products: [{ idProduct: "", quantity: 1 }], // Inicializa con un solo producto
});

const listaProductos = ref([]);
const listaClientes = ref([]);
const listaEmpleados = ref([]);
const loading = ref(false);

onMounted(async () => {
    obtenerProductos();
    obtenerClientes();
    obtenerEmpleados();
});

const obtenerProductos = async () => {
    try {
        const respuesta = await axios.get("http://localhost:8080/product");
        console.log("Respuesta :: ", respuesta.data);
        listaProductos.value = respuesta.data._embedded.product.map((p) => ({
            id: p._links.self.href.split('/').pop(),
            nombre: p.fullName,
        }));
    } catch (error) {
        console.error("Error al obtener productos:", error);
    }
};

const obtenerClientes = async () => {
    try {
        const respuesta = await axios.get("http://localhost:8080/client");
        listaClientes.value = respuesta.data._embedded.client.map((c) => ({
            id: c._links.self.href.split('/').pop(),
            nombre: c.name,
        }));
    } catch (error) {
        console.error("Error al obtener clientes:", error);
    }
};

const obtenerEmpleados = async () => {
    try {
        const respuesta = await axios.get("http://localhost:8080/employee");
        listaEmpleados.value = respuesta.data._embedded.employee.map((e) => ({
            id: e._links.self.href.split('/').pop(),
            nombre: e.name,
        }));
    } catch (error) {
        console.error("Error al obtener empleados:", error);
    }
};

const agregarProducto = () => {
    formData.value.products.push({ idProduct: "", quantity: 1 });
};

const eliminarProducto = (index) => {
    formData.value.products.splice(index, 1);
};

const guardarProductos = async () => {
    if (!formData.value.idClient) {
        alert("Debe seleccionar un cliente.");
        return;
    }
    if (!formData.value.idEmployee) {
        alert("Debe seleccionar un empleado.");
        return;
    }
    if (formData.value.products.some((p) => !p.idProduct || p.quantity <= 0)) {
        alert("Todos los productos deben tener nombre y cantidad válida.");
        return;
    }

    loading.value = true;
    try {
        const response = await axios.post("http://localhost:8080/sell", formData.value);
        console.log("Respuesta :: ", response);
        alert("Productos guardados exitosamente.");

        // Reiniciar valores
        formData.value = {
            idClient: "",
            idEmployee: "",
            products: [{ idProduct: "", quantity: 1 }],
        };
    } catch (error) {
        console.error("Error al guardar productos:", error);
        alert("Error al guardar productos.");
    } finally {
        loading.value = false;
    }
};
</script>
