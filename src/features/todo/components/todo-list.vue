<script setup>
import { ref, reactive, inject, computed } from 'vue';
import TodoListItem from './todo-list-item.vue';
import TodoListCreateForm from './todo-list-create-form.vue';
import TodoDetailModal from './todo-detail-modal.vue';
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
  withDiffDate: Boolean,
  withEditDate: Boolean,
  filter: Object,
  createFormParams: Object,
});

const supabase = inject('supabase');

const createForm = ref();
const todos = reactive({
  data: [],
});
const detailModal = reactive({
  visible: false,
  todo: null,
});
const percentage = computed(() => {
  const total = todos.data.length;
  const done = todos.data.filter((todo) => todo.done).length;

  return {
    total,
    done,
    number: Math.round((done / total) * 100),
  };
});

async function loadTodos() {
  const db = supabase.from('todos').select();

  if (props.filter.today) {
    db.eq('date', parseDate().format('YYYY-MM-DD'));
  } else if (props.filter.late) {
    db.lt('date', parseDate().format('YYYY-MM-DD')).is('done', false);
  } else if (props.filter.upcoming) {
    db.or(`date.gt.${parseDate().format('YYYY-MM-DD')},date.is.null`).is(
      'done',
      false,
    );
  }

  const res = await db.order('id', { ascending: true });

  todos.data = res.data;
}

function onCreated() {
  loadTodos();
}
function onUpdated() {
  loadTodos();
}
function onDeleted() {
  loadTodos();
}
function onDetail(todo) {
  detailModal.visible = true;
  detailModal.todo = todo;
}

defineExpose({
  createForm,
});

loadTodos();
</script>

<template>
  <div>
    <div class="space-y-4">
      <div v-if="withPercentage && todos.data.length" class="space-y-1">
        <div class="h-2 bg-gray-100">
          <div
            class="h-full bg-blue-600"
            :style="{ width: `${percentage.number}%` }"
          ></div>
        </div>
        <div class="flex items-center justify-between">
          <span class="block text-xs text-gray-500"
            >{{ percentage.done }}/{{ percentage.total }}</span
          >
          <span class="block text-xs text-gray-500"
            >{{ percentage.number }}%</span
          >
        </div>
      </div>
      <p v-if="withEmptyMessage && !todos.data.length" class="text-gray-600">
        All Done
      </p>
      <ul class="space-y-2">
        <todo-list-item
          v-for="(todo, index) in todos.data"
          :key="index"
          :with-diff-date="withDiffDate"
          :with-edit-date="withEditDate"
          v-model="todos.data[index]"
          @updated="onUpdated"
          @deleted="onDeleted"
          @detail="onDetail(todo)"
        />
      </ul>
      <todo-list-create-form
        v-if="withNewTodo"
        ref="createForm"
        v-bind="createFormParams"
        @created="onCreated"
      />
    </div>
    <todo-detail-modal :todo="detailModal.todo" v-model="detailModal.visible" />
  </div>
</template>
