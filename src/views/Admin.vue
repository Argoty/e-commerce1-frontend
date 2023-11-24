<template>
  <div class="page-wrap">
    <h2>Crear Producto</h2>
    <FormProduct
      @sendProduct="createProduct"
      :productoEditar="{}"
      :sections="sections"
      ref="formProduct"
    />
    <Searcher @search="searchProducts" style="margin: 0 20px 0 20px" />
    <ProductTable
      :products="filteredProducts"
      @productEliminated="getProducts()"
      @productEdited="getProducts()"
      :userState="false"
      :sections="sections"
    />
    <h3 v-if="noProduct" style="text-align: center">
      Lo siento, no hay productos :(
      <i class="fa fa-frown-o" aria-hidden="true"></i>
    </h3>
    <div class="btn-admin">
      <router-link to="/admin/users">
        <button>
          <span>Usuarios</span>
          <i class="fa fa-users" aria-hidden="true" title="Carrito"></i>
        </button>
      </router-link>
      <router-link to="/admin/categorias">
        <button>
          <span>Categorias</span>
          <i class="fa fa-list" aria-hidden="true" style="margin-left: 3px;"></i>
        </button>
      </router-link>
    </div>
  </div>
</template>
  
  <script>
import axios from "axios";
import Searcher from "@/components/Searcher.vue";
import ProductTable from "../components/ProductTable.vue";
import FormProduct from "@/components/FormProduct.vue";

export default {
  name: "admin",
  components: { ProductTable, FormProduct, Searcher },
  data() {
    return {
      products: [],
      filteredProducts: [],
      noProduct: false,
      sections: [],
    };
  },
  async created() {
    window.scrollTo(0, 0);
    this.$store.commit("setIsLoading", true);

    try {
      const { data: sections } = await axios.get("/sections");
      this.sections = sections;

      await this.getProducts()
    } catch (err) {
      this.$store.commit("setSnackbar", {
        message: "ERROR SERVER",
        type: "error",
      });
    } finally {
      this.$store.commit("setIsLoading", false);
    }

    document.title = `Admin | ${this.$store.state.title}`;
  },

  methods: {
    async getProducts() {
      try {
        const { data: products } = await axios.get("/products");

        products.forEach((product) => {
          const matchingSection = this.sections.find(
            (section) => section._id === product.sectionId
          );
          if (matchingSection) {
            product.sectionName = matchingSection.name;
          }
        });

        this.products = products;
        this.filteredProducts = products;
      } catch (err) {
        this.$store.commit("setSnackbar", {
          message: "ERROR SERVER",
          type: "error",
        });
      }
    },

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
    async createProduct(productData) {
      this.$store.commit("setIsLoading", true);

      productData.price = parseFloat(productData.price.replace(/\D/g, ""));

      const formData = new FormData();
      formData.append("name", productData.name);
      formData.append("price", productData.price);
      formData.append("description", productData.description);
      formData.append("sectionId", productData.section._id);
      formData.append("image", productData.image);

      try {
        await axios.post("/products", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        await this.getProducts();

        this.$refs.formProduct.productForm = {
          name: "",
          price: null,
          description: "",
          image: null,
          section: null,
        };

        this.$store.commit("setSnackbar", {
          message: "¡Producto Agregado!",
          type: "okey",
        });
      } catch (err) {
        this.$store.commit("setSnackbar", {
          message: err.response.data.error,
          type: "error",
        });
      } finally {
        this.$store.commit("setIsLoading", false);
      }
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
.btn-admin {
  margin: 20px 0px 10px 20px;
  display: flex;
  justify-content: flex-start;
  gap: 10px;
}
</style>
  