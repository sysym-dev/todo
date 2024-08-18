<script setup>
import { Edit as EditIcon, Trash as DeleteIcon } from '@vicons/tabler';
import { nextTick, ref } from 'vue';

const todo = defineModel();

const editing = ref(false);
const editInput = ref();

async function onEdit() {
  editing.value = true;

  await nextTick();

  editInput.value.focus();
}
function onEditFocusOut() {
  editing.value = false;
}
function onEditSubmit() {
  editing.value = false;
}
</script>

<template>
  <li class="group flex items-center gap-x-3">
    <input type="checkbox" :id="`todo-${todo.id}`" v-model="todo.done" />
    <form v-if="editing" class="w-full" @submit.prevent="onEditSubmit">
      <input
        ref="editInput"
        class="border-0 bg-transparent p-0 focus:ring-0 w-full"
        v-model="todo.name"
        @focusout="onEditFocusOut"
      />
    </form>
    <label
      v-else
      :for="`todo-${todo.id}`"
      :class="['text-gray-900', todo.done ? 'text-gray-400' : '']"
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
      <button>
        <delete-icon class="w-4 h-4 text-red-600" />
      </button>
    </div>
  </li>
</template>
