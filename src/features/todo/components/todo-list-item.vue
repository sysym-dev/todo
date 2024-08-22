<script setup>
import { Edit as EditIcon, Trash as DeleteIcon } from '@vicons/tabler';
import { nextTick, reactive, ref } from 'vue';
import { useValidation } from 'src/cores/validation';
import { z } from 'zod';
import { parseDate } from 'src/utils/date';
import { useTodoStore } from 'src/features/todo/todo.store';

defineProps({
  withDiffDate: Boolean,
});
const emit = defineEmits(['delete']);

const todoStore = useTodoStore();
const { validate } = useValidation(
  z.object({
    name: z
      .string({ required_error: 'Todo name cannot be empty' })
      .min(1, { message: 'Todo name cannot be empty' }),
  }),
);

const todo = defineModel();

const editing = ref(false);
const editValue = reactive({
  name: '',
});
const editInput = ref();

async function save() {
  const res = await validate(editValue);

  if (res.success) {
    todo.value.name = res.data.name;

    todoStore.sync();
  }

  editing.value = false;
}

async function onEdit() {
  editValue.name = todo.value.name;
  editing.value = true;

  await nextTick();

  editInput.value.focus();
}
async function onEditFocusOut() {
  await save();
}
async function onEditSubmit() {
  await save();
}
function onDelete() {
  emit('delete');
}
function onChangeDone() {
  todoStore.sync();
}
</script>

<template>
  <li class="group flex items-center gap-x-3">
    <input
      type="checkbox"
      :id="`todo-${todo.id}`"
      v-model="todo.done"
      @change="onChangeDone"
    />
    <form v-if="editing" class="w-full" @submit.prevent="onEditSubmit">
      <input
        ref="editInput"
        class="border-0 bg-transparent p-0 focus:ring-0 w-full"
        v-model="editValue.name"
        v-click-outside="onEditFocusOut"
      />
    </form>
    <div v-else class="flex flex-grow justify-between items-center gap-x-3">
      <div class="flex items-center gap-x-3 flex-grow">
        <label
          :for="`todo-${todo.id}`"
          :class="[todo.done ? 'text-gray-400' : 'text-gray-900']"
          >{{ todo.name }}</label
        >
        <div
          :class="[
            'hidden items-center gap-x-1',
            !editing ? 'group-hover:flex' : '',
          ]"
        >
          <button @click="onEdit">
            <edit-icon class="w-4 h-4 text-blue-600" />
          </button>
          <button @click="onDelete">
            <delete-icon class="w-4 h-4 text-red-600" />
          </button>
        </div>
      </div>
      <p class="text-xs text-red-600" v-if="withDiffDate">
        {{ parseDate(todo.date).fromNow() }}
      </p>
    </div>
  </li>
</template>
