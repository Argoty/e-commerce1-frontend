<template>
  <div class="page-wrap">
    <div class="tabs">
      <a
        href="#"
        @click.prevent="getSectionProducts({ _id: 'todos' })"
        :class="{ active: 'todos' === activeSection }"
      >
        Todos
      </a>
      <a
        href="#"
        @click.prevent="getSectionProducts(section)"
        v-for="section in sections"
        :key="section._id"
        :class="{ active: section._id === activeSection }"
      >
        {{ section.name }}
      </a>
    </div>

    <Banner />

    <Searcher @search="searchProducts"/>
    <ProductsGrid :products="filteredProducts" />
    <h3 v-if="noProduct" style="text-align: center">
      Lo siento, no hay productos :(
      <i class="fa fa-frown-o" aria-hidden="true"></i>
    </h3>
  </div>
</template>

<script>
import Searcher from "@/components/Searcher.vue";
import ProductsGrid from "@/components/ProductsGrid.vue";
import Banner from "@/components/Banner.vue";

import axios from "axios";

export default {
  name: "ProductsPage",
  components: {
    ProductsGrid,
    Searcher,
    Banner
  },
  data() {
    return {
      products: [],
      filteredProducts: [],
      noProduct: false,

      sections: [],
      activeSection: null,
    };
  },

  async created() {
    window.scrollTo(0, 0);
    this.$store.commit("setIsLoading", true);
    const result = await axios.get("/products");
    const { data: sections } = await axios.get("/sections");

    document.title = `Productos | ${this.$store.state.title}`;

    this.sections = sections;

    const products = result.data;
    this.products = products;
    this.filteredProducts = products;

    this.$store.commit("setIsLoading", false);
  },
  methods: {
    async getSectionProducts(section) {
      this.activeSection = section._id;
      this.$store.commit("setIsLoading", true);

      try {
        const url =
          this.activeSection === "todos"
            ? "/products"
            : `/sections/${this.activeSection}`;
        const { data: sectionProducts } = await axios.get(url);

        this.products = sectionProducts;
        this.filteredProducts = [...this.products];
      } catch (err) {
        this.$store.commit("setSnackbar", {
          message: "Error calificando",
          type: "error",
        });
      } finally {
        this.$store.commit("setIsLoading", false);
      }
    },
    searchProducts(query) {
      this.noProduct = false;
      if (query) {
        this.filteredProducts = this.products.filter((product) => {
          return (
            product.name.toLowerCase().includes(query) ||
            product.price.toLowerCase().includes(query) ||
            product.averageRating.toString().includes(query)
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
  max-width: 1200px;
  padding: 0 10px 0 10px;
}

/* Estilos para el menú de pestañas */ /* Estilos para el menú de pestañas */
.tabs {
  position: fixed;
  left: 0;
  background-color: white;
  width: 100%;
  overflow: hidden;
  z-index: 1;
  border-bottom: 1px rgb(140, 140, 140) solid;
}

.tabs a {
  float: left;
  display: block;
  color: #030303;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

.tabs a.active {
  border-bottom: 2px solid black;
}
.tabs a:hover {
  opacity: 0.7;
}

.tabs a:active {
  opacity: 0.5;
}
@media screen and (max-width: 768px) {
  .tabs a {
    font-size: 16px;
    padding: 10px 5px;
  }
  
}
</style>
