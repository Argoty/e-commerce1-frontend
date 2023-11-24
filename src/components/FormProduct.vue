<template>
  <div class="create-product-form">
    <form @submit.prevent="$emit('sendProduct', productForm)">
      <div class="form-group">
        <label for="productName">Nombre del Producto</label>
        <input type="text" v-model="productForm.name" required />
      </div>
      <div class="form-group">
        <label for="productPrice">Precio</label>
        <input
          type="text"
          v-model.lazy="productForm.price"
          v-money="money"
          required
        />
      </div>
      <div class="form-group">
        <label for="productDescription">Descripción</label>
        <textarea v-model="productForm.description" required></textarea>
      </div>

      <div class="form-group">
        <label for="productCategory">Categoría</label>
        <div class="custom-select">
          <select v-model="productForm.section" required>
            <option value="" disabled selected>Seleccionar categoría</option>
            <option
              v-for="section in sections"
              :key="section._id"
              :value="section"
            >
              {{ section.name }}
            </option>
          </select>
        </div>
      </div>

      <div class="form-group">
        <label for="productImage">Imagen del Producto</label>
        <div class="file-input">
          <input type="file" @change="onFileChange" accept="image/*" required />
          <label class="file-label"> Seleccionar archivo </label>
          <span v-if="productForm.image" class="file-name">{{
            productForm.image.name
          }}</span>
        </div>
      </div>

      <button type="submit">
        {{ productoEditar._id ? "Editar Producto" : "Crear Producto" }}
        <i
          :class="productoEditar._id ? 'fa fa-pencil' : 'fa fa-plus'"
          aria-hidden="true"
        ></i>
      </button>
    </form>
  </div>
</template>

<script>
import { VMoney } from "v-money";
export default {
  name: "FormProduct",
  props: {
    productoEditar: Object,
    sections: Array
  },
  data() {
    return {
      productForm: {
        name: "",
        price: null,
        description: "",
        image: null,
        section: null
      },

      money: {
        thousands: ".",
        prefix: "$ ",
        precision: 0,
      },
    };
  },
  created() {
    if (this.productoEditar._id) {
      this.productForm = { ...this.productoEditar, image: null };
    }
  },
  watch: {
    productoEditar(value) {
      if (value._id) {
        this.productForm = { ...value, image: null };
      }
    },
  },
  methods: {
    onFileChange(event) {
      this.productForm.image = event.target.files[0];
    },
  },
  directives: { money: VMoney },
};
</script>

<style scoped>
.create-product-form {
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
.custom-select {
  position: relative;
  width: 100%;
}

.custom-select select {
  width: 100%;
  padding: 10px;
  font-size: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  appearance: none;
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="%23343a40"><path d="M2 6h28c1.1 0 2 .9 2 2s-.9 2-2 2H2C.9 10 0 9.1 0 8s.9-2 2-2zM2 18h28c1.1 0 2 .9 2 2s-.9 2-2 2H2c-1.1 0-2-.9-2-2s.9-2 2-2z" fill="%23343a40"/></svg>')
    no-repeat right 10px center/16px 12px;
}

.custom-select select:hover {
  border-color: #007bff;
}

.custom-select select:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
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