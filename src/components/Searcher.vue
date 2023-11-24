<template>
  <form class="searcher" @submit.prevent="$emit('search', searchTerm)">
    <div class="search-input-container">
      <input
        type="text"
        v-model="searchTerm"
        placeholder="Buscar..."
        class="search-input"
      />
      <div class="icon-container">
        <button
          type="button"
          class="clear-icon"
          @click="searchTerm = ''"
        >
          <i class="fa fa-times"></i>
        </button>
        <button type="submit" class="search-icon">
          <i class="fa fa-search"></i>
        </button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      searchTerm: '',
    };
  },
};
</script>

<style scoped>
.searcher {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.search-input-container {
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 4px;
  overflow: hidden;
  flex: 1;
}

.search-input {
  flex: 1;
  padding: 8px;
  border: none;
  font-size: 16px;
  outline: none;
}

.icon-container {
  display: flex;
}

.clear-icon,
.search-icon {
  cursor: pointer;
  background: none;
  border: none;
  padding: 8px;
  display: flex;
  align-items: center;
}

.clear-icon i,
.search-icon i {
  font-size: 16px;
  color: #777;
}

.clear-icon:hover i {
  color: red;
}

.search-icon:hover i {
  color: rgb(0, 112, 187);
}
</style>
