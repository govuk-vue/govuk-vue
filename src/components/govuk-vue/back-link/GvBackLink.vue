<script setup lang="ts">
import hasSlot from '@/composables/useHasSlot'

defineProps({
  text: {
    type: String,
    default: 'Back'
  },
  href: {
    type: String,
    default: '#'
  },
  classes: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <a :href="href" :class="`govuk-back-link ${classes}`">
    <template v-if="hasSlot('default')">
      <slot />
    </template>
    <template v-else>
      {{ text }}
    </template>
  </a>
</template>
