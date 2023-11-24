<template>
  <div class="page-wrap">
    <div class="register-form">
      <h2>
        {{ registration ? "Formulario de Registro" : "Formulario de Acceso" }}
      </h2>
      <form @submit.prevent="register">
        <div class="form-group">
          <label for="username">Nombre de Usuario</label>
          <input type="text" v-model="formData.username" required />
        </div>
        <div class="form-group">
          <label for="password">Contraseña</label>
          <div class="password-input">
            <input
              :type="showPassword ? 'password' : 'text'"
              v-model="formData.password"
              required
            />
            <i
              class="password-toggle"
              :class="{
                'fa fa-eye': showPassword,
                'fa fa-eye-slash': !showPassword,
              }"
              @click="showPassword = !showPassword"
            ></i>
          </div>
        </div>
        <div class="form-group" v-if="registration">
          <label for="email">Email</label>
          <input type="email" v-model="formData.email" required />
        </div>
        <div class="form-group" v-if="registration">
          <label for="phone">Nro de Teléfono</label>
          <input
          v-mask="'+57 (###) ###-####'"
            type="text"
            v-model="formData.phone"
            required
          />
        </div>
        <div class="form-group" v-if="registration">
          <label for="birthdate">Fecha de Nacimiento</label>
          <input type="date" v-model="formData.birthdate" required />
        </div>

        <button type="submit">
          {{ registration ? "Registrarse" : "Acceder" }}
        </button>
        <button
          type="button"
          v-if="registration"
          class="options"
          @click="registration = false"
        >
          ¿Ya tienes una cuenta?
        </button>
        <button
          type="button"
          v-else
          class="options"
          @click="registration = true"
        >
          ¿Aun no tienes cuenta?
        </button>
      </form>
    </div>
  </div>
</template>
  
<script>
import axios from "axios";
import {mask} from 'vue-the-mask';

export default {
  name: "Login",
  data() {
    return {
      formData: {
        username: "",
        password: "",
        birthdate: null,
        email: "",
        phone: "",
      },
      registration: true,
      showPassword: true,
    };
  },
  created() {
    window.scrollTo(0, 0);
    document.title = `Acceso | ${this.$store.state.title}`;
  },
  methods: {
    async register() {
      this.$store.commit("setIsLoading", true);

      try {
        axios.defaults.headers.common["Authorization"] = "";
        localStorage.removeItem("token");

        const data = {
          username: this.formData.username,
          password: this.formData.password,
          email: this.registration ? this.formData.email : undefined,
          birthdate: this.registration ? this.formData.birthdate : undefined,
          phone: this.registration ? this.formData.phone : undefined,
        };

        const response = await axios.post(
          `/auth/${this.registration ? "register" : "login"}`,
          data
        );

        // Obtiene token y lo pone en las peticiones axios y en localStorage

        const dataRes = response.data;
        this.$store.commit("setToken", dataRes);
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + dataRes.token;

        localStorage.setItem("token", dataRes.token);
        localStorage.setItem("currentUser", JSON.stringify(dataRes.user));

        const toPath = this.$route.query.to || "/products";
        this.$router.push(toPath);

        this.$store.commit("setSnackbar", {
          message: `${this.registration ? "Registro" : "Acceso"} exitoso`,
          type: "okey",
        });
        this.formData = {};
      } catch (err) {
        console.log(err);
        this.$store.commit("setSnackbar", {
          message: err.response.data.error,
          type: "error",
        });
      } finally {
        this.$store.commit("setIsLoading", false);
      }
    },
  },
  directives: {
    mask,
  },
};
</script>
  
  <style scoped>
.register-form {
  max-width: 400px;
  margin: 0 auto 10px auto;
}

h2 {
  text-align: center;
  margin-bottom: 10px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
}

input[type="text"],
input[type="password"],
input[type="date"],
input[type="email"],
input[type="phone"] {
  width: 100%;
  padding: 10px;
  font-size: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #242424;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

button:hover {
  background-color: #343434;
}

.options {
  margin-top: 5px;
  background-color: #243656;
}
.options:hover {
  background-color: #384864;
}
.password-input {
  display: flex;
  align-items: center;
  position: relative;
}

.password-toggle {
  cursor: pointer;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
}
</style>