<script setup>

import { ref, reactive, onMounted, computed, watch } from 'vue';

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
);
</script>

<template>
  <div>
    <p class="text-[#fff] text-[40px] text-center">Task organizer</p>

    <div
      class="sm:w-[300px] md:w-[500px] max-w-[600px] min-h-[300px] p-2 bg-white shadow-xl rounded-[10px]"
    >
      <div class="my-2">
        <input
          type="text"
          placeholder="Search task..."
          v-model="searchQuery"
          class="border rounded w-full py-2 px-3 mb-2"
        />
      </div>

      <div v-if="filteredTasks.length === 0" class="my-2 text-center">
        <p>No task found!</p>
      </div>

      <div
        class="my-2 flex justify-between items-center"
        v-for="(task, index) in filteredTasks"
        :key="index"
      >
        <div class="flex items-center">
          <input type="checkbox" v-model="task.completed" class="mr-2" />

          <div>
            <div class="flex items-center gap-1">
              <p
                :class="{
                  'text-[22px] font-[700] line-through': task.completed,
                  'text-[22px] font-[700]': !task.completed,
                }"
              >
                {{ task.name }}
              </p>

              <span v-if="task.completed" class="inline"
                ><p class="text-green-400">completed</p></span
              >
            </div>

            <p class="text-[14px]">{{ task.description }}</p>
          </div>
        </div>

        <div class="flex gap-5">
          <i
            v-if="!task.completed"
            class="pi pi-pencil cursor-pointer"
            @click="handleEdit(index)"
          ></i>
          <i
            class="pi pi-times text-red-600 cursor-pointer"
            @click="handleDelete(index)"
          ></i>
        </div>
      </div>

      <div class="mt-9 flex justify-center items-center">
        <button
          @click="toggleModal"
          class="w-[90%] p-2 bg-violet-200 rounded-[10px]"
        >
          Add new task
        </button>
      </div>

      <div
        v-if="modalOpen"
        class="absolute top-0 left-0 right-0 bottom-0 bg-black/25 backdrop-blur-sm flex justify-center items-center z-[99999] shadow-lg"
      >
        <div
          class="sm:w-[200px] md:w-[400px] max-w-[500px] min-h-[200px] p-5 bg-white shadow-xl rounded-[10px]"
        >
          <div class="flex justify-between items-center">
            <p class="text-[26px]">New task</p>

            <p @click="toggleModal" class="text-[22px] cursor-pointer">X</p>
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
      </div>
    </div>
  </div>
</template>
