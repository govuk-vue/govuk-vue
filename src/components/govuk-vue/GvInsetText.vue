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
  <div :id="id" :class="`govuk-inset-text ${classes}`">
    <template v-if="hasSlot('default')">
      <slot />
    </template>
    <template v-else>
      {{ text }}
    </template>
  </div>
</template>

<style scoped lang="scss">
@import 'node_modules/govuk-frontend/govuk/components/inset-text/inset-text';
</style>
