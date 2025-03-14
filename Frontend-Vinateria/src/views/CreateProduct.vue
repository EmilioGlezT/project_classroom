<template>
    <section>
        <!-- component -->

        <section>
            <a href="/Home">Volver a inicio</a>
        </section>

        <section class="bg-black-lighter p-4 shadow">
            <div class="md:flex">
                <h2 class="md:w-1/3 uppercase tracking-wide text-sm sm:text-lg mb-6">Crear un producto nuevo</h2>
            </div>
            <form @submit.prevent="submitForm">
                <div class="md:flex mb-8">
                    <div class="md:w-1/3">
                        <legend class="uppercase tracking-wide text-sm">Datos del producto</legend>
                        <p class="text-xs font-light text-red">Ingresa los datos basicos del producto.</p>
                    </div>
                    <div class="md:flex-1 mt-2 mb:mt-0 md:px-3">
                        <div class="mb-4">
                            <label class="block uppercase tracking-wide text-xs font-bold text-gray-50">Nombre</label>
                            <input v-model="formData.fullName" class="w-full shadow-inner p-4 border-0 text-black" type="text" placeholder="Nombre del producto">
                        </div>
                        <div class="md:flex mb-4">
                            <div class="md:flex-1 md:pr-3">
                                <label
                                    class="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">Precio</label>
                                    <input v-model="formData.price" class="w-full shadow-inner p-4 border-0 text-black" type="number" step="0.01" placeholder="Precio">
                            </div>
                            <div class="md:flex-1 md:pl-3">
                                <label class="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">Categoría</label>
                                <input v-model="formData.category" class="w-full shadow-inner p-4 border-0 text-black" type="text" placeholder="Categoría">
                            </div>
                        </div>
                        
                    </div>
                </div>
                
                <div class="md:flex mb-6">
                    <div class="md:w-1/3">
                        <legend class="uppercase tracking-wide text-sm">Descripcion</legend>
                    </div>
                    <div class="md:flex-1 mt-2 mb:mt-0 md:px-3">
                        <textarea v-model="formData.description" class="w-full shadow-inner p-4 border-0 text-black" rows="4" placeholder="Descripción del producto"></textarea>
                    </div>
                </div>
                <div class="md:flex mb-6">
                    <div class="md:w-1/3">
                        <legend class="uppercase tracking-wide text-sm">Proveedor</legend>
                    </div>
                    <div class="md:flex-1 mt-2 mb:mt-0 md:px-3">
                        <select v-model="formData.supplier.id" class="w-full shadow-inner p-4 border-0 text-black">
                            <option value="" disabled>Seleccione un proveedor</option>
                            <option v-for="supplier in suppliers" :key="supplier.id" :value="supplier.id">
                                {{ supplier.name }}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="md:flex mb-6 border border-t-1 border-b-0 border-x-0 border-cream-dark">
                    <div class="md:flex-1 px-3 text-center md:text-right">
                        <button class="button text-cream-lighter bg-brick hover:bg-brick-dark" type="submit" :disabled="loading">
                            {{ loading ? "Enviando..." : "Crear Producto" }}
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
import { ref, onMounted } from "vue";
import axios from "axios";

const formData = ref({
    fullName: "",
    price: "",
    category: "",
    description: "",
    supplier: {
        id: ""
    }
});

const suppliers = ref([]);
const loading = ref(false);

// Cargar lista de suppliers al montar el componente
onMounted(async () => {
    try {
        const response = await axios.get("http://localhost:8080/supplier");
        console.log(response.data._embedded.supplier)
        // suppliers.value = response.data._embedded.supplier;
        suppliers.value = response.data._embedded.supplier.map((s, index) => ({
        id: s._links.self.href.split('/').pop(), // Extrae el ID desde la URL
        name: s.name,
        address: s.address,
        tel: s.tel
    }));
        
    } catch (error) {
        console.error("Error al obtener proveedores:", error);
        alert("No se pudo cargar la lista de proveedores.");
    }
});

const submitForm = async () => {
    console.log(formData.value)
    if (!formData.value.fullName || !formData.value.price || !formData.value.category || !formData.value.description || !formData.value.supplier.id) {
        alert("Todos los campos son obligatorios");
        return;
    }

    loading.value = true;
    try {
        const response = await axios.post("http://localhost:8080/product/create", formData.value);
        //console.log("Producto creado:", response.data);
        alert("Producto creado exitosamente");

        // Reiniciar formulario después de la creación
        formData.value = {
            fullName: "",
            price: "",
            category: "",
            description: "",
            supplier: { id: "" }
        };
    } catch (error) {
        console.error("Error al crear producto:", error);
        alert("Hubo un error al registrar el producto");
    } finally {
        loading.value = false;
    }
};
</script>