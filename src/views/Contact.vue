<template>
  <div class="page-wrap">
    <div class="contact">
      <h2 class="contact-title">Información de Contacto</h2>
      <ul class="contact-list">
        <li class="contact-item">
          <strong class="contact-label"
            ><i
              class="fa fa-whatsapp"
              style="margin-right: 5px"
              aria-hidden="true"
            ></i
            >Teléfono (WhatsApp):</strong
          >
          <a
            :href="linkWhatsaap(phone)"
            class="contact-link"
            target="_blank"
            v-for="(phone, index) in dataContact.phone"
            :key="index"
            >{{ phone }}</a
          >
        </li>
        <li class="contact-item">
          <strong class="contact-label"
            ><i
              class="fa fa-envelope"
              style="margin-right: 5px"
              aria-hidden="true"
            ></i
            >Correo Electrónico:</strong
          >
          <a
            :href="
              'https://mail.google.com/mail/?view=cm&fs=1&to=' +
              dataContact.email
            "
            class="contact-link"
            target="_blank"
            >{{ dataContact.email }}</a
          >
        </li>
        <li class="contact-item">
          <strong class="contact-label"
            ><i
              class="fa fa-map-marker"
              style="margin-right: 5px"
              aria-hidden="true"
            ></i
            >Ubicación:</strong
          >
          <p class="cont" style="display: inline">
            {{ dataContact.location }}
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "contact",
  data() {
    return {
      dataContact: {},
    };
  },
  async created() {
    this.$store.commit("setIsLoading", true);
    window.scrollTo(0, 0);
    document.title = `Contacto | ${this.$store.state.title}`;

    try {
      const response = await axios.get("/contact");
      this.dataContact = response.data;
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
    linkWhatsaap(phone) {
      if (phone) {
        const phoneFormated = phone.replace("+", "").replace(" ", "");
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
  max-width: 800px;
}
.contact {
  font-family: Arial, sans-serif;
  background-color: #f4f4f4;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 20px;
  margin: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.contact-title {
  font-size: 1.5rem;
  margin: 0 0 20px;
}

.contact-list {
  list-style: none;
  padding: 0;
}

.contact-item {
  margin-bottom: 15px;
}

.contact-label {
  font-weight: bold;
  margin-right: 10px;
}

.contact-link {
  text-decoration: none;
  color: #2d3339;
  transition: color 0.3s;
}

.contact-link:hover {
  color: #8893a0;
}
</style>
  

