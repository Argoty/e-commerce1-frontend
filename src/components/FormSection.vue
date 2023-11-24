<template>
  <div class="create-section-form">
    <form @submit.prevent="$emit('sendSection', sectionForm)">
      <div class="form-group">
        <label for="sectionName">Nombre de la categoria</label>
        <input type="text" v-model="sectionForm.name" required />
      </div>
      <div class="form-group">
        <label for="sectionDescription">Descripción</label>
        <textarea v-model="sectionForm.description" required></textarea>
      </div>
      <div class="form-group">
        <label for="sectionImage">Imagen de la categoria</label>
        <div class="file-input">
          <input type="file" @change="onFileChange" accept="image/*" required />
          <label class="file-label"> Seleccionar archivo </label>
          <span v-if="sectionForm.image" class="file-name">{{
            sectionForm.image.name
          }}</span>
        </div>
      </div>

      <button type="submit">
        {{ sectionEditar._id ? "Editar categoria" : "Crear categoria" }}
        <i
          :class="sectionEditar._id ? 'fa fa-pencil' : 'fa fa-plus'"
          aria-hidden="true"
        ></i>
      </button>
    </form>
  </div>
</template>
  
  <script>
export default {
  name: "Formsection",
  props: {
    sectionEditar: Object,
  },
  data() {
    return {
      sectionForm: {
        name: "",
        description: "",
        image: null,
      },
    };
  },
  created() {
    if (this.sectionEditar._id) {
      this.sectionForm = { ...this.sectionEditar, image: null };
    }
  },
  watch: {
    sectionEditar(value) {
      if (value._id) {
        this.sectionForm = { ...value, image: null };
      }
    },
  },
  methods: {
    onFileChange(event) {
      this.sectionForm.image = event.target.files[0];
    },
  },
};
</script>
  
  <style scoped>
.create-section-form {
  width: 100%;
  box-sizing: border-box;
  padding: 0px 20px 10px 20px;
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
input[type="number"],
textarea {
  width: 100%;
  padding: 10px;
  font-size: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.file-input {
  position: relative;
  overflow: hidden;
  margin-top: 5px;
}

.file-input input {
  position: absolute;
  font-size: 999px;
  opacity: 0;
  right: 0;
  top: 0;
}
.file-input:hover {
  opacity: 0.8;
}

.file-label {
  display: inline-block;
  padding: 8px 10px;
  border-radius: 4px;
  border: 3px solid rgb(61, 61, 61);
  cursor: pointer;
}

.file-name {
  font-size: 15px;
  color: #666;
}

button {
  width: 100%;
  padding: 10px;
  background-color: rgb(15, 148, 60);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}
</style>