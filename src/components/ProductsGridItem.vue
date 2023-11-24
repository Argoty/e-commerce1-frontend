<template>
  <div class="product-item">
    <img v-bind:src="product.imageUrl" />
    <h3 class="product-name">{{ product.name }}</h3>
    <p class="product-price">
      <i class="fa fa-usd" aria-hidden="true"></i>{{ formatNumberWithCommas(product.price) }}
    </p>
    <router-link v-bind:to="'/products/' + product._id">
      <button>
        Ver Detalles<i
          class="fa fa-info-circle"
          aria-hidden="true"
          style="margin-left: 5px"
        ></i>
      </button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "ProductsGridItem",
  props: ["product"],
};
</script>

<style scoped>
.product-item {
  align-items: center;
  border-radius: 8px;
  box-shadow: 0px 2px 5px #888;
  display: flex;
  flex-direction: column;
  margin-bottom: 2%;
  padding: 20px;
  position: relative;
  width: 100%; /* Cambia el ancho al 100% para que sea responsivo */
}

.product-name {
  margin-bottom: 0;
}

img {
  max-width: 100%; /* Establece un ancho máximo para que las imágenes sean responsivas */
  height: 200px;
}

a {
  width: 100%;
}

button {
  width: 100%;
}
</style>