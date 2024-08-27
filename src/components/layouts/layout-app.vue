<script setup>
import AppToast from 'src/components/app/app-toast.vue';
import AppExportModal from 'src/components/app/app-export-modal.vue';
import { useRoute } from 'vue-router';
import {
  BrandGithub as GithubIcon,
  Download as ExportIcon,
} from '@vicons/tabler';
import { ref } from 'vue';

const route = useRoute();

const exportModalVisible = ref(false);

const menus = [
  {
    route: 'home',
    name: 'Today',
  },
  {
    route: 'late',
    name: 'Late',
  },
  {
    route: 'upcoming',
    name: 'Upcoming',
  },
];
</script>

<template>
  <app-toast />
  <app-export-modal v-model="exportModalVisible" />
  <nav class="border-b h-14 flex items-center">
    <div
      class="max-w-sm w-full mx-auto px-4 md:px-0 flex items-center justify-between"
    >
      <ul class="flex items-center gap-x-4">
        <li v-for="menu in menus" :key="menu.route">
          <router-link
            :to="{ name: menu.route }"
            :class="[
              route.name === menu.route
                ? 'text-blue-600 font-bold'
                : 'text-gray-900',
            ]"
            >{{ menu.name }}</router-link
          >
        </li>
      </ul>
      <div class="flex items-center gap-x-2">
        <button title="Export" @click="exportModalVisible = true">
          <export-icon class="w-4 h-4" />
        </button>
        <a
          href="https://github.com/sysym-dev/todo"
          class="text-gray-900"
          target="_blank"
          title="Github Reposiory"
        >
          <github-icon class="w-4 h-4" />
        </a>
      </div>
    </div>
  </nav>
  <main
    class="bg-white max-w-sm w-full mx-auto my-4 space-y-4 px-4 sm:my-10 md:px-0"
  >
    <slot />
  </main>
</template>
