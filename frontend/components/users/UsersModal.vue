<template>
  <t-modal name="my-modal" ref="modal" :header="editMode? 'Edit User' :  'Add User'" :clickToClose="false"
           :escToClose="false">
    <form class="p-2">
      <div class="mb-4">
        <label>Name</label>
        <t-input v-model="form.name" placeholder="name" type="text"/>
        <p class="mt-2 text-sm text-red-600 dark:text-red-500" v-if="errors.name">{{ errors.name }}</p>
      </div>
      <div class="mb-4">
        <label>Email</label>
        <t-input v-model="form.email" placeholder="email address" type="email"/>
        <p class="mt-2 text-sm text-red-600 dark:text-red-500" v-if="errors.email">{{ errors.email }}</p>
      </div>
      <div class="mb-4">
        <label>Select gender</label>
        <t-select v-model="form.gender" placeholder="please select gender" :options="['male','female']"></t-select>
        <p class="mt-2 text-sm text-red-600 dark:text-red-500" v-if="errors.gender">{{ errors.gender }}</p>
      </div>
      <div class="mb-4">
        <label>Date of Birth</label>
        <t-input v-model="form.dob" placeholder="select date of birth" type="date"/>
        <p class="mt-2 text-sm text-red-600 dark:text-red-500" v-if="errors.dob">{{ errors.dob }}</p>
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
      errors: {},
      editMode: false,
    }
  },
  created() {
    Event_bus.$on('open_modal', this.openModal);
    Event_bus.$on('close_modal', this.closeModal);
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
      if(this.validateForm()){
        Event_bus.$emit('save_user', this.form);
      }

    },
    validateEmail(email) {
      return email.toLowerCase().match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    },
    updateUser() {
      if(this.validateForm()){
        Event_bus.$emit('update_user', this.form);
      }
    },
    validateForm() {
      this.errors = {};
      if (!this.form.name) {
        this.errors.name = 'name is required';
        return false;
      }
      if (!this.form.email) {
        this.errors.email = 'email is required';
        return false;
      }
      if (!this.validateEmail(this.form.email)) {
        this.errors.email = 'invalid email';
        return false;
      }

      if (!this.form.gender) {
        this.errors.gender = 'Please select gender';
        return false;
      }

      if (!this.form.dob) {
        this.errors.dob = 'Please select date of birth';
        return false;
      }

      return true;
    },
    closeModal() {
      this.$refs.modal.hide();
      this.resetForm();
      this.errors = {};
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