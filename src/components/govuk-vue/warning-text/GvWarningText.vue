<script setup lang="ts">
defineProps({
  text: String,
  iconFallbackText: {
    type: String,
    default: 'Warning'
  },
  classes: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div :class="`govuk-warning-text ${classes}`">
    <span class="govuk-warning-text__icon" aria-hidden="true">!</span>
    <strong class="govuk-warning-text__text">
      <span class="govuk-warning-text__assistive">{{ iconFallbackText }}</span>
      <slot>
        {{ text }}
      </slot>
    </strong>
  </div>
</template>
