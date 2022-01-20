<template>
  <div class="md:hidden">
    <div v-for="(user,index) in  users" :key="index" class="shadow-lg my-4 mx-3 p-3">
      <div class="my-2">
        <p><span>Name:</span> {{ user.name }}</p>
      </div>
      <div class="my-2">
        <p><span>Email:</span> {{ user.email }}</p>
      </div>
      <div class="my-2">
        <p><span>Gender:</span> {{ user.gender }}</p>
      </div>
      <div class="my-2">
        <p><span>DoB:</span> {{ moment(user.dob).format('Do MMMM YYYY') }}</p>
      </div>
      <hr>
      <div class="flex justify-around py-2">
        <custom-button @click_event="deleteUser(user)" type="delete" name="Delete"></custom-button>
        <custom-button @click_event="openEditModal(user)" type="Edit" name="Edit"></custom-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MobileView",
  props: ['users'],
  methods: {
    deleteUser(user) {
      this.$emit("delete_user", user);
    },
    openEditModal(user) {
      this.$emit("open_edit_modal", user);
    }
  }
}
</script>

<style scoped>

</style>