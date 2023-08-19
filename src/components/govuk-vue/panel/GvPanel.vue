<script setup lang="ts">
import hasSlot from '@/composables/useHasSlot'

defineProps({
  /**
   * Text to use within the panel title. If content is provided in the `title` slot, this prop will be ignored.
   */
  title: String,
  /**
   * Heading level, from `1` to `6`.
   */
  headingLevel: {
    type: Number,
    default: 1,
    validator(value: number) {
      return value >= 1 && value <= 6
    }
  },
  /**
   * Text to use within the panel content. If content is provided in the default slot, this prop will be ignored.
   */
  text: String
})
</script>

<template>
  <div class="govuk-panel govuk-panel--confirmation">
    <component :is="`h${headingLevel}`" class="govuk-panel__title">
      <!-- @slot The content of the panel title. If content is provided in this slot, the `title` prop will be ignored. -->
      <slot name="title">
        {{ title }}
      </slot>
    </component>
    <div class="govuk-panel__body">
      <!-- @slot The content of the panel. If content is provided in this slot, the `text` prop will be ignored. -->
      <slot>
        {{ text }}
      </slot>
    </div>
  </div>
</template>
