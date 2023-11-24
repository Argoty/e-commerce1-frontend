<template>
  <footer class="footer">
    <div class="footer-social">
        <a href="https://www.instagram.com/argoty__/" class="social-icon" target="_blank">
        <i class="fa fa-instagram"></i>
      </a>
      <a href="https://github.com/JaxisArty" class="social-icon" target="_blank">
        <i class="fa fa-github"></i>
      </a>
      <a href="https://www.linkedin.com/in/javier-argoty-roa-241113268/" class="social-icon" target="_blank">
        <i class="fa fa-linkedin"></i>
      </a>
      <!-- Agrega más iconos de redes sociales según tus necesidades -->
    </div>
    <div class="footer-text">
      &copy; {{ currentYear }} Javier Argoty. Todos los derechos reservados.
    </div>
  </footer>
</template>
  
  <script>
export default {
  data() {
    return {
      currentYear: new Date().getFullYear(),
    };
  },
};
</script>
  
  <style scoped>
.footer {
  background-color: #333;
  color: #fff;
  padding: 20px;
  text-align: center;

}

.social-icon {
  color: #fff;
  font-size: 24px;
  margin: 0 10px;
  text-decoration: none;
  transition: color 0.3s;
}

.social-icon:hover {
  color: #007bff;
}
.footer-social {
    margin-bottom: 8px;
}

</style>