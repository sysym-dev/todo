import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { parseDate } from 'src/utils/date';

export const useTodoStore = defineStore('todo', () => {
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

  function sync() {
    localStorage.setItem('todos', JSON.stringify(todos.value));
  }

  function create(todo) {
    todos.value.push({
      id: todos.value.length + 1,
      done: false,
      ...todo,
    });

    sync();
  }

  function remove(id) {
    const index = todos.value.findIndex((todo) => todo.id === id);

    todos.value.splice(index, 1);

    sync();
  }

  function load(params) {
    const stored = localStorage.getItem('todos');

    try {
      if (stored) {
        const data = JSON.parse(stored);

        if (!Array.isArray(data)) {
          todos.value = [];
        } else {
          todos.value = data.filter((todo) => {
            if (typeof todo !== 'object') {
              return false;
            }

            const required = ['id', 'name', 'done', 'date'];
            const keys = Object.keys(todo);

            return required.every((key) => keys.includes(key));
          });

          if (params?.filter?.today) {
            todos.value = todos.value.filter((todo) => {
              return parseDate(todo.date).isBetween(
                parseDate().startOf('day'),
                parseDate().endOf('day'),
              );
            });
          }

          if (params?.filter?.late) {
            todos.value = todos.value.filter((todo) => {
              return (
                !todo.done &&
                parseDate(todo.date).isBefore(parseDate().startOf('day'))
              );
            });
          }
        }
      }
    } catch (err) {}
  }

  return { todos, percentage, load, create, remove, sync };
});
