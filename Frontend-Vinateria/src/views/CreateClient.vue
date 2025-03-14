<template>
    <section>
        <section>
            <a href="/home">Volver a inicio</a>
        </section>

        <section class="bg-black-lighter p-4 shadow">
            <div class="md:flex">
                <h2 class="md:w-1/3 uppercase tracking-wide text-sm sm:text-lg mb-6">Crear un producto nuevo</h2>
            </div>
            <form @submit.prevent="submitForm">
                <div class="md:flex mb-8">
                    <div class="md:w-1/3">
                        <legend class="uppercase tracking-wide text-sm">Datos del cliente</legend>
                        <p class="text-xs font-light text-red">Ingresa los datos basicos del cliente.</p>
                    </div>
                    <div class="md:flex-1 mt-2 mb:mt-0 md:px-3">
                        <div class="mb-4">
                            <label class="block uppercase tracking-wide text-xs font-bold text-gray-50">Nombre completo</label>
                            <input v-model="formData.name" class="w-full shadow-inner p-4 border-0 text-black" type="text" placeholder="Nombre Completo del cliente">
                        </div>
                        <div class="mb-4">
                            <label class="block uppercase tracking-wide text-xs font-bold text-gray-50">RFC</label>
                            <input v-model="formData.rfc" class="w-full shadow-inner p-4 border-0 text-black" type="text" placeholder="RFC del cliente">
                        </div>
                        <div class="mb-4">
                            <label class="block uppercase tracking-wide text-xs font-bold text-gray-50">Direccion</label>
                            <input v-model="formData.address" class="w-full shadow-inner p-4 border-0 text-black" type="text" placeholder="Dirección del cliente">
                        </div>
                        <div class="mb-4">
                            <label class="block uppercase tracking-wide text-xs font-bold text-gray-50">Correo</label>
                            <input v-model="formData.email" class="w-full shadow-inner p-4 border-0 text-black" type="text" placeholder="Correo del cliente">
                        </div>
                    </div>
                </div>
                <div class="md:flex mb-6 border border-t-1 border-b-0 border-x-0 border-cream-dark">
                    <div class="md:flex-1 px-3 text-center md:text-right">
                        <button class="button text-cream-lighter bg-brick hover:bg-brick-dark" type="submit" :disabled="loading">
                            {{ loading ? "Enviando..." : "Crear Cliente" }}
                        </button>
                    </div>
                </div>
            </form>
        </section>
    </section>
</template>

;<script setup>
import { ref } from "vue";
import axios from "axios";

const formData = ref({
    name: "",
    rfc: "",
    address: "",
    email: "",
});

const loading = ref(false);

const submitForm = async () => {
    if(!formData.value.name || !formData.value.rfc || !formData.value.address || !formData.value.email) {
        alert("Todos los campos son obligatorios");
        return;
    }

    loading.value = true;
    try {
        const response = await axios.post("http://localhost:8080/client", formData.value);
        console.log(response.data);
        alert("Cliente creado correctamente");

        formData.value = {
            name: "",
            rfc: "",
            address: "",
            email: "",
        };
    } catch (error) {
        console.error("Error al crear cliente:", error);
        alert("hubo un error al registrar al cliente");
    } finally {
        loading.value = false;
    }
};
</script>