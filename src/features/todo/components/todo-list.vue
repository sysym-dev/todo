<script setup>
import { ref, reactive } from 'vue';
import TodoListItem from './todo-list-item.vue';
import TodoListCreateForm from './todo-list-create-form.vue';
import TodoDetailModal from './todo-detail-modal.vue';
import { useTodoStore } from 'src/features/todo/todo.store';

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
  withDiffDate: Boolean,
  withEditDate: Boolean,
  filter: Object,
  createFormParams: Object,
});

const todoStore = useTodoStore();

const createForm = ref();
const detailModal = reactive({
  visible: false,
  todo: null,
});

function onUpdated() {
  todoStore.load({ filter: props.filter });
}
function onDetail(todo) {
  detailModal.visible = true;
  detailModal.todo = todo;
}

defineExpose({
  createForm,
});

todoStore.load({ filter: props.filter });
</script>

<template>
  <div>
    <div class="space-y-4">
      <div v-if="withPercentage && todoStore.todos.length" class="space-y-1">
        <div class="h-2 bg-gray-100">
          <div
            class="h-full bg-blue-600"
            :style="{ width: `${todoStore.percentage.percentage}%` }"
          ></div>
        </div>
        <div class="flex items-center justify-between">
          <span class="block text-xs text-gray-500"
            >{{ todoStore.percentage.done }}/{{
              todoStore.percentage.total
            }}</span
          >
          <span class="block text-xs text-gray-500"
            >{{ todoStore.percentage.percentage }}%</span
          >
        </div>
      </div>
      <p
        v-if="withEmptyMessage && !todoStore.todos.length"
        class="text-gray-600"
      >
        All Done
      </p>
      <ul class="space-y-2">
        <todo-list-item
          v-for="(todo, index) in todoStore.todos"
          :key="index"
          :with-diff-date="withDiffDate"
          :with-edit-date="withEditDate"
          v-model="todoStore.todos[index]"
          @updated="onUpdated"
          @detail="onDetail(todo)"
        />
      </ul>
      <todo-list-create-form
        v-if="withNewTodo"
        ref="createForm"
        v-bind="createFormParams"
      />
    </div>
    <todo-detail-modal :todo="detailModal.todo" v-model="detailModal.visible" />
  </div>
</template>
