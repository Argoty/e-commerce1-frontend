<template>
  <div class="snackbar" :class="{ show: snackbarVisible }">
    {{ message }}
  </div>
</template>

<script>
export default {
  props: {
    message: String,
    duration: {
      type: Number,
      default: 3000, // Duración predeterminada de 3 segundos
    },
  },
  data() {
    return {
      snackbarVisible: false,
    };
  },
  watch: {
    message(newMessage) {
      if (newMessage) {
        this.showSnackbar();
      }
    },
  },
  methods: {
    showSnackbar() {
      this.snackbarVisible = true;

      setTimeout(() => {
        this.snackbarVisible = false;
        if (this.$route.path !== "/cart") {
          this.$router.push("/products");
        }
      }, this.duration);
    },
  },
};
</script>

<style scoped>
.snackbar {
  display: none;
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: #227427;
  color: #fff;
  padding: 16px;
  border-radius: 4px;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.snackbar.show {
  display: block;
  transform: translateX(-50%) translateY(-100%);
  opacity: 1;
}
</style>