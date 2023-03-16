<script setup lang="ts">
import hasSlot from '@/composables/useHasSlot'

defineProps({
  text: String,
  id: String,
  classes: {
    type: String,
    default: ''
  },
  visuallyHiddenText: {
    type: String,
    default: 'Error'
  }
})
</script>

<template>
  <div :id="id" :class="`govuk-error-message ${classes}`">
    <span v-if="visuallyHiddenText" class="govuk-visually-hidden">{{ visuallyHiddenText }}:</span>
    <template v-if="hasSlot('default')">
      <slot />
    </template>
    <template v-else>
      {{ text }}
    </template>
  </div>
</template>

<style scoped lang="scss">
@import 'node_modules/govuk-frontend/govuk/components/error-message/error-message';
</style>
