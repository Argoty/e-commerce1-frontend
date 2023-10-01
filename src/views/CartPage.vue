<template>
  <div id="page-wrap">
    <h1>Shopping Cart</h1>
    <ProductsList
      :products="cartItems"
      @remove-product="deleteProduct($event)"
    />
    <h3 id="total-price">Total: ${{ totalPrice }}</h3>
    <button id="checkout-button">Proceed to Checkout</button>
    <Snackbar :message="snackbarMessage" :duration="snackbarDuration" />
  </div>
</template>

<script>
import axios from "axios";
import ProductsList from "@/components/ProductsList.vue";

export default {
  name: "CartPage",
  components: {
    ProductsList,
  },
  data() {
    return {
      cartItems: [],
      snackbarMessage: "",
      snackbarDuration: 3000, // Duración predeterminada
    };
  },
  async created() {
    const result = await axios.get("/api/users/6514a66bcde096fbdf228d17/cart");
    const cartItems = result.data;
    this.cartItems = cartItems;
  },
  methods: {
    async deleteProduct(id) {
      const result = await axios.delete(
        `/api/users/6514a66bcde096fbdf228d17/cart/${id}`
      );
      this.cartItems = result.data;
      this.snackbarMessage = `¡Producto Eliminado del Carrito!`;
      this.snackbarDuration = 1500;
    },
  },
  computed: {
    totalPrice() {
      return this.cartItems.reduce((sum, item) => sum + Number(item.price), 0);
    },
  },
};
</script>

<style scoped>
h1 {
  border-bottom: 1px solid black;
  margin: 0;
  margin-top: 16px;
  padding: 16px;
}

#total-price {
  padding: 16px;
  text-align: right;
}

#checkout-button {
  width: 100%;
}
</style>