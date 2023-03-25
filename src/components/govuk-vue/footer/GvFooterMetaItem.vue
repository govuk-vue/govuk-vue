<script setup lang="ts">
import hasSlot from '@/composables/useHasSlot'

defineProps({
  text: String,
  href: {
    type: String,
    required: true
  }
})
</script>

<template>
  <li class="govuk-footer__inline-list-item">
    <a class="govuk-footer__link" :href="href">
      <template v-if="hasSlot('default')">
        <slot />
      </template>
      <template v-else>
        {{ text }}
      </template>
    </a>
  </li>
</template>
