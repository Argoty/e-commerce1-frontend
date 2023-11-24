<template>
  <div class="sections-table">
    <table>
      <thead>
        <tr>
          <th>Imagen</th>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Opciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="section in displayedSections" :key="section._id">
          <td style="text-align: center">
            <img
              :src="section.imageUrl"
              alt="Section Image"
              class="section-image"
            />
          </td>
          <td>{{ section.name }}</td>
          <td>{{ section.description }}</td>
          <td >
            <button
              @click="
                showEditDialog = true;
                sectionToEdit = section;
              "
              style="background-color: rgb(0, 33, 103)"
            >
              <i class="fa fa-pencil" aria-hidden="true"></i>
            </button>
            <button
              @click="confirmDelete(section._id)"
              style="margin-left: 5px; background-color: rgb(193, 30, 30)"
            >
              <i class="fa fa-trash-o" aria-hidden="true"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="paginacion-tabla">
      <button @click="previousPage" :disabled="currentPage === 0">
        <i class="fa fa-arrow-left" aria-hidden="true"></i>
      </button>
      <button @click="nextPage" :disabled="currentPage === totalPages - 1">
        <i class="fa fa-arrow-right" aria-hidden="true"></i>
      </button>
    </div>

    <!-- DiÁLOGOS DE EDITAR Y ELIMINAR -->
    <div v-if="showDeleteDialog" class="overlay">
      <div class="dialog">
        <p>¿Seguro que quieres eliminar esta Categoria?</p>
        <div class="dialog-buttons">
          <button @click="deleteConfirmed" style="margin-right: 5px">Sí</button>
          <button
            @click="cancelDelete"
            style="background-color: rgb(189, 29, 29)"
          >
            No
          </button>
        </div>
      </div>
    </div>

    <div v-if="showEditDialog" class="overlay">
      <div class="dialog edit-dialog">
        <h2>Editar Categoria</h2>
        <FormSection
          @sendSection="editSection"
          :sectionEditar="sectionToEdit"
        />
        <div style="text-align: right">
          <button
            @click="
              sectionToEdit = null;
              showEditDialog = false;
            "
            style="background-color: rgb(189, 29, 29)"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
    
<script>
import FormSection from "@/components/FormSection.vue";
import axios from "axios";
export default {
  components: {
    FormSection,
  },
  name: "SectionTable",
  props: ["sections"],
  data() {
    return {
      showDeleteDialog: false,
      sectionIdToDelete: null,

      showEditDialog: false,
      sectionToEdit: null,

      sectionsPerPage: 5,
      currentPage: 0,
      totalPages: 0,
    };
  },
  computed: {
    displayedSections() {
      if (!this.sections) {
        return [];
      }
      this.totalPages = Math.ceil(this.sections.length / this.sectionsPerPage);

      const start = this.currentPage * this.sectionsPerPage;
      const end = start + this.sectionsPerPage;
      return this.sections.slice(start, end);
    },
  },
  methods: {
    previousPage() {
      if (this.currentPage > 0) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages - 1) {
        this.currentPage++;
      }
    },

    confirmDelete(sectionId) {
      this.sectionIdToDelete = sectionId;
      this.showDeleteDialog = true;
    },
    async deleteConfirmed() {
      if (this.sectionIdToDelete) {
        this.$store.commit("setIsLoading", true);

        try {
          await axios.delete(`/sections/${this.sectionIdToDelete}`);

          this.showDeleteDialog = false;
          this.sectionIdToDelete = null;

          this.$emit("sectionEliminated");

          this.$store.commit("setSnackbar", {
            message: "¡Categoria Eliminado!",
            type: "okey",
          });
        } catch (err) {
          console.log(err);
          this.$store.commit("setSnackbar", {
            message: err.response.data.error,
            type: "error",
          });
        } finally {
          this.$store.commit("setIsLoading", false);
        }
      }
    },
    cancelDelete() {
      this.showDeleteDialog = false;
      this.sectionIdToDelete = null;
    },

    async editSection(sectionData) {
      if (sectionData) {
        this.$store.commit("setIsLoading", true);

        const formData = new FormData();
        formData.append("name", sectionData.name);
        formData.append("description", sectionData.description);
        formData.append("image", sectionData.image);

        try {
          await axios.put(`/sections/${sectionData._id}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

          this.showEditDialog = false;
          this.sectionToEdit = null;

          this.$emit("sectionEdited");

          this.$store.commit("setSnackbar", {
            message: "¡Categoria Editado!",
            type: "okey",
          });
        } catch (err) {
          this.$store.commit("setSnackbar", {
            message: err.response.data.error,
            type: "error",
          });
        } finally {
          this.$store.commit("setIsLoading", false);
        }
      }
    },
  },
};
</script>
    
    <style scoped>
/* ------ ESTILOS TABLA ---------*/
.sections-table {
  width: 100%;
  padding: 5px 20px 2px 20px;
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

.section-image {
  max-width: 100px;
  max-height: 100px;
}

/* ------ ESTILOS DIALOGOS ---------*/
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* Transparencia */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.dialog {
  padding: 20px;
  background: white;
  border: 1px solid #ccc;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}
.edit-dialog {
  width: 600px;
}

.dialog-buttons {
  margin-top: 10px;
  text-align: center;
}

/* ------ ESTILOS PAGINACION ---------*/
.paginacion-tabla {
  display: flex;
  justify-content: flex-start; /* Alinea los botones a la izquierda */
  align-items: center;
  margin-top: 10px;
  max-width: 300px;
}

.paginacion-tabla button {
  padding: 8px 16px;
  margin-right: 10px;
  border: none;
  background-color: #474747;
  color: #fff;
  cursor: pointer;
  border-radius: 4px;
  font-size: 18px;
}

.paginacion-tabla button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* ------ ESTILOS RESPONSIVE ---------*/
@media (max-width: 768px) {
  .section-image {
    max-width: 50px; /* Cambiar el tamaño de la imagen en pantallas más pequeñas */
  }

  td {
    font-size: 12px; /* Reducir el tamaño del texto en las celdas */
  }

  button {
    font-size: 14px; /* Reducir el tamaño de los botones */
    padding: 5px 10px; /* Ajustar el relleno de los botones */
  }
}
</style>
    