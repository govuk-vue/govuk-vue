<script setup lang="ts">
import hasSlot from '@/composables/useHasSlot'

defineProps({
  title: String,
  headingLevel: {
    type: Number,
    default: 1,
    validator(value: number) {
      return value >= 1 && value <= 6
    }
  },
  text: String
})
</script>

<template>
  <div class="govuk-panel govuk-panel--confirmation">
    <component :is="`h${headingLevel}`" class="govuk-panel__title">
      <slot name="title">
        {{ title }}
      </slot>
    </component>
    <div class="govuk-panel__body">
      <slot>
        {{ text }}
      </slot>
    </div>
  </div>
</template>
