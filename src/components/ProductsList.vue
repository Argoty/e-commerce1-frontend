<template>
  <div v-if="products.length > 0">
    <ProductsListItem
    @remove-product="$emit('remove-product', $event)"
    v-for="product in products"
    :key="product._id"
    :product="product"
  />
  </div>
  <p v-else>You haven't added anything to your car</p>
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
  