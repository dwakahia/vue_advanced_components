<template>
  <div class="px-4 py-2 bg-gray-200 bg-indigo-600 lg:w-64 hidden lg:block">
    <div class="my-6 mb-6 text-center">
      <h1 class="text-2xl font-bold text-white">Users List</h1>
    </div>
    <ul>
      <li class="mb-2 rounded hover:shadow hover:bg-gray-800">
        <router-link :to="{name: 'home'}" class="inline-block w-full h-full px-3 py-2 font-bold text-white">
          <i class="fa fa-home px-2"></i>
          Home
        </router-link>
      </li>
      <li class="mb-2 rounded hover:shadow hover:bg-gray-800">
        <router-link :to="{name: 'users'}" class="inline-block w-full h-full px-3 py-2 font-bold text-white">
          <i class="fa fa-users px-2"></i>
          Users
        </router-link>
      </li>
      <li class="mb-2 rounded hover:shadow hover:bg-gray-800">
        <router-link :to="{name: 'movies'}" class="inline-block w-full h-full px-3 py-2 font-bold text-white">
          <i class="fa fa-video px-2"></i>
            Movies
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "SideBar"
}
</script>

<style scoped>

</style>