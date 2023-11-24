<template>
  <div class="page-wrap">
    <h2>Carrito "{{ $route.query.username }}"</h2>
    <Searcher @search="searchProducts" style="margin: 0 20px 0 20px" />
    <ProductTable :products="filteredProducts" :userState="$route.params.id" />
    <h3 style="text-align: right; margin-right: 20px;">
      Total: ${{ formatNumberWithCommas(totalPrice) }}
    </h3>
    <h3 v-if="noProduct" style="text-align: center">
      Lo siento, no hay productos en este carrito :(
      <i class="fa fa-frown-o" aria-hidden="true"></i>
    </h3>
  </div>
</template>
    
    <script>
import axios from "axios";
import Searcher from "@/components/Searcher.vue";
import ProductTable from "../components/ProductTable.vue";

export default {
  name: "usercart",
  components: { ProductTable, Searcher },
  data() {
    return {
      products: [],
      filteredProducts: [],
      noProduct: false,
      totalPrice: 0,
    };
  },
  async created() {
    window.scrollTo(0, 0);
    this.$store.commit("setIsLoading", true);

    try {
      const userId = this.$route.params.id;

      const result = await axios.get(`/cart/${userId}`);
      const { data: ratings } = await axios.get(`/rating/${userId}`);
      const { data: sections } = await axios.get(`/sections`);

      const products = result.data.reverse();

      if (products.length === 0) this.noProduct = true;
      else {
        this.totalPrice = products.reduce(
          (sum, item) => sum + item.price * item.amount,
          0
        );

        products.forEach((product) => {
          const matchingRating = ratings.find(
            (rating) => rating.productId === product._id
          );
          if (matchingRating) {
            // Si se encuentra una coincidencia, actualiza el averageRating
            product.averageRating = matchingRating.rating;
          }

          const matchingSection = sections.find(
            (section) => section._id === product.sectionId
          );
          if (matchingSection) {
            product.sectionName = matchingSection.name;
          }
        });
      }

      this.products = products;
      this.filteredProducts = [...this.products];

      document.title = `${this.$route.query.username} | ${this.$store.state.title}`;
    } catch (err) {
      console.log(err);
      this.$store.commit("setSnackbar", {
        message: err.response.data.error,
        type: "error",
      });
    } finally {
      this.$store.commit("setIsLoading", false);
    }
  },
  methods: {
    searchProducts(query) {
      this.noProduct = false;
      if (query) {
        this.filteredProducts = this.products.filter((product) => {
          return (
            product.name.toLowerCase().includes(query) ||
            product.price.toLowerCase().includes(query) ||
            product.averageRating.toString().includes(query) ||
            product.sectionName.toLowerCase().includes(query)
          );
        });

        if (this.filteredProducts.length === 0) this.noProduct = true;
      } else this.filteredProducts = [...this.products];
    },
  },
};
</script>
    
    <style scoped>
.page-wrap {
  max-width: 100%;
}
h2 {
  text-align: center;
  margin: 10px 0 0 0;
  padding: 0;
}
</style>
    