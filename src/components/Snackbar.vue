<template>
  <div
    class="snackbar"
    :class="{ show: snackbarVisible }"
    :style="{
      backgroundColor:
        $store.state.snackbar.type == 'okey' ? '#005f11' : '#9f0000',
    }"
  >
    {{ message }}
    <i :class="$store.state.snackbar.type == 'okey' ? 'fa fa-check-circle-o' : 'fa fa-exclamation-triangle'" aria-hidden="true"></i>
  </div>
</template>

<script>
export default {
  name: "Snackbar",
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
        this.$store.commit("setSnackbar", { message: "", color: "" });
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
  color: #ffffff;
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