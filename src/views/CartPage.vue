<template>
  <div class="page-wrap">
    <h1>
      Carrito <i class="fa fa-shopping-cart" aria-hidden="true"></i>
    </h1>
    <ProductsList
      :products="cartItems"
      @remove-product="deleteProduct($event)"
      @changeQuantity="changeQuantity($event)"
    />
    <h3 id="total-price">Total: ${{ formatNumberWithCommas(totalPrice) }}</h3>
    <div id="checkout-options">
      <button id="checkout-button" @click="checkout">
        Verificar
        <i
          class="fa fa-credit-card-alt"
          aria-hidden="true"
          style="margin-left: 5px"
        ></i>
      </button>
      <span class="or">ó</span>
      <router-link to="/contact" id="contact-button">
        <button style="width: 100%;">Contáctanos</button>
      </router-link>
      
    </div>
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
    };
  },
  async created() {
    window.scrollTo(0, 0);
    this.$store.commit("setIsLoading", true);

    try {
      const result = await axios.get(
        `/cart/${this.$store.state.currentUser._id}`
      );
      document.title = `Carrito | ${this.$store.state.title}`;

      const cartItems = result.data;
      this.cartItems = cartItems.reverse();
    } catch (err) {
      axios.defaults.headers.common["Authorization"] = "";
      this.$store.commit("removeToken");
      this.$router.push("/login");
    } finally {
      this.$store.commit("setIsLoading", false);
    }
  },
  methods: {
    async changeQuantity(payload) {

      const index = this.cartItems.findIndex((el) => el._id === payload.id);

      if (payload.action === "increment") {
        this.cartItems[index].amount++;
      } else if (payload.action === "decrement" && this.cartItems[index].amount > 1) {
        this.cartItems[index].amount--;
      }

      this.$store.commit("setIsLoading", true);
      try {
        await axios.post(`/cart/${this.$store.state.currentUser._id}`, {
          productId: payload.id,
          amount: this.cartItems[index].amount,
        });

        this.$store.commit("setSnackbar", {
          message: "¡Cantidad agregada al Carrito!",
          type: "okey",
        });
        // this.$router.push({ path: "/products" });
        
      } catch (err) {
        this.$store.commit("setSnackbar", {
          message: "Error agregando",
          type: "error",
        });
      } finally {
        this.$store.commit("setIsLoading", false);
      }
    },
    async deleteProduct(id) {
      this.$store.commit("setIsLoading", true);

      try {
        const result = await axios.delete(
          `/cart/${this.$store.state.currentUser._id}/${id}`
        );
        this.cartItems = result.data;
        this.$store.commit("setSnackbar", {
          message: "¡Producto Eliminado del Carrito!",
          type: "okey",
        });
      } catch (err) {
        console.log(err);
        this.$store.commit("setSnackbar", {
          message: "Error eliminando",
          type: "error",
        });
      } finally {
        this.$store.commit("setIsLoading", false);
      }
    },
    async checkout() {
      this.$store.commit("setIsLoading", true);
      try {
        const result = await axios.post(
          `/payment/create-checkout-session`,
          {products: this.cartItems}
        );

        window.location.href = result.data.url;
      } catch (err) {
        this.$store.commit("setSnackbar", {
          message: "Error verificando",
          type: "error",
        });
      } finally {
        this.$store.commit("setIsLoading", false);
      }
    },
  },
  computed: {
  totalPrice() {
    return this.cartItems.reduce((sum, item) => sum + item.price * item.amount, 0);
  },
}, 
};
</script>

<style scoped>
.page-wrap{
  max-width: 800px;
}
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

#checkout-options {
  display: flex;
  justify-content: center;
  align-items: center;
}

#checkout-button,
#contact-button {
  flex: 1;
  margin: 10px;
  width: 100%;
}
#checkout-button {
  background-color: rgb(45, 0, 169);
}

.or {
  margin: 10px;
}
</style>