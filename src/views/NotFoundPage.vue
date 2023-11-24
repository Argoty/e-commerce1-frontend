<template>
    <h1 class="page-wrap"><i class="fa fa-frown-o" aria-hidden="true"></i>404: Pagina No Encontrada</h1>
  </template>
  
<script>
export default {
  name: "NotFoundPage",
  created() {
    document.title = `No encontrado | ${this.$store.state.title}`
  }
};
</script>

<style scoped>
h1 {
    text-align: center;
}
</style>
  