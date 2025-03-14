<template>
    <section>
        <!-- Navegación -->
        <section>
            <a href="/Home">Volver a inicio</a>
        </section>

        <section class="bg-black-lighter p-4 shadow">
            <div class="md:flex">
                <h2 class="md:w-1/3 uppercase tracking-wide text-sm sm:text-lg mb-6">Editar proveedor</h2>
            </div>
            <form @submit.prevent="editarProveedor">
                <div class="md:flex mb-8">
                    <div class="md:w-1/3">
                        <legend class="uppercase tracking-wide text-sm">Datos del proveedor a editar</legend>
                        <p class="text-xs font-light text-red">Edita los datos básicos del proveedor.</p>
                    </div>
                    <div class="md:flex-1 mt-2 mb:mt-0 md:px-3">
                        <div class="mb-4">
                            <label class="block uppercase tracking-wide text-xs font-bold text-gray-50">Nombre</label>
                            <input v-model="formData.name" class="w-full shadow-inner p-4 border-0 text-black" type="text" placeholder="Nombre del proveedor">
                        </div>
                        <div class="md:flex mb-4">
                            <div class="md:flex-1 md:pr-3">
                                <label class="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">Dirección</label>
                                <input v-model="formData.address" class="w-full shadow-inner p-4 border-0 text-black" type="text" placeholder="Dirección">
                            </div>
                            <div class="md:flex-1 md:pl-3">
                                <label class="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">Teléfono</label>
                                <input v-model="formData.tel" class="w-full shadow-inner p-4 border-0 text-black" type="text" placeholder="Teléfono">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="md:flex mb-6 border border-t-1 border-b-0 border-x-0 border-cream-dark">
                    <div class="md:flex-1 px-3 text-center md:text-right">
                        <button class="button text-cream-lighter bg-brick hover:bg-brick-dark" type="submit" :disabled="loading">
                            {{ loading ? "Enviando..." : "Editar proveedor" }}
                        </button>
                    </div>
                </div>
            </form>
        </section>
    </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";

const route = useRoute();
const idSupplier = route.params.id;

const formData = ref({
    name: "",
    address: "",
    tel: ""
});

const loading = ref(false);

const obtenerProveedor = async () => {
    try {
        const respuesta = await axios.get(`http://localhost:8080/supplier/${idSupplier}`);
        formData.value = {
            name: respuesta.data.name,
            address: respuesta.data.address,
            tel: respuesta.data.tel
        };
    } catch (error) {
        console.error("Error al obtener los datos del proveedor:", error);
    }
};

onMounted(() => {
    obtenerProveedor();
});

const editarProveedor = async () => {
    try {
        await axios.put(`http://localhost:8080/supplier/${idSupplier}`, formData.value);
        alert("Proveedor actualizado exitosamente");
    } catch (error) {
        console.error("Error al actualizar el proveedor:", error);
    }
};
</script>