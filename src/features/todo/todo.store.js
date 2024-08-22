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

  function getDataFromStorage() {
    const stored = localStorage.getItem('todos');

    try {
      if (stored) {
        const data = JSON.parse(stored);

        if (!Array.isArray(data)) {
          return [];
        } else {
          return data.filter((todo) => {
            if (typeof todo !== 'object') {
              return false;
            }

            const required = ['id', 'name', 'done', 'date'];
            const keys = Object.keys(todo);

            return required.every((key) => keys.includes(key));
          });
        }
      }
    } catch (err) {
      return [];
    }
  }

  function sync(actions) {
    const data = getDataFromStorage();

    actions.forEach((action) => {
      if (action.type === 'create') {
        data.push(action.data);
      } else if (action.type === 'update') {
        const index = data.findIndex((item) => item.id === action.id);

        if (index !== -1) {
          data[index] = action.data;
        }
      } else if (action.type === 'delete') {
        const index = data.findIndex((item) => item.id === action.id);

        if (index !== -1) {
          data.splice(index, 1);
        }
      }
    });

    localStorage.setItem('todos', JSON.stringify(data));
  }

  function create(todo) {
    todos.value.push({
      id: todos.value.length + 1,
      done: false,
      ...todo,
    });

    sync([{ type: 'create', data: todo }]);
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
