<script setup>
import AppToast from 'src/components/app/app-toast.vue';
import { useRoute, useRouter } from 'vue-router';
import {
  Logout as LogoutIcon,
  Menu2 as NavToggleIcon,
  X as NavCloseIcon,
} from '@vicons/tabler';
import { inject, ref } from 'vue';

const route = useRoute();
const router = useRouter();
const supabase = inject('supabase');

const navMobileVisible = ref(false);
const toggleNavarMobileEl = ref();

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
  {
    route: 'done',
    name: 'Done',
  },
];

function onCloseNavMobile(e) {
  if (!toggleNavarMobileEl.value.contains(e.target)) {
    navMobileVisible.value = false;
  }
}
async function onLogout() {
  await supabase.auth.signOut();

  router.push({ name: 'auth.login' });
}

router.beforeEach(() => {
  navMobileVisible.value = false;
});
</script>

<template>
  <app-toast position="bottom-center" />
  <nav class="border-b h-14 flex items-center relative text-gray-900">
    <div
      class="max-w-screen-sm w-full mx-auto px-4 md:px-0 flex items-center justify-between"
    >
      <button
        ref="toggleNavarMobileEl"
        class="sm:hidden"
        @click="navMobileVisible = !navMobileVisible"
      >
        <component
          :is="navMobileVisible ? NavCloseIcon : NavToggleIcon"
          class="w-4 h-4"
        />
      </button>
      <ul
        :class="[
          navMobileVisible ? 'flex' : 'hidden',
          'absolute top-14 left-0 z-10 w-full bg-white flex flex-col gap-2 p-4 border-b sm:relative sm:top-0 sm:left-0 sm:w-auto sm:flex sm:flex-row sm:items-center sm:gap-4 sm:p-0 sm:border-0',
        ]"
        v-click-outside="onCloseNavMobile"
      >
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
        <button title="Logout" @click="onLogout">
          <logout-icon class="w-4 h-4" />
        </button>
      </div>
    </div>
  </nav>
  <main
    class="bg-white max-w-screen-sm w-full mx-auto my-4 space-y-4 px-4 sm:my-10 md:px-0 text-gray-900"
  >
    <slot />
  </main>
</template>
