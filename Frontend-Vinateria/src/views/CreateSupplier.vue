<template>
    <section>
        <!-- component -->

        <section>
            <a href="/Home">Volver a inicio</a>
        </section>

        <section class="bg-black-lighter p-4 shadow">
            <div class="md:flex">
                <h2 class="md:w-1/3 uppercase tracking-wide text-sm sm:text-lg mb-6">Crear un proovedor nuevo</h2>
            </div>
            <form @submit.prevent="submitForm">
                <div class="md:flex mb-8">
                    <div class="md:w-1/3">
                        <legend class="uppercase tracking-wide text-sm">Datos del proovedor</legend>
                        <p class="text-xs font-light text-red">Ingresa los datos basicos del proovedor.</p>
                    </div>
                    <div class="md:flex-1 mt-2 mb:mt-0 md:px-3">
                        <div class="mb-4">
                            <label class="block uppercase tracking-wide text-xs font-bold text-gray-50">Nombre</label>
                            <input v-model="formData.name" class="w-full shadow-inner p-4 border-0 text-black" type="text" placeholder="Nombre del proveedor">
                        </div>
                        <div class="md:flex mb-4">
                            <div class="md:flex-1 md:pr-3">
                                <label
                                    class="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">Address</label>
                                    <input v-model="formData.address" class="w-full shadow-inner p-4 border-0 text-black" type="text" placeholder="Dirección">
                            </div>
                            <div class="md:flex-1 md:pl-3">
                                <label
                                    class="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">Telefono de contacto
                                    </label>
                                    <input v-model="formData.tel" class="w-full shadow-inner p-4 border-0 text-black" type="text" placeholder="Teléfono">
                            </div>
                        </div>
                        
                    </div>
                </div>
                
                <!-- <div class="md:flex mb-6">
                    <div class="md:w-1/3">
                        <legend class="uppercase tracking-wide text-sm">Descripcion</legend>
                    </div>
                    <div class="md:flex-1 mt-2 mb:mt-0 md:px-3">
                        <textarea class="w-full shadow-inner p-4 border-0 text-black" placeholder=""
                            rows="6"></textarea>
                    </div>
                </div> -->
                <div class="md:flex mb-6 border border-t-1 border-b-0 border-x-0 border-cream-dark">
                    <div class="md:flex-1 px-3 text-center md:text-right">
                        <button class="button text-cream-lighter bg-brick hover:bg-brick-dark" type="submit" :disabled="loading">
                            {{ loading ? "Enviando..." : "Crear proveedor" }}
                        </button>
                    </div>
                </div>
            </form>
        </section>
    </section>
</template>

<script setup>
import { DeprecationTypes } from 'vue';
import NavBar from '../components/NavBar.vue';
import { ref } from "vue";
import axios from "axios";
const formData = ref({
    name: "",
    address: "",
    tel: "",
});

const loading = ref(false);

const submitForm = async () => {
    if (!formData.value.name || !formData.value.address || !formData.value.tel) {
        alert("Todos los campos son obligatorios");
        return;
    }

    loading.value = true;
    try {
        const response = await axios.post("http://localhost:8080/supplier", formData.value);
        console.log("Proveedor creado:", response.data);
        alert("Proveedor creado exitosamente");
        formData.value = { name: "", address: "", tel: "" };
    } catch (error) {
        console.error("Error al crear proveedor:", error);
        alert("Hubo un error al registrar el proveedor");
    } finally {
        loading.value = false;
    }
};
</script>