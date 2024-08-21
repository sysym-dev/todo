import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';

export const useTodoStore = defineStore(
  'todo',
  () => {
    const todos = ref([]);

    const percentage = computed(() => {
      const total = todos.value.length;
      const done = todos.value.filter((todo) => todo.done).length;

      return {
        total,
        done,
        percentage: Math.round((done / total) * 100),
      };
    });

    function create(todo) {
      todos.value.push({
        id: todos.value.length + 1,
        done: false,
        ...todo,
      });

      todos.value.sort((a, b) => a.done - b.done);
    }

    function remove(id) {
      const index = todos.value.findIndex((todo) => todo.id === id);

      todos.value.splice(index, 1);
    }

    function sortTodos() {
      todos.value.sort((a, b) => a.done - b.done);
    }

    watch(
      todos,
      () => {
        sortTodos();
      },
      { deep: true },
    );

    return { todos, percentage, create, remove };
  },
  { persist: true },
);
