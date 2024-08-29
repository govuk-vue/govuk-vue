<script setup lang="ts">
defineProps({
  /**
   * Text to use within the warning text component. If content is provided in the default slot, this prop will be ignored.
   */
  text: String,
  /**
   * The fallback text for the icon, used by screen readers and other assistive technologies.
   */
  iconFallbackText: {
    type: String,
    default: 'Warning'
  }
})
</script>

<template>
  <div class="govuk-warning-text">
    <span class="govuk-warning-text__icon" aria-hidden="true">!</span>
    <strong class="govuk-warning-text__text">
      <span class="govuk-visually-hidden">{{ iconFallbackText }}</span>
      <!-- @slot HTML to use within the warning text component. If content is provided in this slot, the `text` prop will be ignored. -->
      <slot>
        {{ text }}
      </slot>
    </strong>
  </div>
</template>
