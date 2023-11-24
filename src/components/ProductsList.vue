<template>
  <div v-if="products.length > 0">
    <ProductsListItem
    @remove-product="$emit('remove-product', $event)"
    @changeQuantity="$emit('changeQuantity', $event)"
    v-for="product in products"
    :key="product._id"
    :product="product"
  />
  </div>
  <p v-else>No hay productos</p>
</template>
  
  <script>
import ProductsListItem from "./ProductsListItem.vue";

export default {
  name: "ProductsList",
  props: ["products"],
  components: {
    ProductsListItem,
  },
  
};
</script>
  