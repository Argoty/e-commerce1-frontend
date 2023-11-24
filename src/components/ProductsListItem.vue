<template>
  <div class="product-container">
    <img class="product-image" :src="product.imageUrl" />
    <div class="details-wrap">
      <h3>{{ product.name }}</h3>
      <p>${{ formatNumberWithCommas(product.price) }}</p>
    </div>
    <div class="quantity-control">
          <button @click="$emit('changeQuantity', {action: 'decrement', id: product._id})">-</button>
          <span>{{ product.amount }}</span>
          <button @click="$emit('changeQuantity', {action: 'increment', id: product._id})">+</button>
        </div>
    <button class="remove-button" @click="$emit('remove-product', product._id)">Eliminar<i class="fa fa-cart-arrow-down" aria-hidden="true" style="margin-left: 5px;"></i></button>
  </div>
</template>

<script>
export default {
  name: "ProductsListItem",
  props: ["product"],
};
</script>

<style scoped>
.product-container {
  align-content: "center";
  border-bottom: 1px solid #ddd;
  display: flex;
  padding: 16px;
  width: 100%;
}

.product-image {
  flex: 1;
  height: 100px;
  max-width: 100px;
}

.details-wrap {
  padding: 0 16px;
  flex: 3;
}

.remove-button {
  flex: 1;
  margin: auto;
  background-color: rgb(142, 0, 0);
}

.quantity-control {
  display: flex;
  flex:2;
  align-items: center;
  width: 140px;
}

.quantity-control button {
  width: 40px;
  cursor: pointer;
  border: none;
  background-color: rgb(98, 98, 98);
}
.quantity-control span {
  font-size: 18px;
  font-weight: bold;
  padding: 0 5px;
}
</style>