<script setup lang="ts">
import hasSlot from '@/composables/useHasSlot'

defineProps({
  summaryText: String,
  text: String,
  id: String,
  open: Boolean,
  classes: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <details :id="id" :class="`govuk-details ${classes}`" :open="open">
    <summary class="govuk-details__summary">
      <span class="govuk-details__summary-text">
        <template v-if="hasSlot('summary')">
          <slot name="summary" />
        </template>
        <template v-else>
          {{ summaryText }}
        </template>
      </span>
    </summary>
    <div class="govuk-details__text">
      <template v-if="hasSlot('default')">
        <slot />
      </template>
      <template v-else>
        {{ text }}
      </template>
    </div>
  </details>
</template>

<style scoped lang="scss">
@import 'node_modules/govuk-frontend/govuk/components/details/details';
</style>
