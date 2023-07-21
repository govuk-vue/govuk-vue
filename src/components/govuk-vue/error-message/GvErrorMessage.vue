<script setup lang="ts">
defineProps({
  /**
   * Text to use within the error message. If content is provided in the default slot, this prop will be ignored.
   */
  text: String,
  /**
   * ID attribute to add to the error message `<p>` tag.
   */
  id: String,
  /**
   * A visually hidden prefix used before the error message.
   */
  visuallyHiddenText: {
    type: String,
    default: 'Error'
  }
})
</script>

<template>
  <p :id="id" class="govuk-error-message">
    <span v-if="visuallyHiddenText" class="govuk-visually-hidden">{{ visuallyHiddenText }}:</span>
    <!-- @slot The content of the error message. If content is provided in this slot, the `text` prop will be ignored. -->
    <slot>
      {{ text }}
    </slot>
  </p>
</template>
