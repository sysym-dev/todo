<script setup>
import { onMounted, reactive, ref, computed } from 'vue';
import TodoListItem from 'src/features/todo/components/todo-list-item.vue';
import BaseInput from 'src/components/base/base-input.vue';
import BaseFormItem from 'src/components/base/base-form-item.vue';
import { useValidation } from 'src/cores/validation';
import { z } from 'zod';
import { useTodoStore } from 'src/features/todo/todo.store';
import { parseDate } from 'src/utils/date';

const props = defineProps({
  withNewTodo: {
    type: Boolean,
    default: true,
  },
  withPercentage: {
    type: Boolean,
    default: true,
  },
  withEmptyMessage: Boolean,
  filter: Object,
});

const todoStore = useTodoStore();
const { validate, error, resetError } = useValidation(
  z.object({
    name: z
      .string({ required_error: 'Todo name cannot be empty' })
      .min(1, { message: 'Todo name cannot be empty' }),
  }),
);

const newTodo = reactive({
  name: '',
});
const newTodoInput = ref();

const todos = computed(() => {
  if (props.filter.today) {
    return todoStore.todos.filter((todo) =>
      parseDate(todo.date).isBetween(
        parseDate().startOf('day'),
        parseDate().endOf('day'),
      ),
    );
  }

  return todoStore.todos.filter(
    (todo) =>
      parseDate(todo.date).isBefore(parseDate().startOf('day')) && !todo.done,
  );
});
const percentage = computed(() => {
  const total = todos.value.length;
  const done = todos.value.filter((todo) => todo.done).length;

  return {
    total,
    done,
    percentage: Math.round((done / total) * 100),
  };
});

async function onSubmitNewTodo() {
  const res = await validate(newTodo);

  if (!res.error) {
    todoStore.create({
      name: newTodo.name,
      date: new Date(),
    });

    newTodo.name = '';
  }
}
function onDeleteTodo(id) {
  todoStore.remove(id);
}
function onInputNewTodo() {
  resetError();
}

onMounted(() => {
  if (
    props.withNewTodo &&
    document.documentElement.scrollHeight <=
      document.documentElement.clientHeight
  ) {
    newTodoInput.value.input.focus();
  }
});

defineExpose({
  newTodoInput,
});
</script>

<template>
  <div v-if="withPercentage && todos.length" class="space-y-1">
    <div class="h-2 bg-gray-100">
      <div
        class="h-full bg-blue-600"
        :style="{ width: `${percentage.percentage}%` }"
      ></div>
    </div>
    <div class="flex items-center justify-between">
      <span class="block text-xs text-gray-500"
        >{{ percentage.done }}/{{ percentage.total }}</span
      >
      <span class="block text-xs text-gray-500"
        >{{ percentage.percentage }}%</span
      >
    </div>
  </div>
  <p v-if="withEmptyMessage && !todos.length" class="text-gray-600">All Done</p>
  <ul class="space-y-2">
    <todo-list-item
      v-for="todo in todos"
      :key="todo.id"
      v-model="
        todoStore.todos[
          todoStore.todos.findIndex((todoInStore) => todoInStore.id === todo.id)
        ]
      "
      @delete="onDeleteTodo(todo.id)"
    />
  </ul>
  <form v-if="withNewTodo" @submit.prevent="onSubmitNewTodo">
    <base-form-item :message="error.name">
      <base-input
        ref="newTodoInput"
        placeholder="Input New Todo"
        :state="error.name ? 'error' : 'default'"
        v-model="newTodo.name"
        @input="onInputNewTodo"
      />
    </base-form-item>
  </form>
</template>
