<script setup>
import {
  Apps as DashboardIcon,
  CreditCard as CardIcon,
  Calculator as TransactionIcon,
  ReportAnalytics as ReportIcon,
  ChevronUp as ShowIcon,
  ChevronDown as HideIcon,
  Menu2 as ShowSidebarIcon,
  X as CollapseSidebarIcon,
  User as UserIcon,
} from '@vicons/tabler';
import { useRoute, useRouter, RouterLink } from 'vue-router';
import BaseButton from 'src/components/base/base-button.vue';
import BaseDropdown from 'src/components/base/base-dropdown.vue';
import { useAuthStore } from 'src/features/auth/auth.store';
import AppLogoutConfirm from 'src/components/app/app-logout-confirm.vue';
import { ref, h } from 'vue';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

const logoutConfirmVisible = ref(false);
const mobileSidebarVisible = ref(false);

const mobileSidebarToggleButton = ref();

const menus = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    activeKey: 'home',
    icon: DashboardIcon,
    to: {
      name: 'home',
    },
  },
  {
    id: 'card',
    name: 'Cards',
    activeKey: 'card.index',
    icon: CardIcon,
    to: {
      name: 'card.index',
    },
  },
  {
    id: 'transaction',
    name: 'Transactions',
    activeKey: 'transaction.index',
    icon: TransactionIcon,
    to: {
      name: 'transaction.index',
    },
  },
  {
    id: 'report',
    name: 'Reports',
    activeKey: 'report.index',
    icon: ReportIcon,
    to: {
      name: 'report.index',
    },
  },
];
const profileDropdownContent = h('div', { class: 'flex flex-col' }, [
  h(
    RouterLink,
    {
      to: { name: 'profile' },
      class: 'py-2 px-3 hover:bg-gray-50 text-gray-900',
    },
    () => 'Profile',
  ),
  h(
    'a',
    {
      href: '#',
      class: 'py-2 px-3 hover:bg-gray-50 text-gray-900 text-nowrap',
      onClick: onSignOut,
    },
    'Sign Out',
  ),
]);

function onSignOut() {
  logoutConfirmVisible.value = true;
}
function onToggleSidebar() {
  mobileSidebarVisible.value = !mobileSidebarVisible.value;
}
function onClickOutside(e) {
  if (!mobileSidebarToggleButton.value.el.contains(e.target)) {
    mobileSidebarVisible.value = false;
  }
}

router.afterEach(() => {
  mobileSidebarVisible.value = false;
});
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <aside
      :class="[
        'w-[250px] bg-white h-screen fixed top-0 -left-full p-4 flex flex-col justify-between lg:left-0 z-10 transition-all shadow border-r border-gray-200',
        mobileSidebarVisible ? 'left-0' : '',
      ]"
      v-click-outside="onClickOutside"
    >
      <div class="space-y-4">
        <div class="px-3 flex items-center justify-between">
          <h2 class="font-bold text-lg">Ixpense</h2>
          <div class="lg:hidden">
            <base-button
              size="square"
              color="transparent"
              @click="onToggleSidebar"
            >
              <collapse-sidebar-icon class="w-4 h-4" />
            </base-button>
          </div>
        </div>
        <ul class="space-y-1">
          <li v-for="menu in menus" :key="menu.id">
            <router-link
              :to="menu.to"
              :class="[
                'flex items-center gap-x-2 rounded-lg px-3 py-2',
                menu.activeKey === route.name
                  ? 'bg-blue-600 text-white font-bold'
                  : 'hover:bg-blue-50 hover:text-blue-600 hover:font-semibold',
              ]"
            >
              <component :is="menu.icon" class="w-4 h-4" />
              {{ menu.name }}
            </router-link>
          </li>
        </ul>
      </div>
      <base-dropdown fullwidth position="top">
        <template #toggle="{ toggle, visible }">
          <a
            href="#"
            class="flex items-center justify-between"
            @click.prevent="toggle"
          >
            <span class="text-gray-900">{{ authStore.me.fullName }}</span>
            <base-button size="square" color="transparent">
              <component :is="visible ? HideIcon : ShowIcon" class="w-4 h-4" />
            </base-button>
          </a>
        </template>

        <profile-dropdown-content />
      </base-dropdown>
    </aside>
    <div class="ml-0 lg:ml-[250px]">
      <nav
        class="lg:hidden bg-white px-4 h-14 flex items-center justify-between shadow border-b border-gray-200"
      >
        <base-button
          ref="mobileSidebarToggleButton"
          size="square-lg"
          color="transparent"
          @click="onToggleSidebar"
        >
          <show-sidebar-icon class="w-4 h-4" />
        </base-button>
        <base-dropdown>
          <template #toggle="{ toggle }">
            <base-button size="square-lg" color="transparent" @click="toggle">
              <user-icon class="w-4 h-4" />
            </base-button>
          </template>

          <profile-dropdown-content />
        </base-dropdown>
      </nav>
      <div class="p-4 lg:p-8 max-w-5xl mx-auto w-full space-y-4">
        <slot />
      </div>
    </div>
  </div>
  <app-logout-confirm v-model="logoutConfirmVisible" />
</template>
