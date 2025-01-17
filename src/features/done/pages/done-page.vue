<script setup>
import BaseHeading from 'src/components/base/base-heading.vue';
import BaseAlert from 'src/components/base/base-alert.vue';
import { parseDate } from 'src/utils/date';
import { inject, reactive } from 'vue';

const supabase = inject('supabase');

const todos = reactive({
  error: null,
  data: [],
});

async function loadTodos() {
  const res = await supabase.from('todos').select().is('done', true);

  if (res.error) {
    todos.error = 'Failed to load todos';
  } else {
    todos.data = res.data;
  }
}

loadTodos();
</script>

<template>
  <base-heading title="Done Todo" size="text-2xl" />
  <base-alert v-if="todos.error" :message="todos.error" />
  <template v-else>
    <p v-if="!todos.data.length" class="text-gray-600">No done tasks found</p>
    <ul v-else class="space-y-2">
      <li
        v-for="todo in todos.data"
        :key="todo.id"
        class="flex-col flex gap-1 sm:flex-row sm:gap-2"
      >
        <p class="text-gray-400 shrink-0 w-24">
          {{
            todo.date ? parseDate(todo.date).format('YYYY/MM/DD') : 'No Date'
          }}
        </p>
        <p class="text-gray-900">{{ todo.name }}</p>
      </li>
    </ul>
  </template>
</template>
