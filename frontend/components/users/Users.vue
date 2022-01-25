<template>
  <div class="container mx-auto mt-10 flex-grow">
    <bread-crumbs>
      <template v-slot:title>
        Users List
      </template>
      <template v-slot:page>
        Users
      </template>
    </bread-crumbs>
    <div class="md:flex justify-between items-center">
      <button id="addUser" class="p-3 rounded-lg text-white w-full md:w-auto bg-blue-600 mb-3"  @click="showModal">Add User</button>
      <div class="relative mb-2 w-full md:w-1/4">
        <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <i class="fa fa-search"></i>
        </div>
        <input v-model="searchquery" type="text" id="email-adress-icon"
               class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
               placeholder="Search person">
      </div>
    </div>
    <div class="flex flex-col mt-4">
      <div class="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <large-view @delete_user="deleteUser" @open_edit_modal="openEditModal" v-if="all_users.length > 0"
                    :users="all_users"/>
        <mobile-view v-if="all_users.length > 0" @delete_user="deleteUser" @open_edit_modal="openEditModal"
                     :users="all_users"/>
        <EmptyView message="No users Found" v-else/>
      </div>
    </div>
    <users-modal/>
  </div>
</template>

<script>
import {Event_bus} from "../../event_bus";
import LargeView from "./LargeView";
import MobileView from "./MobileView";
import EmptyView from "../common/EmptyView";
import UsersModal from "./UsersModal";
import {mapGetters} from "vuex"
import store from "../../store/store";
import http from "../../utils/http";
import Vue from "vue";

export default {
  name: "Users",
  components: {
    LargeView,
    MobileView,
    EmptyView,
    UsersModal
  },
  data() {
    return {
      searchquery: ''
    }
  },
  watch: {
    searchquery: function (val) {
      this.$store.dispatch('getAllUsers', this.searchquery)
    }
  },
  computed: {
    ...mapGetters(["all_users"])
  },
  created() {
    Event_bus.$on('save_user', this.saveUser);
    Event_bus.$on('update_user', this.updateUser);
    this.$store.dispatch('getAllUsers');
  },
  methods: {
    showModal() {
      Event_bus.$emit('open_modal');
    },
    saveUser(data) {
      let user = {...data};
      http.post('/users/create', user).then((response) => {
        if (response.status === 200) {
          this.$store.commit('addUser',response.data.user);
          Vue.$toast.success('User added successfully.', {
            position: 'top-right'
          })
          Event_bus.$emit('close_modal');
        }
      }).catch((error) => {
        Vue.$toast.error(`${error.response.data.message}`, {
          position: 'top-right'
        })
      })
    },
    openEditModal(user) {
      Event_bus.$emit('open_update_modal', user);
    },
    updateUser(data) {
      let user = {...data};
      http.put(`/users/update/${user.id}`, user).then((response) => {
        if (response.status === 200) {
          this.$store.commit('updateUser', response.data.user);
          Vue.$toast.success('User updated successfully.', {
            position: 'top-right'
          })
          Event_bus.$emit('close_modal');
        }
      }).catch((error) => {
        Vue.$toast.error(`${error.response.data.message}`, {
          position: 'top-right'
        })
      })
    },
    deleteUser(user) {
      this.$swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {

          store.dispatch('deleteUser', {user});

          this.$swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
          )
        }
      })

    },
  }
}
</script>

<style scoped>

</style>