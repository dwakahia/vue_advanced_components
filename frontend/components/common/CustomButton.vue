<template>
  <button class="p-3 rounded-lg text-white w-full md:w-auto m-2"
          :class="type === 'delete' ? 'bg-red-600' : 'bg-blue-600'" @click="clickEvent">{{ name }}
  </button>
</template>

<script>
export default {
  name: "CustomButton",
  props: ['name', 'type'],
  methods: {
    clickEvent() {
      this.$emit('click_event');
    }
  }
}
</script>

<style scoped>

</style>