<script setup>
// import { defineProps, ref } from 'vue';

// const props = defineProps({
//   modalOpen: Object,
//   toggleModal: Function,
// });
</script>

<template>
  <!-- <div
    v-if="modalOpen.value"
    class="absolute top-0 left-0 right-0 bottom-0 bg-black/25 backdrop-blur-sm flex justify-center items-center z-[99999] shadow-lg"
  >
    <div
      class="sm:w-[200px] md:w-[400px] max-w-[500px] min-h-[200px] p-5 bg-white shadow-xl rounded-[10px]"
    >
      <div class="flex justify-between items-center">
        <p class="text-[26px]">New task</p>

        <p @click="props.toggleModal" class="text-[22px] cursor-pointer">X</p>
      </div>

      <form @submit.prevent="handleSubmit">
        <input
          type="text"
          placeholder="Task name..."
          v-model="form.name"
          id="name"
          name="name"
          required
          class="mt-9 border rounded w-full py-2 px-3 mb-2"
        />

        <input
          type="text"
          placeholder="Task description..."
          v-model="form.description"
          id="name"
          name="name"
          class="border rounded w-full py-2 px-3 mb-2"
        />

        <button
          type="submit"
          class="mt-9 w-full p-2 bg-violet-200 rounded-[10px]"
        >
          <p v-if="isEditing">Update task</p>
          <p v-else>Add task</p>
        </button>
      </form>
    </div>
  </div> -->
</template>
