<template>
    <div id="tarjetas" class="tarjetas">
        <input type="radio" name="mascota" id="${mokepon.nombre}" class="check-mascota" />
        <label class="tarjeta-de-mokepon" for="${mokepon.nombre}">
            <p>${mokepon.nombre}</p>
            <img src="${mokepon.imagen}" alt="${mokepon.nombre}">
        </label>
    </div>
</template>

<script setup>
const props = defineProps({
    mokepon: () => { }
})
</script>

<style scoped>
.tarjetas,
.tarjetas-ataques {
    display: flex;
    gap: 10px;
}

.tarjeta-de-mokepon {
    width: 180px;
    height: 100px;
    background: #11468f;
    padding: 10px;
    box-sizing: border-box;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
}

.tarjeta-de-mokepon img {
    width: 80px;
}
</style>