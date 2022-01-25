<template>
  <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg hidden md:block mb-4">
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
      <tr>
        <th scope="col"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Name
        </th>
        <th scope="col"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Email Address
        </th>
        <th scope="col"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Gender
        </th>
        <th scope="col"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Date Of Birth
        </th>
        <th scope="col"
            class="relative px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
          Actions
        </th>
      </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
      <tr v-for="(user,index) in users" :key="index" class="user-list">
        <td class="px-6 py-4 whitespace-nowrap">
          <div class="flex items-center">
            <div class="text-sm font-medium text-gray-900">
              {{ user.name }}
            </div>
          </div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <div class="text-sm text-gray-900">{{ user.email }}</div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
                          <span
                              class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {{ user.gender }}
                          </span>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
<!--          {{user.dob ?  moment(user.dob).format('Do MMMM YYYY')  : ''}}-->
          {{user.dob}}
        </td>
        <td class="px-6 py-4 text-center">
          <custom-button @click_event="deleteUser(user)" type="delete" name="Delete"></custom-button>
          <custom-button @click_event="openEditModal(user)" type="Edit" name="Edit"></custom-button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "LargeView",
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