<script setup lang="ts">
import hasSlot from '@/composables/useHasSlot'

defineProps({
  /**
   * Text to use within the tag component. If content is provided in the default slot, this prop will be ignored.
   */
  text: String,
  /**
   * The colour of the tag.
   */
  colour: {
    type: String,
    validator(value: string) {
      return [
        'grey',
        'green',
        'turquoise',
        'blue',
        'purple',
        'pink',
        'red',
        'orange',
        'yellow'
      ].includes(value)
    }
  }
})
</script>

<template>
  <strong class="govuk-tag" :class="`${colour ? `govuk-tag--${colour}` : ''}`">
    <!-- @slot The content of the tag. If content is provided in this slot, the `text` prop will be ignored. -->
    <slot>
      {{ text }}
    </slot>
  </strong>
</template>
