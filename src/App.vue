<template>
  <div id="app">
    <Loader v-if="$store.state.isLoading" />
    <NavBar />
    <router-view style="margin-top: 75px;"/>
    <Footer />
    <Snackbar :message="$store.state.snackbar.message"/>
  </div>
</template>

<script>
import axios from 'axios';
import NavBar from "./components/NavBar.vue";
import Loader from "./components/Loader.vue";
import Footer from "./components/Footer.vue";
import Snackbar from "./components/Snackbar.vue";

export default {
  name: "App",
  components: {
    NavBar,
    Loader,
    Footer,
    Snackbar
  },
  beforeCreate() {
    this.$store.commit("initializeStore");

    const token = this.$store.state.token;

    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token
    } else {
      axios.defaults.headers.common["Authorization"] = ""
    }
  },
};
</script>

<style>
* {
  box-sizing: border-box;
  font-family: Arial;
}

body{
  margin:0
}
.page-wrap {
  margin: auto;
  display: flex;
  flex-direction: column;
  min-height: 75vh;
}

button {
  background-color: black;
  border: none;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  outline: 0;
  padding: 16px;
}

button:hover {
  opacity: 0.9;
}
</style>