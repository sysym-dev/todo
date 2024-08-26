<script setup>
import 'v-calendar/style.css';
import { DatePicker } from 'v-calendar';
import { Edit as EditIcon, Trash as DeleteIcon } from '@vicons/tabler';
import { computed, nextTick, reactive, ref } from 'vue';
import { useValidation } from 'src/cores/validation';
import { z } from 'zod';
import { parseDate } from 'src/utils/date';
import { useTodoStore } from 'src/features/todo/todo.store';

defineProps({
  withDiffDate: Boolean,
  withEditDate: Boolean,
});
const emit = defineEmits(['updated', 'detail']);

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

const late = computed(() =>
  parseDate(todo.value.date).isBefore(parseDate().startOf('day')),
);

function growInputHeight() {
  editInput.value.style.height = 'auto';
  editInput.value.style.height = editInput.value.scrollHeight + 'px';
}

async function save() {
  const res = await validate(editValue);

  if (res.success) {
    todo.value.name = res.data.name;

    todoStore.update(todo.value.id, todo.value);

    emit('updated');
  }

  editing.value = false;
}

async function onEdit() {
  editValue.name = todo.value.name;
  editing.value = true;

  await nextTick();

  growInputHeight();
  editInput.value.focus();
}
async function onEditFocusOut() {
  await save();
}
async function onEditSubmit() {
  await save();
}
function onDelete() {
  todoStore.remove(todo.value.id);
}
function onUpdate() {
  todoStore.update(todo.value.id, todo.value);

  emit('updated');
}
function onInputName() {
  growInputHeight();
}
function onKeydownName(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();

    save();
  } else if (e.key === 'Escape') {
    editing.value = false;
  }
}
function onDetail() {
  emit('detail');
}
</script>

<template>
  <li class="group flex items-center gap-x-3">
    <input
      v-if="!editing"
      type="checkbox"
      :id="`todo-${todo.id}`"
      v-model="todo.done"
      @change="onUpdate"
    />
    <form v-if="editing" class="w-full flex" @submit.prevent="onEditSubmit">
      <textarea
        ref="editInput"
        rows="1"
        class="resize-none border-0 bg-transparent p-0 focus:ring-0 w-full"
        v-model="editValue.name"
        v-click-outside="onEditFocusOut"
        @keydown="onKeydownName"
        @input="onInputName"
      ></textarea>
    </form>
    <div v-else class="flex flex-grow justify-between items-center gap-x-3">
      <div class="flex items-center gap-x-3 flex-grow">
        <p
          :class="[
            'line-clamp-1	break-all cursor-default',
            todo.done ? 'text-gray-400' : 'text-gray-900',
          ]"
          @click="onDetail"
        >
          {{ todo.name }}
        </p>
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
      <template v-if="withDiffDate">
        <date-picker
          v-if="withEditDate"
          v-slot="{ togglePopover }"
          :min-date="parseDate().add(1, 'day').toDate()"
          v-model="todo.date"
          @update:modelValue="onUpdate"
        >
          <p
            :class="[
              'text-xs text-nowrap cursor-pointer',
              late ? 'text-red-600' : 'text-gray-500',
            ]"
            @click="togglePopover"
          >
            {{ parseDate(todo.date).fromNow() }}
          </p>
        </date-picker>
        <p
          v-else
          :class="[
            'text-xs text-nowrap',
            late ? 'text-red-600' : 'text-gray-500',
          ]"
        >
          {{ parseDate(todo.date).fromNow() }}
        </p>
      </template>
    </div>
  </li>
</template>
