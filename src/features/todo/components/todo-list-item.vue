<script setup>
import 'v-calendar/style.css';
import { DatePicker } from 'v-calendar';
import { Edit as EditIcon, Trash as DeleteIcon } from '@vicons/tabler';
import { computed, inject, nextTick, reactive, ref } from 'vue';
import { useValidation } from 'src/cores/validation';
import { z } from 'zod';
import { parseDate } from 'src/utils/date';
import dayjs from 'dayjs';

defineProps({
  withDiffDate: Boolean,
  withEditDate: Boolean,
});
const emit = defineEmits(['updated', 'detail', 'deleted']);

const supabase = inject('supabase');
const emitter = inject('emitter');
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
const todoDate = ref(null);

const late = computed(() =>
  parseDate(todo.value.date).isBefore(parseDate().startOf('day')),
);
const diffLabel = computed(() => {
  const date = parseDate(todo.value.date);

  if (date.isSame(dayjs(), 'day')) {
    return 'Today';
  }

  return date.fromNow();
});

function growInputHeight() {
  editInput.value.style.height = 'auto';
  editInput.value.style.height = editInput.value.scrollHeight + 'px';
}

async function save() {
  const validation = await validate(editValue);

  if (validation.success) {
    todo.value.name = validation.data.name;

    const res = await supabase
      .from('todos')
      .update({
        name: todo.value.name,
      })
      .eq('id', todo.value.id);

    if (res.status !== 204) {
      emitter.emit('create-toast', {
        message: 'Failed to update todo',
      });
    } else {
      emit('updated');
    }
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
async function onDelete() {
  await supabase.from('todos').delete().eq('id', todo.value.id);

  emit('deleted');
}
async function onUpdateDone() {
  await supabase
    .from('todos')
    .update({
      done: todo.value.done,
    })
    .eq('id', todo.value.id);

  emit('updated');
}
async function onUpdateDate() {
  const date = todoDate.value
    ? todoDate.value
    : parseDate(todo.value.date).toDate();

  await supabase
    .from('todos')
    .update({
      date: parseDate(date).format('YYYY-MM-DD'),
    })
    .eq('id', todo.value.id);

  emit('updated');

  await nextTick();

  todoDate.value = date;
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

todoDate.value = todo.value.date;
</script>

<template>
  <li class="group flex items-center gap-x-3">
    <input
      v-if="!editing"
      type="checkbox"
      :id="`todo-${todo.id}`"
      v-model="todo.done"
      @change="onUpdateDone"
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
          :min-date="parseDate().toDate()"
          v-model="todoDate"
          @update:modelValue="onUpdateDate"
        >
          <p
            :class="[
              'text-xs text-nowrap cursor-pointer',
              late ? 'text-red-600' : 'text-gray-500',
            ]"
            @click="togglePopover"
          >
            {{ todo.date ? diffLabel : 'No Date' }}
          </p>
        </date-picker>
        <p
          v-else
          :class="[
            'text-xs text-nowrap',
            late ? 'text-red-600' : 'text-gray-500',
          ]"
        >
          {{ diffLabel }}
        </p>
      </template>
    </div>
  </li>
</template>
