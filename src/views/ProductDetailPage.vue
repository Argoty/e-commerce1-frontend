<template>
  <div id="page-wrap" v-if="product">
    <div id="img-wrap">
      <img v-bind:src="product.imageUrl" />
    </div>
    <div id="product-details">
      <h1>{{ product.name }}</h1>
      <h3 id="price">${{ product.price }}</h3>
      <p>Average rating: {{ product.averageRating }}</p>
      <button id="add-to-cart" @click="add()" v-if="!productInCart">Add to Cart</button>
      <button id="add-to-cart" v-else class="grey-button">The product is already in Cart</button>
      <h4>Description</h4>
      <p>{{ product.description }}</p>
    </div>
    <Snackbar :message="snackbarMessage" :duration="snackbarDuration" />
  </div>
  <NotFoundPage v-else />
</template>

<script>
import NotFoundPage from "./NotFoundPage.vue";
import axios from "axios";

export default {
  name: "ProductDetailPage",
  components: {
    NotFoundPage,
  },
  data() {
    return {
      cartItems: [],
      product: {},
      snackbarMessage: "",
      snackbarDuration: 3000, // Duración predeterminada
    };
  },
  computed: {
    productInCart() {
      return this.cartItems.some(p => p._id === this.product._id)
    }
  },
  async created() {
    const { data: product} = await axios.get(`api/products/${this.$route.params.id}`);
    this.product = product;

    const { data: cartItems}= await axios.get("/api/users/6514a66bcde096fbdf228d17/cart");
    this.cartItems = cartItems;

  },
  methods: {
    async add() {
      await axios.post("api/users/6514a66bcde096fbdf228d17/cart", {
        productId: this.$route.params.id,
      });
      this.snackbarMessage = `¡Producto Agregado al Carrito!`;
      this.snackbarDuration = 1500;
    },
  },
};
</script>

<style scoped>
#page-wrap {
  margin-top: 16px;
  padding: 16px;
  max-width: 600px;
}

#img-wrap {
  text-align: center;
}

img {
  width: 400px;
}

#product-details {
  padding: 16px;
  position: relative;
}

#add-to-cart {
  width: 100%;
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
</style>