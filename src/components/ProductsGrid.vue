<template>
  <div class="grid-wrap">
    <ProductsGridItem
      v-for="product in products"
      :key="product._id"
      :product="product"
    />
  </div>
</template>
  
  <script>
import ProductsGridItem from "./ProductsGridItem.vue";

export default {
  name: "ProductsGrid",
  props: ["products"],
  components: {
    ProductsGridItem,
  },
};
</script>
  
  <style scoped>
.grid-wrap {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  margin-top: 16px;
}
</style>