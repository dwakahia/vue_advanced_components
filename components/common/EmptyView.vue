<template>
  <div class="flex justify-center py-3 my-3">
    <p class="text-red-600 text-2xl font-semibold">{{message}} &#128557;</p>
  </div>
</template>

<script>
export default {
  name: "EmptyView",
  props:['message']
}
</script>

<style scoped>

</style>