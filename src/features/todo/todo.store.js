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

    if (!stored) {
      return [];
    }

    try {
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
    } catch (err) {
      return [];
    }
  }

  function getLatestId() {
    const data = getDataFromStorage();

    if (!data.length) {
      return 1;
    }

    return data.sort((a, b) => b.id - a.id)[0].id + 1;
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
    const data = {
      id: getLatestId(),
      done: false,
      ...todo,
    };

    todos.value.push(data);

    sync([{ type: 'create', data }]);
  }

  function remove(id) {
    const index = todos.value.findIndex((todo) => todo.id === id);

    todos.value.splice(index, 1);

    sync([{ type: 'delete', id }]);
  }

  function update(id, data) {
    sync([{ type: 'update', id, data }]);
  }

  function load(params) {
    todos.value = getDataFromStorage();

    if (params?.filter?.today) {
      todos.value = todos.value.filter((todo) => {
        return (
          parseDate(todo.date).isSameOrAfter(parseDate().startOf('day')) &&
          parseDate(todo.date).isSameOrBefore(parseDate().endOf('day'))
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

    if (params?.filter?.upcoming) {
      todos.value = todos.value.filter((todo) => {
        return (
          !todo.done && parseDate(todo.date).isAfter(parseDate().endOf('day'))
        );
      });
    }
  }

  return { todos, percentage, load, create, remove, update };
});
