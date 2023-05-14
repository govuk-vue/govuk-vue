<script setup lang="ts">
defineProps({
  text: String,
  classes: {
    type: String,
    default: ''
  },
  format: {
    type: String,
    validator(value: string) {
      return value === 'numeric'
    }
  }
})
</script>

<template>
  <td
    :class="`govuk-table__cell ${classes} ${
      format === 'numeric' ? 'govuk-table__cell--numeric' : ''
    }`"
  >
    <slot>
      {{ text }}
    </slot>
  </td>
</template>
