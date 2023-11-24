<template>
  <div class="page-wrap">
    <h1 class="title">
      Éxito!<i
        class="fa fa-check"
        aria-hidden="true"
        style="margin-left: 5px"
      ></i>
    </h1>
  </div>
</template>
    
  <script>
export default {
  name: "success",

  mounted() {
    document.title = "Éxito | E-commerce";
  },
};
</script>
    
<style scoped>
.title {
  font-size: 24px;
  font-weight: bold;
  margin: 20px;
}
</style>