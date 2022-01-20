<template>
  <t-modal name="my-modal" ref="modal" :header="editMode? 'Edit User' :  'Add User'" :clickToClose="false"
           :escToClose="false">
    <div class="flex items-center bg-red-500 text-white text-sm font-bold px-4 py-3 rounded-lg" role="alert"
         v-show="showAlert">
      <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        <path
            d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"/>
      </svg>
      <p>Form is not filled in correctly.</p>
    </div>
    <form class="p-2">
      <div class="mb-4">
        <label>Name</label>
        <t-input v-model="form.name" placeholder="name" type="text"/>
      </div>
      <div class="mb-4">
        <label>Email</label>
        <t-input v-model="form.email" placeholder="email address" type="email"/>
      </div>
      <div class="mb-4">
        <label>Select gender</label>
        <t-select v-model="form.gender" placeholder="please select gender" :options="['male','female']"></t-select>
      </div>
      <div class="mb-4">
        <label>Date of Birth</label>
        <t-input v-model="form.dob" placeholder="select date of birth" type="date"/>
      </div>
    </form>
    <template v-slot:footer>
      <div class="flex justify-between">
        <t-button @click="closeModal" type="button">
          Cancel
        </t-button>
        <t-button v-if="editMode" @click="updateUser" type="button">
          Update User
        </t-button>
        <t-button v-else @click="saveUser" type="button">
          Save User
        </t-button>
      </div>
    </template>
  </t-modal>
</template>

<script>
import {TModal, TButton, TSelect, TInput} from 'vue-tailwind/dist/components'
import {Event_bus} from "../../event_bus";

export default {
  name: "UsersModal",
  components: {
    TButton,
    TModal,
    TSelect,
    TInput
  },
  data() {
    return {
      form: {
        id: null,
        name: '',
        email: '',
        gender: '',
        dob: null,
      },
      showAlert: false,
      editMode: false,
    }
  },
  created() {
    Event_bus.$on('open_modal', this.openModal);
    Event_bus.$on('open_update_modal', this.openEditModal);
  },
  methods: {
    openModal() {
      this.resetForm();
      this.$refs.modal.show();
    },
    openEditModal(user) {
      this.form = {...user};
      this.editMode = true;
      this.$refs.modal.show();

    },
    saveUser() {
      if (this.form.name && this.form.email && this.form.gender && this.form.dob && this.validateEmail(this.form.email)) {
        Event_bus.$emit('save_user', this.form);
        this.closeModal();
      } else {
        this.showAlert = true;
      }
    },
    validateEmail(email) {
      return email.toLowerCase().match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    },
    updateUser() {
      if (this.form.name && this.form.email && this.form.gender && this.form.dob) {
        Event_bus.$emit('update_user', this.form);
        this.closeModal();
      } else {
        this.showAlert = true;
      }
    },
    closeModal() {
      this.$refs.modal.hide();
      this.resetForm();
      this.showAlert = false;
      this.editMode = false;
    },
    resetForm() {
      this.form = {
        id: null,
        name: '',
        email: '',
        gender: '',
        dob: null
      }
    }
  }
}
</script>

<style scoped>

</style>