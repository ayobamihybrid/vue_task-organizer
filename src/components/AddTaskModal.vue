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

<!-- 
  const tasks = ref([]);

onMounted(() => {
  const savedTasks = localStorage.getItem('tasks');
  if (savedTasks) {
    tasks.value = JSON.parse(savedTasks);
  }
});

const searchQuery = ref('');
const modalOpen = ref(false);
const isEditing = ref(false);
const editIndex = ref(null);

const toggleModal = () => {
  modalOpen.value = !modalOpen.value;

  if (!modalOpen.value) {
    resetForm();
  }
};

const form = reactive({
  name: '',
  description: '',
});

const handleSubmit = async () => {
  const newTask = {
    name: form.name,
    description: form.description,
    completed: false,
  };

  if (isEditing.value) {
    tasks.value[editIndex.value] = newTask;
    isEditing.value = false;
  } else {
    tasks.value.push(newTask);
  }

  form.name = '';
  form.description = '';
  toggleModal();
};

const handleDelete = (index) => {
  tasks.value.splice(index, 1);
};

const handleEdit = (index) => {
  isEditing.value = true;
  editIndex.value = index;

  const task = tasks.value[index];
  form.name = task.name;
  form.description = task.description;
  toggleModal();
};

const resetForm = () => {
  form.name = '';
  form.description = '';
  isEditing.value = false;
  editIndex.value = null;
};

const filteredTasks = computed(() => {
  if (!searchQuery.value) return tasks.value;

  return tasks.value.filter(
    (task) =>
      task.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

watch(
  tasks,
  (newTasks) => {
    localStorage.setItem('tasks', JSON.stringify(newTasks));
  },
  { deep: true }
); -->
</template>
