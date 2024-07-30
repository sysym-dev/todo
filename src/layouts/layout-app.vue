<script setup>
import {
  Apps as DashboardIcon,
  CreditCard as CardIcon,
  Calculator as TransactionIcon,
  ReportAnalytics as ReportIcon,
  ChevronUp as ShowIcon,
  ChevronDown as HideIcon,
} from '@vicons/tabler';
import { useRoute } from 'vue-router';
import BaseButton from 'src/components/base/base-button.vue';
import BaseDropdown from 'src/components/base/base-dropdown.vue';
import { useAuthStore } from 'src/features/auth/auth.store';

const route = useRoute();
const authStore = useAuthStore();

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
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <aside
      class="w-[250px] bg-white h-screen fixed top-0 left-0 p-4 flex flex-col justify-between"
    >
      <div class="space-y-4">
        <div class="px-3">
          <h2 class="font-bold text-lg">Ixpense</h2>
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
          <a href="#" class="flex items-center justify-between" @click="toggle">
            <span class="text-gray-900">{{ authStore.me.fullName }}</span>
            <base-button size="square" color="transparent">
              <component :is="visible ? HideIcon : ShowIcon" class="w-4 h-4" />
            </base-button>
          </a>
        </template>

        <div class="flex flex-col">
          <router-link
            :to="{ name: 'profile' }"
            class="py-2 px-3 hover:bg-gray-50 text-gray-900"
            >Profile</router-link
          >
          <a href="" class="py-2 px-3 hover:bg-gray-50 text-gray-900"
            >Sign Out</a
          >
        </div>
      </base-dropdown>
    </aside>
    <div class="p-8 ml-[250px]">
      <div class="max-w-5xl mx-auto w-full space-y-4">
        <slot />
      </div>
    </div>
  </div>
</template>
