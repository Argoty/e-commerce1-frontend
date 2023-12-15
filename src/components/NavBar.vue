<template>
  <div id="nav-bar">
    <router-link to="/products" id="products-link" style="margin: 0;">
      <img src="../assets/logo.png" alt="J y S Logo" />
    </router-link>
    <div id="button-container" :class="{ active: mobileMenuOpen }">
      <router-link to="/admin" class="button-link" v-if="$store.state.isAdmin">
        <button><span class="subtitulo">Admin</span> <i class="fa fa-cog" aria-hidden="true" title="Admin"></i></button>
      </router-link>
      <router-link to="/cart" class="button-link">
        <button>
          <span class="subtitulo">Carrito</span> <i class="fa fa-shopping-cart" aria-hidden="true" title="Carrito"></i>
        </button>
      </router-link>
      <router-link to="/me" class="button-link" >
        <button><span class="subtitulo">Cuenta</span> <i class="fa fa-user" aria-hidden="true" title="Cuenta"></i></button>
      </router-link>
      <router-link to="/contact" class="button-link" >
        <button><span class="subtitulo">Contacto</span> <i class="fa fa-phone" aria-hidden="true" title="Contacto"></i></button>
      </router-link>
    </div>
    <div id="menu-button" @click="toggleMobileMenu" class="responsive-button">
      <i class="fa fa-bars" aria-hidden="true"></i>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mobileMenuOpen: false,
    };
  },
  methods: {
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen;
    },
  },
};
</script>

<style scoped>
.responsive-button {
  display: none;
}
#nav-bar {
  position: fixed;
  top: 0;
  width: 100%;
  background-color: rgb(247, 247, 247);
  border-bottom: 1px solid #ddd;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  height: 75px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 999;
  padding: 0 16px; /* Agrega un espacio a cada lado del contenido */
}

#menu-button {
  cursor: pointer;
  font-size: 24px;
}

#products-link {
  color: black;
  font-size: 22px;
  text-decoration: none;
  margin-left: 16px;
}

#button-container {
  display: flex;
  align-items: center;
}
.subtitulo {
  display: none;
}

.button-link {
  text-decoration: none;
  margin-left: 10px;
}





/* Responsive styles for mobile menu */
@media screen and (max-width: 768px) {
  #menu-button {
    display: block;
  }
  .subtitulo {
    display: inline;
  }
  .responsive-button {
    display: block;
    margin-right: 16px;
  }
  /* Estilo para los botones en el menú responsive */
  .button-link button {
    background: none; /* Fondo transparente */
    border: none; /* Sin borde */
    padding: 0;
    margin-top: 5px; /* Sin relleno */
    font-size: 18px; /* Tamaño de fuente deseado */
    color: black; /* Color del texto */
    cursor: pointer;
  }
  .button-link button:hover {
    opacity: 0.7;
  }

  #button-container {
    display: none;
    position: absolute;
    top: 75px;
    right: 0;
    background-color: rgb(247, 247, 247);
    width: 100%;
    text-align: right;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    flex-direction: column;
  }

  #button-container.active {
    display: flex;
  }
}
</style>
