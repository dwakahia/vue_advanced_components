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
    <div class="flex justify-center md:justify-end">
      <custom-button @click_event="showModal" type="add" name="Add User"></custom-button>
    </div>
    <div class="flex flex-col mt-8">
      <div class="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <large-view @delete_user="deleteUser" @open_edit_modal="openEditModal" v-if="users.length > 0"
                    :users="users"/>
        <mobile-view v-if="users.length > 0" @delete_user="deleteUser" @open_edit_modal="openEditModal"
                     :users="users"/>
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
      users: [],
    }
  }, created() {
    Event_bus.$on('save_user', this.saveUser);
    Event_bus.$on('update_user', this.updateUser);
  }, methods: {
    showModal() {
      Event_bus.$emit('open_modal');
    },
    saveUser(data) {
      let newUser = {...data, id: Date.now()};
      this.users.push(newUser);
      console.log(this.users.length);
    },
    openEditModal(user) {
      Event_bus.$emit('open_update_modal', user);
    },
    updateUser(data) {
      let newUser = {...data};
      this.users = this.users.map((user) => {
        if (user.id === newUser.id) {
          return newUser;
        }
        return user;
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

          this.users = this.users.filter((usr) => usr.id !== user.id);

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