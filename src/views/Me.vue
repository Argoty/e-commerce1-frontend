<template>
  <div class="page-wrap">
    <div class="account-info">
      <div class="header">
        <h1 class="title">
          Mi cuenta<i
            class="fa fa-user"
            aria-hidden="true"
            style="margin-left: 5px"
          ></i>
        </h1>
      </div>

      <div class="info">
        <div class="item">
          <h2>Nombre de Usuario:</h2>
          <h3>{{ $store.state.currentUser.username }}</h3>
        </div>
        <div class="item">
          <h2>Email:</h2>
          <h3>{{ $store.state.currentUser.email }}</h3>
        </div>
        <div class="item">
          <h2>Nro Celular:</h2>
          <h3>{{ $store.state.currentUser.phone }}</h3>
        </div>
        <div class="item">
          <h2>Fecha de Nacimiento:</h2>
          <h3>{{ $store.state.currentUser.birthdate }}</h3>
        </div>
      </div>

      <div class="logout">
        <button @click="logout" class="button">
          Salir <i class="fa fa-sign-out" aria-hidden="true"></i>
        </button>
      </div>

      <hr class="divider" />
    </div>
  </div>
</template>
  
<script>
import axios from "axios";

export default {
  name: "Me",

  created() {
    window.scrollTo(0, 0);
    document.title = `Mi cuenta | ${this.$store.state.title}`;
  },
  methods: {
    logout() {
      axios.defaults.headers.common["Authorization"] = "";
      this.$store.commit("removeToken");
      this.$router.push("/login");
      this.$store.commit("setSnackbar", {
        message: "Acabas de salir de tu cuenta!",
        type: "okey",
      });
    },
  },
};
</script>
  
<style scoped>
.page-wrap{
  max-width: 900px;
}
.account-info {
  margin-top: 10px;
  background-color: #f8f8f8;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.header {
  text-align: center;
}

.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.info {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 20px 0;
}

.item {
  flex: 1;
  text-align: center;
  margin: 10px;
}

.item h2 {
  font-weight: bold;
  color: #333;
}

.item h3 {
  color: #777;
}

.logout {
  text-align: center;
  margin-top: 20px;
}

.button {
  background-color: #bf1515;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.divider {
  border: 1px solid #ccc;
  margin: 20px 0;
  width: 100%;
}
</style>