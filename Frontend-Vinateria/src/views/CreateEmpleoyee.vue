<template>
    <section>
        <section>
            <a href="/home">Volver a inicio</a>
        </section>

        <section class="bg-black-lighter p-4 shadow">
            <div class="md:flex">
                <h2 class="md:w-1/3 uppercase tracking-wide text-sm sm:text-lg mb-6">Crear un empleado nuevo</h2>
            </div>
            <form @submit.prevent="submitForm">
                <div class="md:flex mb-8">
                    <div class="md:w-1/3">
                        <legend class="uppercase tracking-wide text-sm">Datos del empleado</legend>
                        <p class="text-xs font-light text-red">Ingresa los datos basicos del Empleado.</p>
                    </div>
                    <div class="md:flex-1 mt-2 mb:mt-0 md:px-3">
                        <div class="mb-4">
                            <label class="block uppercase tracking-wide text-xs font-bold text-gray-50">Nombre completo</label>
                            <input v-model="formData.name" class="w-full shadow-inner p-4 border-0 text-black" type="text" placeholder="Nombre Completo del empleado">
                        </div>
                        <div class="mb-4">
                            <label class="block uppercase tracking-wide text-xs font-bold text-gray-50">Nombre del puesto</label>
                            <input v-model="formData.position_name" class="w-full shadow-inner p-4 border-0 text-black" type="text" placeholder="Puesto del empleadp">
                        </div>
                        <div class="mb-4">
                            <label class="block uppercase tracking-wide text-xs font-bold text-gray-50">Direccion</label>
                            <input v-model="formData.address" class="w-full shadow-inner p-4 border-0 text-black" type="text" placeholder="Dirección del empleado">
                        </div>
                        <div class="mb-4">
                            <label class="block uppercase tracking-wide text-xs font-bold text-gray-50">Correo</label>
                            <input v-model="formData.email" class="w-full shadow-inner p-4 border-0 text-black" type="text" placeholder="Correo del empleado">
                        </div>
                        <div class="mb-4">
                            <label class="block uppercase tracking-wide text-xs font-bold text-gray-50">Password</label>
                            <input v-model="formData.password" class="w-full shadow-inner p-4 border-0 text-black" type="text" placeholder="Contrasena del empleado">
                        </div>
                    </div>
                </div>
                <div class="md:flex mb-6 border border-t-1 border-b-0 border-x-0 border-cream-dark">
                    <div class="md:flex-1 px-3 text-center md:text-right">
                        <button class="button text-cream-lighter bg-brick hover:bg-brick-dark" type="submit" :disabled="loading">
                            {{ loading ? "Enviando..." : "Crear Empleado" }}
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
    position_name: "",
    address: "",
    email: "",
    password: "",
});

const loading = ref(false);

const submitForm = async () => {
    if(!formData.value.name || !formData.value.position_name || !formData.value.address || !formData.value.email || !formData.value.password){
        alert("Por favor llena todos los campos");
        return;
    }

    loading.value = true;
    try{
        const response = await axios.post("http://localhost:8080/employee", formData.value);
        console.log("Respuesta :: ", response);
        alert("Empleado creado exitosamente");
        formData.value = {
            name: "",
            position_name: "",
            address: "",
            email: "",
            password: "",
        };
    } catch (error) {
        console.error("Error al crear empleado:", error);
        alert("Error al crear empleado");
    } finally {
        loading.value = false;
    }
};
</script>