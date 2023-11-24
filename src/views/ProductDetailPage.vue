<template>
  <div class="page-wrap" v-if="product._id">
    <div id="product-content">
      <div id="img-wrap">
        <img v-bind:src="product.imageUrl" />
      </div>
      <div id="product-details">
        <h1>{{ product.name }}</h1>
        <div class="price-wrap">
          <h3 id="price">${{ formatNumberWithCommas(product.price) }}</h3>
        </div>
        <p>Clasificación promedio: {{ product.averageRating }}</p>
        <div class="quantity-control">
          <p>Cantidad:</p>
          <button @click="changeQuantity('decrement')">-</button>
          <span>{{ product.quantity }}</span>
          <button @click="changeQuantity('increment')">+</button>
        </div>
        <button
          class="add-to-cart"
          :class="{ 'grey-button': productInCart }"
          @click="add()"
        >
          {{ productInCart ? "Modificar cantidad" : "Agregar al Carrito"
          }}<i
            class="fa fa-cart-plus fa-2x"
            aria-hidden="true"
            style="margin-left: 5px"
          ></i>
        </button>
        <!-- <button class="add-to-cart grey-button" v-else>
          El producto ya está en el carrito
        </button> -->
        <h4>Descripción</h4>
        <p>{{ product.description }}</p>

        <div class="rating-section">
          <h4>Tu Calificación</h4>
          <star-rating
            v-model="rating"
            :read-only="false"
            :increment="1"
            :max-rating="10"
            active-on-click
            @rating-selected="rateProduct"
          ></star-rating>
        </div>
      </div>
    </div>
  </div>
  <NotFoundPage v-else />
</template>

<script>
import NotFoundPage from "./NotFoundPage.vue";
import axios from "axios";
import {StarRating} from 'vue-rate-it';

export default {
  name: "ProductDetailPage",
  components: {
    NotFoundPage,
    StarRating
  },
  data() {
    return {
      product: {},
      productInCart: false,
      rating: 0
    };
  },
  async created() {
    window.scrollTo(0, 0);
    this.$store.commit("setIsLoading", true);
    try {
      const { data: product } = await axios.get(
        `/products/${this.$route.params.id}`
      );
      const { data: cartItems } = await axios.get(
        `/cart/${this.$store.state.currentUser._id}`
      );

      const { data: dataRating } = await axios.get(
        `/rating/${this.$store.state.currentUser._id}/${product._id}`
      );


      const productInCart = cartItems.find((el) => el._id === product._id);
      product.quantity = productInCart ? productInCart.amount : 1;
      this.productInCart = productInCart ? true : false;

      this.product = product;
      this.rating = dataRating.rating ? dataRating.rating : 0

      document.title = `${product.name} | ${this.$store.state.title}`;
    } catch (err) {
      // axios.defaults.headers.common["Authorization"] = "";
      // this.$store.commit("removeToken");
      // this.$router.push("/login");
      console.log(err);
    } finally {
      this.$store.commit("setIsLoading", false);
    }
  },
  methods: {
    async add() {
      this.$store.commit("setIsLoading", true);

      try {
        await axios.post(`/cart/${this.$store.state.currentUser._id}`, {
          productId: this.product._id,
          amount: this.product.quantity,
        });
        this.$store.commit("setSnackbar", {
          message: "¡Producto Agregado al Carrito!",
          type: "okey",
        });
        // this.$router.push({ path: "/products" });
        this.productInCart = true;
      } catch (err) {
        this.$store.commit("setSnackbar", {
          message: "Error agregando",
          type: "error",
        });
      } finally {
        this.$store.commit("setIsLoading", false);
      }
    },
    changeQuantity(action) {
      if (action === "increment") {
        this.product.quantity++;
      } else if (action === "decrement" && this.product.quantity > 1) {
        this.product.quantity--;
      }
    },

    async rateProduct() {
      this.$store.commit("setIsLoading", true);

      try {
        const { data } = await axios.post("rating", {
          productId: this.product._id,
          userId: this.$store.state.currentUser._id,
          rating: this.rating,
        });
        this.$store.commit("setSnackbar", {
          message: "¡Producto Calificado!",
          type: "okey",
        });

        this.product.averageRating = data.averageRating
      } catch (err) {
        this.$store.commit("setSnackbar", {
          message: "Error calificando",
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
  max-width: 1000px;
}

#product-content {
  display: flex;
  flex-wrap: wrap;
  max-width: 100%;
  margin: 10px 0 10px 0;
}

#img-wrap {
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
}

img {
  max-width: 100%;
  height: auto;
  display: block;
}

#product-details {
  flex: 2;
  padding: 16px;
  position: relative;
  text-align: left;
}

.price-wrap {
  margin-top: 16px;
}

.add-to-cart {
  margin-top: 10px;
  width: 100%;
  font-size: 20px;
  background-color: rgb(0, 128, 85);
}

.grey-button {
  width: 100%;
  background-color: rgb(62, 62, 62);
}

#price {
  position: absolute;
  top: 24px;
  right: 16px;
}

/* ESTILOS DE CANTIDAD */
.quantity-control {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 140px;
}

.quantity-control button {
  width: 40px;
  cursor: pointer;
  border: none;
  background-color: rgb(93, 93, 93);
}
.quantity-control span {
  font-size: 18px;
  font-weight: bold;
  padding: 0 5px;
}

/* Estilos para la sección de Rating con Estrellas */
.rating-section {
  margin-top: 20px;
}

.rating-section h4 {
  font-size: 18px;
  margin-bottom: 10px;
}

.rating-section button {
  padding: 10px;
  background-color: rgb(0, 128, 85);
  color: #fff;
  cursor: pointer;
}

/* Media Queries for Responsiveness */
@media screen and (max-width: 700px) {
  #product-content {
    flex-direction: column;
  }
}
</style>




