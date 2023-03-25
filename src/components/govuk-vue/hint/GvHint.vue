<script setup lang="ts">
import hasSlot from '@/composables/useHasSlot'

defineProps({
  text: String,
  id: String,
  classes: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div :id="id" :class="`govuk-hint ${classes}`">
    <template v-if="hasSlot('default')">
      <slot />
    </template>
    <template v-else>
      {{ text }}
    </template>
  </div>
</template>
