import { ref, reactive, computed, watch, onMounted } from 'vue';

export function useTasks() {
  const tasks = ref([]);

  const modalOpen = ref(false);

  onMounted(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      tasks.value = JSON.parse(savedTasks);
    }
  });

  const searchQuery = ref('');
  const isEditing = ref(false);
  const editIndex = ref(null);

  const form = reactive({
    name: '',
    description: '',
  });

  const handleSubmit = () => {
    if (form.name.trim().length < 1) return;
    
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

    resetForm();
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

  const toggleModal = () => {
    modalOpen.value = !modalOpen.value;

    if (!modalOpen.value) {
      form.name = '';
      form.description = '';
      isEditing.value = false;
    }
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

  return {
    tasks,
    searchQuery,
    form,
    isEditing,
    handleSubmit,
    handleDelete,
    handleEdit,
    toggleModal,
    filteredTasks,
    modalOpen,
  };
}
