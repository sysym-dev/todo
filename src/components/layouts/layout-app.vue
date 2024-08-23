<script setup>
import AppToast from 'src/components/app/app-toast.vue';
import { useRoute } from 'vue-router';

const route = useRoute();

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
      <a href="" class="text-gray-900">Sign In</a>
    </div>
  </nav>
  <main
    class="bg-white max-w-sm w-full mx-auto my-4 space-y-4 px-4 sm:my-10 md:px-0"
  >
    <slot />
  </main>
</template>
