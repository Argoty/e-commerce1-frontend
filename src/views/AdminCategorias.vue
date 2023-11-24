<template>
  <div class="page-wrap">
    <h2>Crear Categoria</h2>
    <FormSection
      @sendSection="createSection"
      :sectionEditar="{}"
      ref="formSection"
    />
    <Searcher @search="searchSections" style="margin: 0 20px 0 20px" />
    <SectionTable
      :sections="filteredSections"
      @sectionEliminated="getSections()"
      @sectionEdited="getSections()"
    />
    <h3 v-if="noSection" style="text-align: center">
      Lo siento, no hay categorias :(
      <i class="fa fa-frown-o" aria-hidden="true"></i>
    </h3>

  </div>
</template>
    
    <script>
import axios from "axios";
import Searcher from "@/components/Searcher.vue";
import SectionTable from "@/components/SectionTable.vue";
import FormSection from "@/components/FormSection.vue";

export default {
  name: "adminCategorias",
  components: { FormSection, Searcher, SectionTable },
  data() {
    return {
      sections: [],
      filteredSections: [],
      noSection: false,
    };
  },
  async created() {
    window.scrollTo(0, 0);

    await this.getSections();
    document.title = `Admin Categorias| ${this.$store.state.title}`;
  },

  methods: {
    async getSections() {
      this.$store.commit("setIsLoading", true);

      try {
        const result = await axios.get("/sections");
        const sections = result.data;
        this.sections = sections;
        this.filteredSections = sections;
      } catch (err) {
        this.$store.commit("setSnackbar", {
          message: err.response.data.error,
          type: "error",
        });
      } finally {
        this.$store.commit("setIsLoading", false);
      }
    },

    searchSections(query) {
      this.noSection = false;
      if (query) {
        this.filteredSections = this.sections.filter((section) => {
          return (
            section.name.toLowerCase().includes(query) ||
            section.description.toLowerCase().includes(query)
          );
        });

        if (this.filteredSections.length === 0) this.noSection = true;
      } else this.filteredSections = [...this.sections];
    },
    async createSection(sectionData) {
      this.$store.commit("setIsLoading", true);

      const formData = new FormData();
      formData.append("name", sectionData.name);
      formData.append("description", sectionData.description);
      formData.append("image", sectionData.image);

      try {
        await axios.post("/sections", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        await this.getSections();

        this.$refs.formSection.sectionForm = {
          name: "",
          description: "",
          image: null,
        };

        this.$store.commit("setSnackbar", {
          message: "¡Categoria Agregada!",
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
    },
  },
};
</script>
    
    <style scoped>
.page-wrap {
  max-width: 100%;
}
h2 {
  text-align: center;
  margin: 10px 0 0 0;
  padding: 0;
}
</style>