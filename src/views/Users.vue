
<template>
  <div class="page-wrap">
    <h2>Usuarios</h2>
    <Searcher @search="searchUsers" style="margin: 0 20px 0 20px" />
    <div class="users-table">
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Fecha de Nacimiento</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in filteredUsers" :key="user._id">
            <td>{{ user.username }}</td>
            <td>{{ user.birthdate }}</td>
            <td>
              <a
                :href="
                  'https://mail.google.com/mail/?view=cm&fs=1&to=' + user.email
                "
                class="contact-link"
                target="_blank"
                >{{ user.email }}</a
              >
            </td>
            <td>
              <a
                :href="linkWhatsaap(user.phone)"
                class="contact-link"
                target="_blank"
                >{{ user.phone }}</a
              >
            </td>
            <td>
              <router-link :to="{ name: 'usercart', params: { id: user._id }, query: { username: user.username } }">

                <button>
                <span>Carrito</span>
                <i class="fa fa-shopping-cart" aria-hidden="true" title="Carrito"></i>
              </button>
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
      <h3 v-if="noUser" style="text-align: center">
        Lo siento, no hay usuarios :(
        <i class="fa fa-frown-o" aria-hidden="true"></i>
      </h3>
      <!-- <div class="paginacion-tabla">
        <button @click="previousPage" :disabled="currentPage === 0">
          <i class="fa fa-arrow-left" aria-hidden="true"></i>
        </button>
        <button @click="nextPage" :disabled="currentPage === totalPages - 1">
          <i class="fa fa-arrow-right" aria-hidden="true"></i>
        </button>
      </div> -->
    </div>
  </div>
</template>
    
    <script>
import axios from "axios";
import Searcher from "@/components/Searcher.vue";

export default {
  name: "users",
  components: { Searcher },
  data() {
    return {
      users: [],
      filteredUsers: [],
      noUser: false,
    };
  },
  async created() {
    this.$store.commit("setIsLoading", true);
    document.title = `Users | ${this.$store.state.title}`;

    try {
      const result = await axios.get("/users");
      const users = result.data;
      this.users = users;
      this.filteredUsers = users;
    } catch (err) {
      this.$store.commit("setSnackbar", {
        message: err.response.data.error,
        type: "error",
      });
    } finally {
      this.$store.commit("setIsLoading", false);
    }
  },
  methods: {
    searchUsers(query) {
      this.noUser = false;
      if (query) {
        this.filteredUsers = this.users.filter((user) => {
          return (
            user.username.toLowerCase().includes(query) ||
            user.birthdate.toLowerCase().includes(query) ||
            user.email.toLowerCase().includes(query) ||
            user.phone.toLowerCase().includes(query)
          );
        });

        if (this.filteredUsers.length === 0) this.noUser = true;
      } else this.filteredUsers = [...this.users];
    },
    linkWhatsaap(phone) {
      if (phone) {
        const phoneFormated = phone.replace(/\D/g, "");
        // Suponiendo que el teléfono siempre comienza con "+", elimina el signo "+"
        return "https://api.whatsapp.com/send?phone=" + phoneFormated;
      }
      return "";
    },
  },
};
</script>
    
    <style scoped>
.page-wrap {
  max-width: 100%;
}
h2 {
  text-align: center;
  margin: 20px 0 0 0;
  padding: 0;
}

.users-table {
  width: 100%;
  padding: 5px 20px 20px 20px;
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
.contact-link {
  text-decoration: none;
  color: #2d3339;
  transition: color 0.3s;
}

/* ------ ESTILOS RESPONSIVE ---------*/
@media (max-width: 768px) {
  td th {
    font-size: 12px; /* Reducir el tamaño del texto en las celdas */
  }

  button {
    font-size: 14px; /* Reducir el tamaño de los botones */
    padding: 5px 10px; /* Ajustar el relleno de los botones */
  }
}
</style>