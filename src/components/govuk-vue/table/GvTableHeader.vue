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
  },
  scope: {
    type: String,
    default: 'col',
    validator(value: string) {
      return ['row', 'col'].includes(value)
    }
  }
})
</script>

<template>
  <th
    :class="`govuk-table__header ${classes} ${
      format === 'numeric' ? 'govuk-table__header--numeric' : ''
    }`"
    :scope="scope"
  >
    <slot>
      {{ text }}
    </slot>
  </th>
</template>
