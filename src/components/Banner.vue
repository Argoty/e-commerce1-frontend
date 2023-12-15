<template>
  <div class="banner" style="margin-top: 60px">
    <img src="../assets/banner.jpg" alt="Banner de Lencería para Hogar" />
    <div class="banner-content">
      <h2 class="fancy-text">Lencería para un Hogar Elegante</h2>
      <p class="banner-paragraph">
        Descubre nuestra colección de sábanas, toallas, cubrelechos y más para
        transformar tu hogar en un espacio acogedor y elegante. Envíos a todo
        Colombia.
      </p>
    </div>
  </div>
</template>
    <script>
export default {
  name: "Banner",
};
</script>
    
    <style scoped>
.banner {
  position: relative;
  width: 100%;
  max-height: 500px; /* Ajusta la altura según tu diseño */
  overflow: hidden;
}

.banner img {
  width: 100%;
  height: auto;
}

.banner-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: #000000;
}
.fancy-text {
  font-family: "Lobster", cursive; /* Cambia por la fuente que prefieras */
  font-size: 2.5em;
  margin-bottom: 10px;
  color: #000000;
  text-shadow: 2px 2px 4px rgba(91, 91, 91, 0.25); /* Sombra para mejorar la legibilidad */
}
.banner-paragraph {
  font-size: 1.2em;
  color: #242424;
  margin: 0 auto 20px;
  line-height: 1.5;
}

@media screen and (max-width: 768px) {
  .fancy-text {
    font-size: 1.6em;
  }

  .banner-content {
    width: 80%;
  }

  .banner-paragraph {
    font-size: 0.6em;
  }
}
</style>