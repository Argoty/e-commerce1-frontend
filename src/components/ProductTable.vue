<template>
  <div class="products-table">
    <table>
      <thead>
        <tr>
          <th>Imagen</th>
          <th>Nombre</th>
          <th>Categoria</th>
          <th>Precio</th>
          <th style="max-width: 80px">Calificación</th>
          <th>{{ typeof userState === "string" ? "Cantidad" : "Opciones" }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in displayedProducts" :key="product._id">
          <td style="text-align: center">
            <img
              :src="product.imageUrl"
              alt="Product Image"
              class="product-image"
            />
          </td>
          <td>{{ product.name }}</td>
          <td>{{ product.sectionName }}</td>
          <td>${{ formatNumberWithCommas(product.price) }}</td>
          <td style="max-width: 80px">{{ product.averageRating }}</td>
          <td v-if="typeof userState !== 'string'">
            <button
              @click="
                showEditDialog = true;
                productToEdit = {
                  ...product,
                  section: {
                    _id: product.sectionId,
                    name: product.sectionName,
                  },
                };
              "
              style="background-color: rgb(0, 33, 103)"
            >
              <!--  -->
              <i class="fa fa-pencil" aria-hidden="true"></i>
            </button>
            <button
              @click="confirmDelete(product._id)"
              style="margin-left: 5px; background-color: rgb(193, 30, 30)"
            >
              <i class="fa fa-trash-o" aria-hidden="true"></i>
            </button>
          </td>

          <td v-else>
            {{ product.amount }}
          </td>
        </tr>
      </tbody>
    </table>
    <div class="paginacion-tabla">
      <button @click="previousPage" :disabled="currentPage === 0">
        <i class="fa fa-arrow-left" aria-hidden="true"></i>
      </button>
      <button @click="nextPage" :disabled="currentPage === totalPages - 1">
        <i class="fa fa-arrow-right" aria-hidden="true"></i>
      </button>
    </div>

    <!-- DiÁLOGOS DE EDITAR Y ELIMINAR -->
    <div v-if="showDeleteDialog" class="overlay">
      <div class="dialog">
        <p>¿Seguro que quieres eliminar este producto?</p>
        <div class="dialog-buttons">
          <button @click="deleteConfirmed" style="margin-right: 5px">Sí</button>
          <button
            @click="cancelDelete"
            style="background-color: rgb(189, 29, 29)"
          >
            No
          </button>
        </div>
      </div>
    </div>

    <div v-if="showEditDialog" class="overlay">
      <div class="dialog edit-dialog">
        <h2>Editar Producto</h2>
        <FormProduct
          @sendProduct="editProduct"
          :productoEditar="productToEdit"
          :sections="sections"
        />
        <div style="text-align: right">
          <button
            @click="
              productToEdit = null;
              showEditDialog = false;
            "
            style="background-color: rgb(189, 29, 29)"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
import FormProduct from "@/components/FormProduct.vue";
import axios from "axios";
export default {
  components: {
    FormProduct,
  },
  name: "ProductTable",
  props: ["products", "userState", "sections"],
  data() {
    return {
      showDeleteDialog: false,
      productIdToDelete: null,

      showEditDialog: false,
      productToEdit: null,

      productsPerPage: 5,
      currentPage: 0,
      totalPages: 0,
    };
  },
  computed: {
    displayedProducts() {
      if (!this.products) {
        return [];
      }
      this.totalPages = Math.ceil(this.products.length / this.productsPerPage);

      const start = this.currentPage * this.productsPerPage;
      const end = start + this.productsPerPage;
      return this.products.slice(start, end);
    },
  },
  methods: {
    previousPage() {
      if (this.currentPage > 0) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages - 1) {
        this.currentPage++;
      }
    },

    confirmDelete(productId) {
      this.productIdToDelete = productId;
      this.showDeleteDialog = true;
    },
    async deleteConfirmed() {
      if (this.productIdToDelete) {
        this.$store.commit("setIsLoading", true);

        try {
          await axios.delete(`/products/${this.productIdToDelete}`);

          this.showDeleteDialog = false;
          this.productIdToDelete = null;

          this.$emit("productEliminated");

          this.$store.commit("setSnackbar", {
            message: "¡Producto Eliminado!",
            type: "okey",
          });
        } catch (err) {
          console.log(err);
          this.$store.commit("setSnackbar", {
            message: err.response.data.error,
            type: "error",
          });
        } finally {
          this.$store.commit("setIsLoading", false);
        }
      }
    },
    cancelDelete() {
      this.showDeleteDialog = false;
      this.productIdToDelete = null;
    },

    async editProduct(productData) {
      if (productData) {
        this.$store.commit("setIsLoading", true);

        productData.price = parseFloat(productData.price.replace(/\D/g, ""));

        const formData = new FormData();
        formData.append("name", productData.name);
        formData.append("price", productData.price);
        formData.append("description", productData.description);
        formData.append("sectionId", productData.section._id);
        formData.append("image", productData.image);

        try {
          await axios.put(`/products/${productData._id}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

          this.showEditDialog = false;
          this.productToEdit = null;

          this.$emit("productEdited");

          this.$store.commit("setSnackbar", {
            message: "¡Producto Editado!",
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
      }
    },
  },
};
</script>
  
  <style scoped>
/* ------ ESTILOS TABLA ---------*/
.products-table {
  width: 100%;
  padding: 5px 20px 2px 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ccc;
  padding: 4px;
  text-align: center;
}

th {
  background-color: #f2f2f2;
}

.product-image {
  max-width: 100px;
  max-height: 100px;
}

/* ------ ESTILOS DIALOGOS ---------*/
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* Transparencia */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.dialog {
  padding: 20px;
  background: white;
  border: 1px solid #ccc;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}
.edit-dialog {
  width: 600px;
}

.dialog-buttons {
  margin-top: 10px;
  text-align: center;
}

/* ------ ESTILOS PAGINACION ---------*/
.paginacion-tabla {
  display: flex;
  justify-content: flex-start; /* Alinea los botones a la izquierda */
  align-items: center;
  margin-top: 10px;
  max-width: 300px;
}

.paginacion-tabla button {
  padding: 8px 16px;
  margin-right: 10px;
  border: none;
  background-color: #474747;
  color: #fff;
  cursor: pointer;
  border-radius: 4px;
  font-size: 18px;
}

.paginacion-tabla button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* ------ ESTILOS RESPONSIVE ---------*/
@media (max-width: 768px) {
  .product-image {
    max-width: 50px; /* Cambiar el tamaño de la imagen en pantallas más pequeñas */
  }

  td {
    font-size: 12px; /* Reducir el tamaño del texto en las celdas */
  }

  button {
    font-size: 14px; /* Reducir el tamaño de los botones */
    padding: 5px 10px; /* Ajustar el relleno de los botones */
  }
}
</style>
  