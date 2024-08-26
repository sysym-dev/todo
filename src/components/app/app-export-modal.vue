<script setup>
import BaseModal from 'src/components/base/base-modal.vue';
import { Download as DownloadIcon } from '@vicons/tabler';
</script>
<template>
  <base-modal>
    <div class="space-y-2">
      <p class="font-bold text-lg">Export</p>
      <ul class="space-y-1">
        <li>
          <a
            href=""
            class="text-blue-600 text-sm inline-flex items-center gap-x-2"
          >
            <download-icon class="w-4 h-4" />
            <span>Download .json</span>
          </a>
        </li>
        <li>
          <a
            href=""
            class="text-blue-600 text-sm inline-flex items-center gap-x-2"
          >
            <download-icon class="w-4 h-4" />
            <span>Download .csv</span>
          </a>
        </li>
      </ul>
    </div>
  </base-modal>
</template>
